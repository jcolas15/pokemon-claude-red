-- Claude Red: Google sign-in gate + cloud saves. Run once in the Supabase SQL editor.
-- Everyone who signs in gets a `players` row with approved = false; flip it to true in the Table Editor to let them play.

create table if not exists public.players (
  id uuid primary key references auth.users on delete cascade,
  email text not null,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.saves (
  player uuid primary key references public.players on delete cascade,
  data jsonb not null check (octet_length(data::text) <= 524288),
  updated_at timestamptz not null default now()
);

alter table public.players enable row level security;
alter table public.saves enable row level security;

create or replace function public.is_approved() returns boolean
language sql stable security definer set search_path = '' as $$
  select coalesce((select approved from public.players where id = auth.uid()), false);
$$;

-- players can see their own row but never change it, so nobody can approve themselves
drop policy if exists "read own player row" on public.players;
create policy "read own player row" on public.players for select to authenticated using (id = auth.uid());

drop policy if exists "approved players read own save" on public.saves;
create policy "approved players read own save" on public.saves for select to authenticated
  using (player = auth.uid() and public.is_approved());
drop policy if exists "approved players write own save" on public.saves;
create policy "approved players write own save" on public.saves for insert to authenticated
  with check (player = auth.uid() and public.is_approved());
drop policy if exists "approved players update own save" on public.saves;
create policy "approved players update own save" on public.saves for update to authenticated
  using (player = auth.uid() and public.is_approved()) with check (player = auth.uid() and public.is_approved());

-- the owner is approved on first sign-in; everyone else waits
create or replace function public.handle_new_player() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.players (id, email, approved)
  values (new.id, coalesce(new.email, ''), lower(coalesce(new.email, '')) = 'jon.colas@swarmingtech.com')
  on conflict (id) do nothing;
  return new;
end $$;
revoke execute on function public.handle_new_player() from public, anon, authenticated;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_player();

-- upload a save without silently overwriting a newer one from another device: p_base is the updated_at this browser
-- last synced; a mismatch returns the cloud copy instead so the game can ask
create or replace function public.put_save(p_data jsonb, p_base timestamptz, p_force boolean default false) returns jsonb
language plpgsql security invoker set search_path = '' as $$
declare cur record; stamp timestamptz := clock_timestamp();
begin
  if not public.is_approved() then raise exception 'not approved' using errcode = '42501'; end if;
  select data, updated_at into cur from public.saves where player = auth.uid() for update;
  if found and not p_force and (p_base is null or cur.updated_at <> p_base) then
    return jsonb_build_object('ok', false, 'conflict', true, 'save', cur.data, 'updatedAt', cur.updated_at);
  end if;
  insert into public.saves (player, data, updated_at) values (auth.uid(), p_data, stamp)
  on conflict (player) do update set data = excluded.data, updated_at = excluded.updated_at;
  return jsonb_build_object('ok', true, 'updatedAt', stamp);
end $$;
revoke execute on function public.put_save(jsonb, timestamptz, boolean) from public, anon;
grant execute on function public.put_save(jsonb, timestamptz, boolean) to authenticated;

-- if you signed in before running this file, backfill and approve yourself
insert into public.players (id, email, approved)
select id, coalesce(email, ''), lower(coalesce(email, '')) = 'jon.colas@swarmingtech.com' from auth.users
on conflict (id) do nothing;
