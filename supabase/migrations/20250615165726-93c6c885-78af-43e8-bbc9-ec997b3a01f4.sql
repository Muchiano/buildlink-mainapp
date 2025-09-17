
-- 1. Create a public storage bucket for portfolio files
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

-- 2. Add a portfolio field to profiles for storing array of portfolio item metadata
alter table profiles
add column if not exists portfolio jsonb default '[]';

