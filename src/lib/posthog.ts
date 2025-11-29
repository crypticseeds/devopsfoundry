import { PostHog } from "posthog-node";

// Initialize PostHog client
// Environment variables are injected via Doppler
let posthogClient: PostHog | null = null;

export function getPostHogClient(): PostHog | null {
  // Return null if PostHog is not configured (for development/testing)
  if (!process.env.POSTHOG_API_KEY) {
    return null;
  }

  // Initialize client if it doesn't exist
  if (!posthogClient) {
    posthogClient = new PostHog(process.env.POSTHOG_API_KEY, {
      host: process.env.POSTHOG_HOST || "https://us.i.posthog.com",
    });
  }

  return posthogClient;
}

/**
 * Track a feedback submission event
 */
export async function trackFeedbackSubmission(
  url: string,
  opinion: "good" | "bad",
  message?: string,
): Promise<void> {
  const client = getPostHogClient();
  if (!client) {
    // Silently fail if PostHog is not configured
    return;
  }

  try {
    await client.capture({
      distinctId: "anonymous", // We don't track users, just events
      event: "feedback_submitted",
      properties: {
        url,
        opinion,
        message: message || "",
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    // Log error but don't throw - we don't want to break the feedback flow
    console.error("Failed to track feedback in PostHog:", error);
  }
}

/**
 * Track a contact form submission event
 */
export async function trackContactFormSubmission(
  name: string,
  email: string,
  messageLength: number,
): Promise<void> {
  const client = getPostHogClient();
  if (!client) {
    // Silently fail if PostHog is not configured
    return;
  }

  try {
    await client.capture({
      distinctId: "anonymous", // We don't track users, just events
      event: "contact_form_submitted",
      properties: {
        name,
        // Don't include email in properties for privacy
        email_length: email.length,
        message_length: messageLength,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    // Log error but don't throw - we don't want to break the contact form flow
    console.error("Failed to track contact form in PostHog:", error);
  }
}

/**
 * Shutdown PostHog client (call this on app shutdown)
 */
export async function shutdownPostHog(): Promise<void> {
  if (posthogClient) {
    await posthogClient.shutdown();
    posthogClient = null;
  }
}
