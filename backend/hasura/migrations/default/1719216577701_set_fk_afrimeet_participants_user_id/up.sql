alter table "afrimeet"."participants"
  add constraint "participants_user_id_fkey"
  foreign key ("user_id")
  references "afrimeet"."users"
  ("user_id") on update restrict on delete restrict;
