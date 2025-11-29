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
  firstName: string,
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

  // Get the from email address and display name from environment variables
  // Format: "Display Name <email@domain.com>" for proper name display
  const fromEmailAddress = process.env.FROM_EMAIL;
  const fromDisplayName = process.env.FROM_NAME;

  if (!fromEmailAddress) {
    return {
      success: false,
      error: "FROM_EMAIL environment variable is not configured",
    };
  }

  // Format the from field with display name if provided, otherwise just email
  const fromEmail = fromDisplayName
    ? `${fromDisplayName} <${fromEmailAddress}>`
    : fromEmailAddress;

  try {
    // Resend template variables - ensure these match your template exactly
    const templateVariables: Record<string, string> = {
      first_name: firstName,
      email: to,
    };

    const result = await client.emails.send({
      from: fromEmail,
      to,
      template: {
        id: templateId,
        variables: templateVariables,
      },
    });

    if (result.error) {
      console.error("Failed to send confirmation email:", {
        statusCode: result.error.statusCode,
        message: result.error.message,
        templateId,
      });
      return {
        success: false,
        error: result.error.message || JSON.stringify(result.error),
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to send confirmation email:", {
      message: error instanceof Error ? error.message : "Unknown error",
      templateId,
    });
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Send notification email to admin when contact form is submitted
 * Uses Resend template - template ID must be configured in Doppler
 */
export async function sendAdminNotificationEmail(
  firstName: string,
  lastName: string,
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

  const templateId = process.env.RESEND_ADMIN_TEMPLATE_ID;

  if (!templateId) {
    return {
      success: false,
      error:
        "Resend admin template ID not configured. Please set RESEND_ADMIN_TEMPLATE_ID in Doppler.",
    };
  }

  // Get the from email address and display name from environment variables
  // Format: "Display Name <email@domain.com>" for proper name display
  const fromEmailAddress = process.env.FROM_EMAIL;
  const fromDisplayName = process.env.FROM_NAME;

  if (!fromEmailAddress) {
    return {
      success: false,
      error: "FROM_EMAIL environment variable is not configured",
    };
  }

  // Format the from field with display name if provided, otherwise just email
  const fromEmail = fromDisplayName
    ? `${fromDisplayName} <${fromEmailAddress}>`
    : fromEmailAddress;

  try {
    // Combine first and last name for full name display
    const fullName = `${firstName} ${lastName}`.trim();

    // Template variables - ensure these match your template exactly
    const templateVariables: Record<string, string> = {
      first_name: firstName,
      last_name: lastName,
      full_name: fullName,
      email: email,
      message: message,
      timestamp: new Date().toLocaleString(),
    };

    const result = await client.emails.send({
      from: fromEmail,
      to: adminEmail,
      template: {
        id: templateId,
        variables: templateVariables,
      },
    });

    if (result.error) {
      console.error("Failed to send admin notification email:", {
        statusCode: result.error.statusCode,
        message: result.error.message,
        templateId,
      });
      return {
        success: false,
        error: result.error.message || JSON.stringify(result.error),
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to send admin notification email:", {
      message: error instanceof Error ? error.message : "Unknown error",
      templateId,
    });
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
