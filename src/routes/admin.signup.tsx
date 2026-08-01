import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Lock, ShieldCheck } from "lucide-react";

import { supabase } from "@/lib/supabase";
import { adminExists } from "@/lib/admin";
import { AdminShell, adminInput, adminButton } from "@/components/admin/AdminShell";
import { AdminBackButton } from "@/components/admin/AdminBackButton";

export const Route = createFileRoute("/admin/signup")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Administrator Setup — Interior Design Studio" },
      { name: "description", content: "One-time administrator account setup for the Interior Design Studio booking dashboard." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Administrator Setup — Interior Design Studio" },
      { property: "og:description", content: "One-time administrator account setup for the booking dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminSignupPage,
});

function AdminSignupPage() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [locked, setLocked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    adminExists()
      .then((exists) => setLocked(exists))
      .catch(() => setError("Couldn't reach the database. Check your setup SQL has been run."))
      .finally(() => setChecking(false));
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "").trim().toLowerCase().slice(0, 255);
    const password = String(fd.get("password") || "");
    const confirm = String(fd.get("confirm") || "");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return setError("Enter a valid email address.");
    if (password.length < 10) return setError("Use a password of at least 10 characters.");
    if (password !== confirm) return setError("Passwords don't match.");

    setBusy(true);
    setError(null);

    // Re-check server-side before creating anything.
    if (await adminExists()) {
      setBusy(false);
      setLocked(true);
      return;
    }

    const { error: signUpError } = await supabase.auth.signUp({ email, password });
    if (signUpError) {
      setBusy(false);
      return setError(signUpError.message);
    }

    // Some projects require email confirmation — sign in to obtain a session.
    let { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      const { data } = await supabase.auth.signInWithPassword({ email, password });
      sessionData = { session: data.session };
    }
    const userId = sessionData.session?.user.id;
    if (!userId) {
      setBusy(false);
      return setError(
        "Account created, but email confirmation is enabled. Confirm your email, then open Admin Login."
      );
    }

    const { error: claimError } = await supabase
      .from("admin_users")
      .insert({ id: userId, email });

    setBusy(false);
    if (claimError) {
      return setError(
        claimError.code === "23505"
          ? "An administrator account has already been created. Please log in."
          : claimError.message
      );
    }
    setDone(true);
    setTimeout(() => navigate({ to: "/admin", replace: true }), 900);
  }

  if (checking) {
    return (
      <>
        <AdminBackButton />
        <AdminShell title="Administrator setup">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Checking setup status…
          </div>
        </AdminShell>
      </>
    );
  }

  if (locked) {
    return (
      <>
        <AdminBackButton />
        <AdminShell title="Sign-up closed" subtitle="This site allows exactly one administrator.">
          <div className="rounded-2xl border border-gold/30 bg-gold/5 p-6">
            <Lock className="h-6 w-6 text-gold" />
            <p className="mt-4 text-sm leading-relaxed">
              An administrator account has already been created. Please log in.
            </p>
            <Link to="/admin/login" className={`${adminButton} mt-6 inline-flex`}>
              Go to Admin Login
            </Link>
          </div>
        </AdminShell>
      </>
    );
  }

  return (
    <AdminShell
      title="Administrator setup"
      subtitle="One-time registration. Once this account exists, sign-up is permanently disabled."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Email</span>
          <input name="email" type="email" required autoComplete="email" className={adminInput} />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Password</span>
          <input name="password" type="password" required minLength={10} autoComplete="new-password" className={adminInput} />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Confirm password</span>
          <input name="confirm" type="password" required minLength={10} autoComplete="new-password" className={adminInput} />
        </label>
        {error && <p className="text-sm text-destructive">{error}</p>}
        {done && (
          <p className="flex items-center gap-2 text-sm text-gold">
            <ShieldCheck className="h-4 w-4" /> Administrator created. Opening dashboard…
          </p>
        )}
        <button type="submit" disabled={busy} className={`${adminButton} w-full`}>
          {busy ? "Creating account…" : "Create administrator account"}
        </button>
        <p className="text-center text-xs text-muted-foreground">
          Already set up? <Link to="/admin/login" className="text-gold hover:underline">Admin login</Link>
        </p>
      </form>
    </AdminShell>
  );
}
