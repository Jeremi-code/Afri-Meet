alter table "afrimeet"."external_participants"
  add constraint "external_participants_meeting_id_fkey"
  foreign key ("meeting_id")
  references "afrimeet"."meetings"
  ("meeting_id") on update restrict on delete restrict;
