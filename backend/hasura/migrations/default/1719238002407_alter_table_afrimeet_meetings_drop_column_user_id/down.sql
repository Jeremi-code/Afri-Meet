alter table "afrimeet"."meetings" alter column "user_id" drop not null;
alter table "afrimeet"."meetings" add column "user_id" int4;
