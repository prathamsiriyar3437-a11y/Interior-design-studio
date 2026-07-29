import { createClient } from "@supabase/supabase-js";

// These come from Vite's env injection (see vite.config.ts — @lovable.dev/vite-tanstack-config
// already wires up VITE_* env vars). Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in a local
// .env file for development, and in your hosting provider's environment variable settings for
// production deploys. Never commit real values to git.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.warn(
    "Supabase env vars are missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."
  );
}

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");
