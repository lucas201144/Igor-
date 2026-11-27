-- Igor Auto Elétrica: estrutura inicial do Supabase.
-- Aplicar no projeto correto depois de reativá-lo.
create table if not exists public.site_config (
 id text primary key,
 config jsonb not null default '{}'::jsonb,
 updated_at timestamptz not null default now()
);
alter table public.site_config enable row level security;
grant select on public.site_config to anon,authenticated;
grant insert,update,delete on public.site_config to authenticated;
drop policy if exists "Public reads site config" on public.site_config;
create policy "Public reads site config" on public.site_config for select to anon,authenticated using(id='main');
drop policy if exists "Admins insert site config" on public.site_config;
create policy "Admins insert site config" on public.site_config for insert to authenticated with check((select auth.jwt()->'app_metadata'->>'role')='admin');
drop policy if exists "Admins update site config" on public.site_config;
create policy "Admins update site config" on public.site_config for update to authenticated using((select auth.jwt()->'app_metadata'->>'role')='admin') with check((select auth.jwt()->'app_metadata'->>'role')='admin');
drop policy if exists "Admins delete site config" on public.site_config;
create policy "Admins delete site config" on public.site_config for delete to authenticated using((select auth.jwt()->'app_metadata'->>'role')='admin');
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('site-assets','site-assets',true,12582912,array['image/jpeg','image/png','image/webp','image/avif'])
on conflict(id) do update set public=true,file_size_limit=12582912,allowed_mime_types=excluded.allowed_mime_types;
drop policy if exists "Public reads site assets" on storage.objects;
create policy "Public reads site assets" on storage.objects for select to anon,authenticated using(bucket_id='site-assets');
drop policy if exists "Admins upload site assets" on storage.objects;
create policy "Admins upload site assets" on storage.objects for insert to authenticated with check(bucket_id='site-assets' and (select auth.jwt()->'app_metadata'->>'role')='admin');
drop policy if exists "Admins update site assets" on storage.objects;
create policy "Admins update site assets" on storage.objects for update to authenticated using(bucket_id='site-assets' and (select auth.jwt()->'app_metadata'->>'role')='admin') with check(bucket_id='site-assets' and (select auth.jwt()->'app_metadata'->>'role')='admin');
drop policy if exists "Admins delete site assets" on storage.objects;
create policy "Admins delete site assets" on storage.objects for delete to authenticated using(bucket_id='site-assets' and (select auth.jwt()->'app_metadata'->>'role')='admin');
-- Após cadastrar o usuário admin no Auth, conceda o papel com:
-- update auth.users set raw_app_meta_data=coalesce(raw_app_meta_data,'{}'::jsonb)||'{"role":"admin"}'::jsonb where email='EMAIL_DO_ADMIN';
-- Faça logout/login após atribuir o papel para renovar o JWT.
