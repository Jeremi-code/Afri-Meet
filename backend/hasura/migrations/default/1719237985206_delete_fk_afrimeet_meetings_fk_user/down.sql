alter table "afrimeet"."meetings"
  add constraint "fk_user"
  foreign key ("user_id")
  references "afrimeet"."users"
  ("user_id") on update no action on delete no action;
