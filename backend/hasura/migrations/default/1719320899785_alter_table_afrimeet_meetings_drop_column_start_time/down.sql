alter table "afrimeet"."meetings" alter column "start_time" drop not null;
alter table "afrimeet"."meetings" add column "start_time" date;
