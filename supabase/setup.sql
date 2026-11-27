-- Igor Auto Elétrica: configuração inicial segura do Supabase
-- Execute uma única vez no SQL Editor do projeto "Igor-".

create table if not exists public.site_config (
  id text primary key check (id = 'main'),
  config jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_config enable row level security;

grant select on public.site_config to anon, authenticated;
grant insert, update on public.site_config to authenticated;

drop policy if exists "Public can read site configuration" on public.site_config;
create policy "Public can read site configuration"
  on public.site_config for select
  to anon, authenticated
  using (true);

drop policy if exists "Admins can insert site configuration" on public.site_config;
create policy "Admins can insert site configuration"
  on public.site_config for insert
  to authenticated
  with check (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can update site configuration" on public.site_config;
create policy "Admins can update site configuration"
  on public.site_config for update
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-assets',
  'site-assets',
  true,
  12582912,
  array['image/jpeg','image/png','image/webp','image/avif']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can view site assets" on storage.objects;
create policy "Public can view site assets"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'site-assets');

drop policy if exists "Admins can upload site assets" on storage.objects;
create policy "Admins can upload site assets"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'site-assets'
    and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

-- Depois de criar o usuário administrativo em Authentication > Users,
-- edite o app_metadata desse usuário para: {"role":"admin"}.
-- Não coloque esse papel em user_metadata.
