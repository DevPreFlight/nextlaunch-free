import { createBrowserClient } from '@supabase/ssr';

/**
 * Creates a browser-side Supabase client using environment variables.
 * If keys are not configured, gracefully returns null to prevent app crash.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
