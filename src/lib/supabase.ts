import { createClient } from "@supabase/supabase-js";

// Publishable (public) key — safe to ship in client code. RLS protects the data.
const SUPABASE_URL = "https://rlbmqkmvblureyfibgbj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_MFFkrHUNTN4j82YI8qF65w_eNDTm6iX";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
  global: {
    // New-format sb_publishable_ keys are opaque, not JWTs — send them only as `apikey`.
    fetch: (input, init) => {
      const headers = new Headers(init?.headers);
      if (headers.get("Authorization") === `Bearer ${SUPABASE_PUBLISHABLE_KEY}`) {
        headers.delete("Authorization");
      }
      headers.set("apikey", SUPABASE_PUBLISHABLE_KEY);
      return fetch(input, { ...init, headers });
    },
  },
});
