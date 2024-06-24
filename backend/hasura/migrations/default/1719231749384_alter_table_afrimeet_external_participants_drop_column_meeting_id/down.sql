alter table "afrimeet"."external_participants"
  add constraint "external_participants_meeting_id_fkey"
  foreign key (meeting_id)
  references "afrimeet"."meetings"
  (meeting_id) on update restrict on delete restrict;
alter table "afrimeet"."external_participants" alter column "meeting_id" drop not null;
alter table "afrimeet"."external_participants" add column "meeting_id" int4;
