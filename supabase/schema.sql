-- ================================================================
-- Hookify — Schema do Banco de Dados (Supabase)
-- Rodar no SQL Editor do Supabase
-- ================================================================

-- Perfis de usuário (espelha auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  plan text not null default 'trial', -- trial | starter | pro | scale
  trial_ends_at timestamptz not null default (now() + interval '7 days'),
  subscription_id text, -- ID da assinatura (Stripe ou Hubla)
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS: cada usuário só acessa o próprio perfil
alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- Cria perfil automaticamente ao criar usuário
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ================================================================
-- Contas Meta conectadas
-- ================================================================
create table public.meta_accounts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  meta_account_id text not null,
  meta_account_name text,
  access_token text not null, -- criptografado
  token_expires_at timestamptz,
  connected_at timestamptz not null default now()
);

alter table public.meta_accounts enable row level security;

create policy "meta_accounts_own" on public.meta_accounts
  for all using (auth.uid() = user_id);

-- ================================================================
-- Criativos importados do Meta
-- ================================================================
create table public.creatives (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  meta_account_id text not null,
  meta_ad_id text not null,
  name text not null,
  thumbnail_url text,
  video_url text,
  status text not null default 'ativo', -- ativo | pausado | arquivado
  score int, -- 0-100
  hook_rate numeric,
  body_rate numeric,
  cta_rate numeric,
  views bigint default 0,
  unique_views bigint default 0,
  clicks bigint default 0,
  conversions bigint default 0,
  revenue numeric default 0,
  last_synced_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.creatives enable row level security;

create policy "creatives_own" on public.creatives
  for all using (auth.uid() = user_id);

-- ================================================================
-- Análises de IA (histórico por criativo)
-- ================================================================
create table public.ai_analyses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  creative_id uuid references public.creatives(id) on delete cascade not null,
  prompt text not null,
  response text not null,
  created_at timestamptz not null default now()
);

alter table public.ai_analyses enable row level security;

create policy "ai_analyses_own" on public.ai_analyses
  for all using (auth.uid() = user_id);

-- ================================================================
-- Notificações in-app
-- ================================================================
create table public.notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  message text not null,
  type text not null default 'info', -- info | success | warning | alert
  read boolean not null default false,
  creative_id uuid references public.creatives(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.notifications enable row level security;

create policy "notifications_own" on public.notifications
  for all using (auth.uid() = user_id);
