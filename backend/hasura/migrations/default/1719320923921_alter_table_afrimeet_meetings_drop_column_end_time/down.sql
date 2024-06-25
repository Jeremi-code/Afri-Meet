alter table "afrimeet"."meetings" alter column "end_time" drop not null;
alter table "afrimeet"."meetings" add column "end_time" date;
