import postgres from "postgres";

// Initialize Neon DB PostgreSQL client
// Environment variables are injected via Doppler
let sql: ReturnType<typeof postgres> | null = null;

export function getDatabaseClient() {
  const databaseUrl = process.env.NEON_DATABASE_URL;

  if (!databaseUrl) {
    return null;
  }

  if (!sql) {
    // Require SSL in production (Vercel) but allow local dev without SSL
    const isProduction =
      process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
    const requireSSL = isProduction || process.env.NEON_REQUIRE_SSL === "true";

    sql = postgres(databaseUrl, {
      max: 1, // Use a single connection for serverless environments
      ...(requireSSL && { ssl: "require" }), // Only require SSL in production
    });
  }

  return sql;
}

export interface Lead {
  first_name: string;
  last_name: string;
  email: string;
  message?: string;
}

/**
 * Store a contact form lead in Neon DB
 */
export async function storeLead(
  firstName: string,
  lastName: string,
  email: string,
  message?: string,
): Promise<{ success: boolean; error?: string }> {
  const db = getDatabaseClient();

  if (!db) {
    return {
      success: false,
      error: "Neon DB not configured. Please set NEON_DATABASE_URL in Doppler.",
    };
  }

  try {
    await db`
      INSERT INTO leads (first_name, last_name, email, message, created_at)
      VALUES (${firstName}, ${lastName}, ${email.toLowerCase()}, ${message || null}, NOW())
    `;

    return { success: true };
  } catch (error) {
    console.error("Failed to store lead in Neon DB:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
