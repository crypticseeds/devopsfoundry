import { Resend } from "resend";

// Initialize Resend client
// Environment variables are injected via Doppler
let resendClient: Resend | null = null;

export function getResendClient(): Resend | null {
  // Return null if Resend is not configured (for development/testing)
  if (!process.env.RESEND_API_KEY) {
    return null;
  }

  // Initialize client if it doesn't exist
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }

  return resendClient;
}

/**
 * Send confirmation email to user after contact form submission
 * Uses Resend template "Contact Form Response" - template ID must be configured in Doppler
 * Sends: first_name, email, and optionally message
 */
export async function sendContactConfirmationEmail(
  to: string,
  name: string,
): Promise<{ success: boolean; error?: string }> {
  const client = getResendClient();
  if (!client) {
    return { success: false, error: "Email service not configured" };
  }

  const templateId = process.env.RESEND_CONTACT_TEMPLATE_ID;

  if (!templateId) {
    return {
      success: false,
      error:
        "Resend template ID not configured. Please set RESEND_CONTACT_TEMPLATE_ID in Doppler.",
    };
  }

  // Extract first name from full name (take first word)
  const first_name = name.split(" ")[0];

  try {
    await client.emails.send({
      to,
      template: {
        id: templateId,
        variables: {
          first_name: first_name,
          email: to,
          // Include message if you want to show it in the confirmation email
          // message: message || "",
        },
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Send notification email to admin when contact form is submitted
 */
export async function sendAdminNotificationEmail(
  name: string,
  email: string,
  message: string,
): Promise<{ success: boolean; error?: string }> {
  const client = getResendClient();
  if (!client) {
    return { success: false, error: "Email service not configured" };
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    // Admin notifications are optional
    return { success: false, error: "Admin email not configured" };
  }

  const fromEmail =
    process.env.FROM_EMAIL || "femi.akinlotan@devopsfoundry.com";

  try {
    await client.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: "New Contact Form Submission - DevOps Foundry",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: #1f2937; padding: 20px; border-radius: 8px 8px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 20px;">New Contact Form Submission</h1>
            </div>
            
            <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
              <div style="margin-bottom: 20px;">
                <p style="margin: 5px 0; color: #4b5563;"><strong>Name:</strong> ${escapeHtml(name)}</p>
                <p style="margin: 5px 0; color: #4b5563;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}" style="color: #667eea;">${escapeHtml(email)}</a></p>
                <p style="margin: 5px 0; color: #4b5563;"><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
              </div>
              
              <div style="background: #f9fafb; padding: 20px; border-radius: 4px; border-left: 4px solid #667eea;">
                <p style="margin: 0 0 10px 0; color: #1f2937; font-weight: 600;">Message:</p>
                <p style="margin: 0; color: #4b5563; white-space: pre-wrap;">${escapeHtml(message)}</p>
              </div>
              
              <div style="margin-top: 20px;">
                <a href="mailto:${escapeHtml(email)}" style="display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500;">
                  Reply to ${escapeHtml(name)}
                </a>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Timestamp: ${new Date().toLocaleString()}

Message:
${message}

---
Reply to: ${email}
      `.trim(),
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send admin notification email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Escape HTML to prevent XSS attacks
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
