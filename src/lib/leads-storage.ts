import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
// Environment variables are injected via Doppler
let supabaseClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseKey);
  }

  return supabaseClient;
}

export interface Lead {
  first_name: string;
  last_name: string;
  email: string;
  message?: string;
}

/**
 * Store a contact form lead in Supabase
 */
export async function storeLead(
  firstName: string,
  lastName: string,
  email: string,
  message?: string,
): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return {
      success: false,
      error:
        "Supabase not configured. Please set SUPABASE_URL and SUPABASE_ANON_KEY in Doppler.",
    };
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from("leads") as any).insert({
      first_name: firstName,
      last_name: lastName,
      email: email.toLowerCase(),
      message: message || null,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Failed to store lead in Supabase:", error);
      return {
        success: false,
        error: error.message,
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Unexpected error storing lead:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
