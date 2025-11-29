import { NextRequest, NextResponse } from "next/server";
import { trackContactFormSubmission } from "@/lib/posthog";
import {
  sendContactConfirmationEmail,
  sendAdminNotificationEmail,
} from "@/lib/email";
import { storeLead } from "@/lib/leads-storage";

// Simple in-memory rate limiting (use Redis in production for distributed environments)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 5;

// Input validation and sanitization
function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .slice(0, 5000); // Limit length
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

function isValidName(name: string): boolean {
  return name.length >= 2 && name.length <= 50;
}

function isValidMessage(message: string): boolean {
  return message.length >= 10 && message.length <= 5000;
}

// Rate limiting function
function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - record.count };
}

// Clean up old rate limit entries periodically
function cleanupRateLimitMap() {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now - record.timestamp > RATE_LIMIT_WINDOW) {
      rateLimitMap.delete(ip);
    }
  }
}

// Run cleanup every 5 minutes
setInterval(cleanupRateLimitMap, 5 * 60 * 1000);

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0]?.trim() || "unknown";

    // Check rate limit
    const { allowed, remaining } = checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "X-RateLimit-Remaining": "0",
            "Retry-After": "60",
          },
        },
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError);
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 },
      );
    }

    const { firstName, lastName, email, message, website } = body;

    // Honeypot check - if website field is filled, it's likely a bot
    if (website && website.length > 0) {
      console.log("Honeypot triggered - bot detected");
      // Silently accept but don't process (to not reveal honeypot)
      return NextResponse.json(
        { success: true, message: "Message sent successfully" },
        {
          status: 200,
          headers: { "X-RateLimit-Remaining": remaining.toString() },
        },
      );
    }

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      console.error("Missing required fields:", {
        hasFirstName: !!firstName,
        hasLastName: !!lastName,
        hasEmail: !!email,
        hasMessage: !!message,
      });
      return NextResponse.json(
        { error: "First name, last name, email, and message are required" },
        { status: 400 },
      );
    }

    // Sanitize inputs
    const sanitizedFirstName = sanitizeInput(firstName);
    const sanitizedLastName = sanitizeInput(lastName);
    const sanitizedEmail = sanitizeInput(email).toLowerCase();
    const sanitizedMessage = sanitizeInput(message);

    // Validate inputs
    if (!isValidName(sanitizedFirstName)) {
      return NextResponse.json(
        { error: "First name must be between 2 and 50 characters" },
        { status: 400 },
      );
    }

    if (!isValidName(sanitizedLastName)) {
      return NextResponse.json(
        { error: "Last name must be between 2 and 50 characters" },
        { status: 400 },
      );
    }

    if (!isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 },
      );
    }

    if (!isValidMessage(sanitizedMessage)) {
      return NextResponse.json(
        { error: "Message must be between 10 and 5000 characters" },
        { status: 400 },
      );
    }

    // Process the contact form submission
    // 1. Store lead in Neon DB
    // 2. Track in PostHog for analytics
    // 3. Send confirmation email to user
    // 4. Send notification email to admin (optional)

    // Store lead in Neon DB
    const leadResult = await storeLead(
      sanitizedFirstName,
      sanitizedLastName,
      sanitizedEmail,
      sanitizedMessage,
    );

    if (!leadResult.success) {
      console.error("Failed to store lead in Neon DB:", leadResult.error);
      // Continue processing even if storage fails - don't break the user experience
    }

    // Track contact form submission in PostHog
    await trackContactFormSubmission(
      sanitizedFirstName,
      sanitizedLastName,
      sanitizedEmail,
      sanitizedMessage.length,
    );

    // Send confirmation email to user using Resend template
    const emailResult = await sendContactConfirmationEmail(
      sanitizedEmail,
      sanitizedFirstName,
    );

    if (!emailResult.success) {
      console.error("Failed to send confirmation email:", emailResult.error);
      // Continue processing even if email fails - don't break the user experience
    }

    // Send admin notification email (optional - only if ADMIN_EMAIL is configured)
    const adminEmailResult = await sendAdminNotificationEmail(
      sanitizedFirstName,
      sanitizedLastName,
      sanitizedEmail,
      sanitizedMessage,
    );

    if (
      !adminEmailResult.success &&
      adminEmailResult.error !== "Admin email not configured"
    ) {
      console.error(
        "Failed to send admin notification:",
        adminEmailResult.error,
      );
      // Continue processing even if admin email fails
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      {
        status: 200,
        headers: { "X-RateLimit-Remaining": remaining.toString() },
      },
    );
  } catch (error) {
    // Log the error for debugging
    console.error("Contact form API error:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    // Generic error without exposing internal details
    return NextResponse.json(
      { error: "An error occurred. Please try again later." },
      { status: 500 },
    );
  }
}

// Block GET requests to prevent data exposure in URL parameters
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
