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
 * Uses single event with properties for flexible PostHog insights
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
    // Structure properties for PostHog - ensure all are simple types
    // PostHog requires properties to be string, number, boolean, or array of these
    // Match the structure used in contact form tracking for consistency
    const properties = {
      feedback_opinion: opinion, // "good" or "bad" - visible in PostHog
      feedback_url: url, // The page/post URL - visible in PostHog
      feedback_message: message || "", // The feedback message - visible in PostHog
      has_message: !!message && message.trim().length > 0,
      message_length: message?.length || 0,
    };

    // Capture the event - same pattern as contact form
    client.capture({
      distinctId: "anonymous",
      event: "feedback_submitted",
      properties,
    });

    // For server actions, force immediate send
    // PostHog Node.js batches events (sends every 10s by default)
    // Server actions may exit before auto-flush, so we shutdown to force send
    await client.shutdown();

    // Reinitialize client for next use
    posthogClient = null;
  } catch (error) {
    console.error("Failed to track feedback in PostHog:", error);
    // Reset client on error to prevent stuck state
    posthogClient = null;
  }
}

/**
 * Track a contact form submission event
 */
export async function trackContactFormSubmission(
  firstName: string,
  lastName: string,
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
        first_name: firstName,
        last_name: lastName,
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
