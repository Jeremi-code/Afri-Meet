alter table "afrimeet"."participants"
  add constraint "participants_user_id_fkey"
  foreign key (user_id)
  references "afrimeet"."users"
  (user_id) on update restrict on delete restrict;
alter table "afrimeet"."participants" alter column "user_id" drop not null;
alter table "afrimeet"."participants" add column "user_id" int4;
