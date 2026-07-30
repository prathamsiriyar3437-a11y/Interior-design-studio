import { supabase } from "@/lib/supabase";

export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

export const BOOKING_STATUSES: BookingStatus[] = [
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
];

export interface Booking {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string | null;
  service: string | null;
  project_type: string | null;
  budget: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  message: string | null;
  status: BookingStatus;
}

/** Has the one-and-only administrator account already been created? */
export async function adminExists(): Promise<boolean> {
  const { data, error } = await supabase.rpc("admin_exists");
  if (error) throw error;
  return Boolean(data);
}

/** Is the currently signed-in user the administrator? */
export async function isAdmin(): Promise<boolean> {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return false;
  const { data, error } = await supabase.rpc("is_admin");
  if (error) return false;
  return Boolean(data);
}

export async function signOutAdmin() {
  await supabase.auth.signOut();
}
