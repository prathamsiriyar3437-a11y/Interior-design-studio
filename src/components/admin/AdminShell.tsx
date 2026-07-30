import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const adminInput =
  "mt-2 w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-gold";

export const adminButton =
  "items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110 disabled:opacity-60 inline-flex";

export function AdminShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto w-full max-w-md">
        <Link to="/" className="text-xs uppercase tracking-[0.35em] text-gold">
          Interior Design Studio
        </Link>
        <h1 className="mt-5 font-display text-3xl">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
        <div className="mt-8 rounded-3xl border border-border bg-card/60 p-7 backdrop-blur">
          {children}
        </div>
      </div>
    </main>
  );
}
