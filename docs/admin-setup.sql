-- =====================================================================
-- Interior Design Studio — Admin panel + bookings setup
-- Run this ONCE in your Supabase project: SQL Editor → New query → Run
-- =====================================================================

-- 1. Extra booking columns -------------------------------------------------
alter table public.appointments add column if not exists service        text;
alter table public.appointments add column if not exists preferred_date date;
alter table public.appointments add column if not exists preferred_time text;
alter table public.appointments add column if not exists status         text not null default 'Pending';

alter table public.appointments drop constraint if exists appointments_status_check;
alter table public.appointments add constraint appointments_status_check
  check (status in ('Pending','Confirmed','Completed','Cancelled'));

-- 2. Single-admin table ----------------------------------------------------
create table if not exists public.admin_users (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      text,
  created_at timestamptz not null default now(),
  singleton  boolean not null default true,
  constraint admin_only_one unique (singleton)   -- hard cap: exactly one admin
);

grant select, insert on public.admin_users to authenticated;
grant all on public.admin_users to service_role;
alter table public.admin_users enable row level security;

drop policy if exists "admin can read own row" on public.admin_users;
create policy "admin can read own row" on public.admin_users
  for select to authenticated using (auth.uid() = id);

drop policy if exists "first user can claim admin" on public.admin_users;
create policy "first user can claim admin" on public.admin_users
  for insert to authenticated with check (auth.uid() = id);

-- 3. Helper functions ------------------------------------------------------
create or replace function public.admin_exists()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admin_users)
$$;
grant execute on function public.admin_exists() to anon, authenticated;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admin_users where id = auth.uid())
$$;
grant execute on function public.is_admin() to anon, authenticated;

-- 4. Bookings RLS: public may submit, only the admin may read/manage --------
alter table public.appointments enable row level security;
grant insert on public.appointments to anon, authenticated;
grant select, update, delete on public.appointments to authenticated;
grant all on public.appointments to service_role;

drop policy if exists "Anyone can submit an appointment" on public.appointments;
create policy "Anyone can submit an appointment" on public.appointments
  for insert to anon, authenticated with check (true);

drop policy if exists "Authenticated can read appointments" on public.appointments;
drop policy if exists "admin reads appointments" on public.appointments;
create policy "admin reads appointments" on public.appointments
  for select to authenticated using (public.is_admin());

drop policy if exists "admin updates appointments" on public.appointments;
create policy "admin updates appointments" on public.appointments
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin deletes appointments" on public.appointments;
create policy "admin deletes appointments" on public.appointments
  for delete to authenticated using (public.is_admin());

-- 5. Realtime for the dashboard -------------------------------------------
alter publication supabase_realtime add table public.appointments;

-- =====================================================================
-- After running this:
--   • Go to Authentication → Providers → Email and turn OFF "Confirm email"
--     (or confirm your address from the email you receive) so you can log in.
--   • Visit /admin/signup once and create your administrator account.
--   • Sign-up locks itself permanently after that. To create another admin
--     you must delete the row in public.admin_users yourself.
-- =====================================================================
