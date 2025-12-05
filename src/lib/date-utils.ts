/**
 * Shared date utility functions for consistent date handling across the application.
 * All dates should be parsed and formatted using these utilities to ensure consistency.
 */

/**
 * Parse an ISO date string (e.g., "2024-11-28" or "2025-12-05") to a Date object.
 * Handles dates with or without time components.
 */
export function parseISODate(dateString: string): Date | null {
  if (!dateString) return null;

  let date: Date;

  // If date already includes time component, parse directly
  if (dateString.includes("T")) {
    date = new Date(dateString);
  } else {
    // Add time component for UTC parsing
    date = new Date(dateString + "T00:00:00Z");
  }

  // Validate the date is valid
  if (isNaN(date.getTime())) {
    // Fallback: try parsing without time component
    date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return null;
    }
  }

  return date;
}

/**
 * Format a Date object to "Month Day, Year" format (e.g., "Nov 28, 2024").
 * Uses UTC methods to ensure consistent formatting between server and client.
 */
export function formatDateLong(date: Date): string {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = months[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  return `${month} ${day}, ${year}`;
}

/**
 * Format a Date object to "Month Year" format (e.g., "Nov 2024").
 * Uses UTC methods to ensure consistent formatting between server and client.
 */
export function formatDateShort(date: Date): string {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${month} ${year}`;
}

/**
 * Parse and format an ISO date string to "Month Day, Year" format.
 * Returns the original string if parsing fails.
 */
export function formatISODateLong(dateString: string): string {
  const date = parseISODate(dateString);
  if (!date) return dateString;
  return formatDateLong(date);
}

/**
 * Parse and format an ISO date string to "Month Year" format.
 * Returns the original string if parsing fails.
 */
export function formatISODateShort(dateString: string): string {
  const date = parseISODate(dateString);
  if (!date) return dateString;
  return formatDateShort(date);
}

/**
 * Parse a formatted date string (e.g., "Nov 2024" or "Jan 15, 2025") to a Date object.
 * Used for parsing dates from content.ts or already-formatted dates.
 */
export function parseFormattedDate(dateString: string): Date | null {
  if (!dateString) return null;

  const months: { [key: string]: number } = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  const parts = dateString.trim().split(" ");

  // Handle "Month Year" format (e.g., "Nov 2024")
  if (parts.length === 2) {
    const month = months[parts[0]] ?? 0;
    const year = parseInt(parts[1], 10);
    if (!isNaN(year)) {
      return new Date(year, month, 1);
    }
  }

  // Handle "Month Day, Year" format (e.g., "Jan 15, 2025")
  if (parts.length >= 3) {
    const month = months[parts[0]] ?? 0;
    const day = parseInt(parts[1].replace(",", ""), 10);
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && !isNaN(year)) {
      return new Date(year, month, day);
    }
  }

  // Fallback to standard Date parsing
  const parsed = new Date(dateString);
  return isNaN(parsed.getTime()) ? null : parsed;
}

/**
 * Format a Date object using toLocaleDateString with consistent options.
 * Used for individual post/project pages where full date formatting is needed.
 */
export function formatDateLocale(
  date: Date,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
): string {
  return date.toLocaleDateString("en-US", options);
}

/**
 * Parse and format an ISO date string using toLocaleDateString.
 * Returns the original string if parsing fails.
 */
export function formatISODateLocale(
  dateString: string,
  options?: Intl.DateTimeFormatOptions,
): string {
  const date = parseISODate(dateString);
  if (!date) return dateString;
  return formatDateLocale(date, options);
}
