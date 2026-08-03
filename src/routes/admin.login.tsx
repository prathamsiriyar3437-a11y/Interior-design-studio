import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";

import { supabase } from "@/lib/supabase";
import { adminExists, isAdmin } from "@/lib/admin";
import { AdminShell, adminInput, adminButton } from "@/components/admin/AdminShell";
import { AdminBackButton } from "@/components/admin/AdminBackButton";

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
  const [mode, setMode] = useState<"login" | "register">("login");
  const [done, setDone] = useState(false);

  useEffect(() => {
    isAdmin().then((ok) => {
      if (ok) navigate({ to: "/admin", replace: true });
    });
    adminExists().then((exists) => setSetupNeeded(!exists)).catch(() => {});
  }, [navigate]);

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
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

    // Server-side re-check: only one administrator may ever exist.
    if (await adminExists()) {
      setBusy(false);
      setSetupNeeded(false);
      setMode("login");
      return setError("An administrator account has already been created. Please log in.");
    }

    const { error: signUpError } = await supabase.auth.signUp({ email, password });
    if (signUpError) {
      setBusy(false);
      return setError(signUpError.message);
    }

    let { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      const { data } = await supabase.auth.signInWithPassword({ email, password });
      sessionData = { session: data.session };
    }
    const userId = sessionData.session?.user.id;
    if (!userId) {
      setBusy(false);
      return setError(
        "Account created, but email confirmation is enabled. Confirm your email, then sign in here."
      );
    }

    const { error: claimError } = await supabase.from("admin_users").insert({ id: userId, email });
    setBusy(false);
    if (claimError) {
      setSetupNeeded(false);
      setMode("login");
      return setError(
        claimError.code === "23505"
          ? "An administrator account has already been created. Please log in."
          : claimError.message
      );
    }
    setDone(true);
    setTimeout(() => navigate({ to: "/admin", replace: true }), 900);
  }

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

  const registering = mode === "register";

  return (
    <>
      <AdminBackButton />
      <AdminShell
        title={registering ? "Administrator setup" : "Admin login"}
        subtitle={
          registering
            ? "One-time registration. Once this account exists, registration is permanently disabled."
            : "Restricted area — administrators only."
        }
      >
        {setupNeeded && (
          <div className="mb-6 grid grid-cols-2 gap-1 rounded-full border border-gold/25 bg-background/40 p-1 text-xs uppercase tracking-widest">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m);
                  setError(null);
                }}
                aria-pressed={mode === m}
                className={`rounded-full px-4 py-2 transition-all duration-500 ${
                  mode === m ? "bg-gold/15 text-gold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m === "login" ? "Sign in" : "Register"}
              </button>
            ))}
          </div>
        )}

        {registering ? (
          <form onSubmit={handleRegister} className="space-y-4">
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
          </form>
        ) : (
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
            {!setupNeeded && (
              <p className="text-center text-xs text-muted-foreground">
                Only one administrator account exists for this site.
              </p>
            )}
          </form>
        )}
      </AdminShell>
    </>
  );
}
