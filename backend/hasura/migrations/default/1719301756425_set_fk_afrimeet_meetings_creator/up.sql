alter table "afrimeet"."meetings"
  add constraint "meetings_creator_fkey"
  foreign key ("creator")
  references "afrimeet"."users"
  ("user_id") on update restrict on delete restrict;
