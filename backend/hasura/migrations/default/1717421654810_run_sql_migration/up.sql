create schema AfriMeet
 
 CREATE TABLE AfriMeet.Users(
     user_id SERIAL PRIMARY KEY,
     first_name VARCHAR(50) NOT NULL,
     last_name VARCHAR(50) NOT NULL,
     email VARCHAR(100) UNIQUE NOT NULL, 
     password VARCHAR(50) NOT NULL
);

Create table AfriMeet.MeetingRooms(
    room_id SERIAL PRIMARY KEY,
    room_name varchar(50)
);

create table AfriMeet.Meetings (
    meeting_id serial primary key,
    title varchar(50),
    start_time timestamp not null,
    end_time timestamp not null,
    room_id int not null,
    user_id int not null,
    constraint fk_room foreign key(room_id) references AfriMeet.MeetingRooms(room_id),
    constraint fk_user foreign key(user_id) references AfriMeet.Users(user_id),
    CONSTRAINT chk_time CHECK (end_time > start_time)
    
);

create table AfriMeet.Participants (
    participant_id serial primary key,
    email varchar(50) ,
    meeting_id int not null,
    CONSTRAINT unique_participant UNIQUE (email, meeting_id),
    constraint fk_meeting foreign key(meeting_id) references AfriMeet.Meetings(meeting_id)
);

create table Notifications (
     notifcation_id serial primary key,
     participant_id int not null,
     message TEXT not null,
     sent_time timestamp,
     meeting_id int,
     constraint fk_participant foreign key(participant_id) references AfriMeet.Participants(participant_id),
     constraint fk_meeting foreign key(meeting_id) references AfriMeet.Meetings(meeting_id)
);
