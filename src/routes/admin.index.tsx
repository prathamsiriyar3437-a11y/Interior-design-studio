import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowDownUp,
  ArrowLeft,
  Download,
  Loader2,
  LogOut,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/lib/supabase";
import { isAdmin, signOutAdmin, BOOKING_STATUSES, type Booking, type BookingStatus } from "@/lib/admin";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/admin/")({
  ssr: false,
  beforeLoad: async () => {
    if (!(await isAdmin())) throw redirect({ to: "/admin/login" });
  },
  head: () => ({
    meta: [
      { title: "Bookings Dashboard — Interior Design Studio" },
      { name: "description", content: "Manage every consultation and booking request submitted through the Interior Design Studio website." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Bookings Dashboard — Interior Design Studio" },
      { property: "og:description", content: "Manage consultation and booking requests." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminDashboard,
});

const STATUS_STYLES: Record<BookingStatus, string> = {
  Pending: "bg-amber-500/15 text-amber-600 border-amber-500/30",
  Confirmed: "bg-blue-500/15 text-blue-600 border-blue-500/30",
  Completed: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
  Cancelled: "bg-rose-500/15 text-rose-600 border-rose-500/30",
};

function fmt(value: string | null | undefined) {
  return value && value.trim() ? value : "—";
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | BookingStatus>("All");
  const [sortAsc, setSortAsc] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Booking | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false });
    setLoading(false);
    if (error) {
      toast.error("Couldn't load bookings", { description: error.message });
      return;
    }
    setRows((data ?? []) as Booking[]);
  }, []);

  useEffect(() => {
    load();
    const channel = supabase
      .channel("appointments-admin")
      .on("postgres_changes", { event: "*", schema: "public", table: "appointments" }, () => load(true))
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows
      .filter((r) => (statusFilter === "All" ? true : r.status === statusFilter))
      .filter((r) =>
        !q
          ? true
          : [r.name, r.phone, r.email, r.service, r.project_type, r.message]
              .filter(Boolean)
              .some((v) => String(v).toLowerCase().includes(q))
      )
      .sort((a, b) =>
        sortAsc
          ? a.created_at.localeCompare(b.created_at)
          : b.created_at.localeCompare(a.created_at)
      );
  }, [rows, query, statusFilter, sortAsc]);

  const counts = useMemo(() => {
    const base: Record<string, number> = { All: rows.length };
    BOOKING_STATUSES.forEach((s) => (base[s] = rows.filter((r) => r.status === s).length));
    return base;
  }, [rows]);

  async function updateStatus(row: Booking, status: BookingStatus) {
    const previous = rows;
    setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, status } : r)));
    const { error } = await supabase.from("appointments").update({ status }).eq("id", row.id);
    if (error) {
      setRows(previous);
      toast.error("Update failed", { description: error.message });
      return;
    }
    toast.success(`Marked as ${status}`);
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    const { error } = await supabase.from("appointments").delete().eq("id", pendingDelete.id);
    setDeleting(false);
    setPendingDelete(null);
    if (error) return toast.error("Delete failed", { description: error.message });
    setRows((rs) => rs.filter((r) => r.id !== pendingDelete.id));
    toast.success("Booking deleted");
  }

  function exportCsv() {
    const headers = [
      "Name", "Phone", "Email", "Service", "Project type", "Budget",
      "Preferred date", "Preferred time", "Message", "Status", "Submitted",
    ];
    const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = [
      headers.join(","),
      ...filtered.map((r) =>
        [r.name, r.phone, r.email, r.service, r.project_type, r.budget,
         r.preferred_date, r.preferred_time, r.message, r.status,
         new Date(r.created_at).toLocaleString()].map(esc).join(",")
      ),
    ].join("\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookings-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported ${filtered.length} booking(s)`);
  }

  async function handleSignOut() {
    await signOutAdmin();
    navigate({ to: "/admin/login", replace: true });
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-5 py-4">
          <button
            onClick={() => navigate({ to: "/", replace: false })}
            aria-label="Back to website"
            className="mr-2 inline-flex items-center justify-center rounded-full border border-border p-2.5 text-muted-foreground transition hover:border-gold hover:text-gold"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="mr-auto">
            <div className="text-[10px] uppercase tracking-[0.35em] text-gold">Interior Design Studio</div>
            <h1 className="font-display text-2xl leading-tight">Bookings dashboard</h1>
          </div>
          <button onClick={() => load()} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition hover:border-gold">
            <RefreshCw className="h-4 w-4" /> Refresh
          </button>
          <button onClick={exportCsv} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition hover:border-gold">
            <Download className="h-4 w-4" /> CSV
          </button>
          <button onClick={handleSignOut} className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm text-background transition hover:opacity-90">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {(["All", ...BOOKING_STATUSES] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s as "All" | BookingStatus)}
              className={`rounded-2xl border p-4 text-left transition ${
                statusFilter === s ? "border-gold bg-gold/5" : "border-border hover:border-gold/50"
              }`}
            >
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{s}</div>
              <div className="mt-1 font-display text-2xl">{counts[s] ?? 0}</div>
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="relative min-w-56 flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value.slice(0, 80))}
              placeholder="Search name, phone, email, service…"
              className="w-full rounded-full border border-border bg-background/60 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-gold"
            />
          </div>
          <button
            onClick={() => setSortAsc((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-3 text-sm transition hover:border-gold"
          >
            <ArrowDownUp className="h-4 w-4" /> {sortAsc ? "Oldest first" : "Newest first"}
          </button>
        </div>

        {loading ? (
          <div className="mt-16 flex items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" /> Loading bookings…
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-16 rounded-3xl border border-dashed border-border p-12 text-center text-muted-foreground">
            No bookings match your filters yet.
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="mt-6 hidden overflow-x-auto rounded-3xl border border-border lg:block">
              <table className="w-full text-left text-sm">
                <thead className="bg-secondary/50 text-xs uppercase tracking-widest text-muted-foreground">
                  <tr>
                    <th className="px-5 py-4">Customer</th>
                    <th className="px-5 py-4">Contact</th>
                    <th className="px-5 py-4">Service</th>
                    <th className="px-5 py-4">Preferred</th>
                    <th className="px-5 py-4">Message</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Submitted</th>
                    <th className="px-5 py-4" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.id} className="border-t border-border align-top">
                      <td className="px-5 py-4 font-medium">{r.name}</td>
                      <td className="px-5 py-4 text-muted-foreground">
                        <div>{r.phone}</div>
                        <div className="text-xs">{fmt(r.email)}</div>
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">
                        <div>{fmt(r.service ?? r.project_type)}</div>
                        <div className="text-xs">{fmt(r.budget)}</div>
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">
                        <div>{fmt(r.preferred_date)}</div>
                        <div className="text-xs">{fmt(r.preferred_time)}</div>
                      </td>
                      <td className="max-w-64 px-5 py-4 text-muted-foreground">
                        <p className="line-clamp-3 whitespace-pre-wrap">{fmt(r.message)}</p>
                      </td>
                      <td className="px-5 py-4">
                        <StatusSelect row={r} onChange={updateStatus} />
                      </td>
                      <td className="px-5 py-4 text-xs text-muted-foreground">
                        {new Date(r.created_at).toLocaleString()}
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => setPendingDelete(r)}
                          aria-label={`Delete booking from ${r.name}`}
                          className="rounded-full border border-border p-2 text-muted-foreground transition hover:border-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="mt-6 space-y-4 lg:hidden">
              {filtered.map((r) => (
                <div key={r.id} className="rounded-3xl border border-border p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium">{r.name}</div>
                      <div className="text-sm text-muted-foreground">{r.phone}</div>
                      <div className="text-xs text-muted-foreground">{fmt(r.email)}</div>
                    </div>
                    <button
                      onClick={() => setPendingDelete(r)}
                      aria-label={`Delete booking from ${r.name}`}
                      className="rounded-full border border-border p-2 text-muted-foreground transition hover:border-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <Cell label="Service" value={fmt(r.service ?? r.project_type)} />
                    <Cell label="Budget" value={fmt(r.budget)} />
                    <Cell label="Preferred date" value={fmt(r.preferred_date)} />
                    <Cell label="Preferred time" value={fmt(r.preferred_time)} />
                  </dl>
                  {r.message && (
                    <p className="mt-3 whitespace-pre-wrap text-sm text-muted-foreground">{r.message}</p>
                  )}
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <StatusSelect row={r} onChange={updateStatus} />
                    <span className="text-xs text-muted-foreground">
                      {new Date(r.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <AlertDialog open={!!pendingDelete} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this booking?</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingDelete
                ? `The request from ${pendingDelete.name} (${pendingDelete.phone}) will be permanently removed. This cannot be undone.`
                : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} disabled={deleting}>
              {deleting ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function StatusSelect({
  row,
  onChange,
}: {
  row: Booking;
  onChange: (row: Booking, status: BookingStatus) => void;
}) {
  return (
    <select
      value={row.status}
      onChange={(e) => onChange(row, e.target.value as BookingStatus)}
      aria-label={`Status for ${row.name}`}
      className={`rounded-full border px-3 py-1.5 text-xs font-medium outline-none transition ${STATUS_STYLES[row.status] ?? ""}`}
    >
      {BOOKING_STATUSES.map((s) => (
        <option key={s} value={s} className="bg-background text-foreground">
          {s}
        </option>
      ))}
    </select>
  );
}
