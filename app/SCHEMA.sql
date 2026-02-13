
-- Run this in your Supabase SQL Editor

create table votes (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  project_id numeric not null,
  voter_name text not null,
  voter_team text not null
);

-- Optional: Enable RLS (Row Level Security) if you want to restrict access
-- alter table votes enable row level security;
-- create policy "Enable insert for everyone" on votes for insert with check (true);
