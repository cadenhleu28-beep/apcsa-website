-- mcq_attempts: per-question answer log used to personalize the Scroll Feed.
-- Sources: 'subunit' | 'exam' | 'bank' | 'feed'

create table if not exists public.mcq_attempts (
  id          bigserial primary key,
  user_id     uuid not null references auth.users(id) on delete cascade,
  mcq_id      text not null,
  topic_id    text not null,
  correct     boolean not null,
  source      text not null check (source in ('subunit', 'exam', 'bank', 'feed')),
  answered_at timestamptz not null default now()
);

create index if not exists mcq_attempts_user_time_idx
  on public.mcq_attempts (user_id, answered_at desc);

create index if not exists mcq_attempts_user_topic_idx
  on public.mcq_attempts (user_id, topic_id, answered_at desc);

alter table public.mcq_attempts enable row level security;

drop policy if exists "mcq_attempts_select_own" on public.mcq_attempts;
create policy "mcq_attempts_select_own"
  on public.mcq_attempts for select
  using (auth.uid() = user_id);

drop policy if exists "mcq_attempts_insert_own" on public.mcq_attempts;
create policy "mcq_attempts_insert_own"
  on public.mcq_attempts for insert
  with check (auth.uid() = user_id);
