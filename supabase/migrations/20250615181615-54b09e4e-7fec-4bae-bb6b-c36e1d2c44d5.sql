
-- Create the "portfolio" storage bucket if not already present
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;
