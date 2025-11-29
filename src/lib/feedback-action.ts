"use server";

import type { Feedback, ActionResponse } from "@/components/feedback";
import { trackFeedbackSubmission } from "@/lib/posthog";

/**
 * Server action to handle feedback submissions
 * Integrates with PostHog for analytics and provides GitHub issue creation link
 */
export async function onRateAction(
  url: string,
  feedback: Feedback,
): Promise<ActionResponse> {
  // Track feedback submission in PostHog
  await trackFeedbackSubmission(url, feedback.opinion, feedback.message);

  // Log feedback for debugging
  console.log("Feedback received:", {
    url,
    opinion: feedback.opinion,
    message: feedback.message,
  });

  // Return GitHub URL for creating issues
  return {
    githubUrl: `https://github.com/crypticseeds/devopsfoundry/issues/new?title=Feedback for ${encodeURIComponent(url)}&body=${encodeURIComponent(`[${feedback.opinion}] ${feedback.message}\n\n> Forwarded from user feedback on ${url}`)}`,
  };
}
