-- https://github.com/graphile/postgraphile/blob/v4/examples/forum/schema.sql#L47
begin;

create schema forum;

create table if not exists forum.person (
  id               serial primary key,
  first_name       text not null check (char_length(first_name) < 80),
  last_name        text check (char_length(last_name) < 80),
  about            text,
  created_at       timestamp default now()
);

create type forum.post_topic as enum (
  'discussion',
  'inspiration',
  'help',
  'showcase'
);

create table forum.post (
  id               serial primary key,
  -- author_id        integer not null references forum.person(id),
  author_id        integer not null,
  headline         text not null check (char_length(headline) < 280),
  body             text,
  topic            forum.post_topic,
  created_at       timestamp default now()
);

commit;

-- Add foreign key
ALTER TABLE forum.post
  ADD CONSTRAINT person_fk
  FOREIGN KEY (author_id)
  REFERENCES forum.person(id)
  ON DELETE CASCADE;