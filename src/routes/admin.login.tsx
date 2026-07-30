import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";
import { adminExists, isAdmin } from "@/lib/admin";
import { AdminShell, adminInput, adminButton } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/admin/login")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin Login — Interior Design Studio" },
      { name: "description", content: "Secure administrator login for the Interior Design Studio booking dashboard." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Admin Login — Interior Design Studio" },
      { property: "og:description", content: "Secure administrator login for the booking dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [setupNeeded, setSetupNeeded] = useState(false);

  useEffect(() => {
    isAdmin().then((ok) => {
      if (ok) navigate({ to: "/admin", replace: true });
    });
    adminExists().then((exists) => setSetupNeeded(!exists)).catch(() => {});
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "").trim().toLowerCase().slice(0, 255);
    const password = String(fd.get("password") || "");
    if (!email || !password) return;

    setBusy(true);
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setBusy(false);
      return setError("Invalid email or password.");
    }
    if (!(await isAdmin())) {
      await supabase.auth.signOut();
      setBusy(false);
      return setError("This account is not an administrator.");
    }
    setBusy(false);
    navigate({ to: "/admin", replace: true });
  }

  return (
    <AdminShell title="Admin login" subtitle="Restricted area — administrators only.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Email</span>
          <input name="email" type="email" required autoComplete="email" className={adminInput} />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Password</span>
          <input name="password" type="password" required autoComplete="current-password" className={adminInput} />
        </label>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <button type="submit" disabled={busy} className={`${adminButton} w-full`}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
        {setupNeeded && (
          <p className="text-center text-xs text-muted-foreground">
            No administrator yet?{" "}
            <Link to="/admin/signup" className="text-gold hover:underline">Run one-time setup</Link>
          </p>
        )}
      </form>
    </AdminShell>
  );
}
