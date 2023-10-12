-- Insert data into the room table
INSERT INTO room (name, maximum_users, description, password, creator_id)
VALUES ('Game Night', 8, 'Friday gaming session', 'gamenightpass', 16),
       ('Tech Talk', 12, 'Discussing the latest tech trends', 'techpass', 17),
       ('Book Club', 10, 'Reading and discussing books', 'bookclubpass', 18),
       ('Movie Buffs', 15, 'For film enthusiasts', 'moviepass', 16),
       ('Fitness Fanatics', 10, 'Sharing workout tips', 'fitpass', 17);

-- Insert data into the client table
INSERT INTO client (username, email, password, biography, age, member_since)
VALUES ('gamer123', 'gamer123@example.com', 'gamerpass', 'Passionate about gaming', 28, '2022-07-15'),
       ('techie22', 'techie22@example.com', 'techpass', 'Software engineer', 30, '2022-08-01'),
       ('booklover', 'booklover@example.com', 'bookpass', 'Enjoys literature', 25, '2022-09-10'),
       ('moviebuff', 'moviebuff@example.com', 'moviepass', 'Film critic in the making', 32, '2022-10-05'),
       ('fitfan', 'fitfan@example.com', 'fitpass', 'Lover of all things fitness', 27, '2022-11-20');

-- Insert data into the message table
INSERT INTO message (user_id, content, timestamp, room_id)
VALUES (16, 'Who`s up for a game this Friday?', '2022-07-15 18:00:00', 42),
       (17, 'Exciting developments in AI lately!', '2022-08-01 12:30:00', 43),
       (18, 'Just finished a great novel!', '2022-09-10 19:45:00', 44),
       (19, 'Any recommendations for a good movie?', '2022-10-05 21:15:00', 45),
       (20, 'Best exercises for building core strength?', '2022-11-20 14:10:00', 46);

-- Insert data into the topic table
INSERT INTO topic (text, color)
VALUES ('Gaming', 'green'),
       ('Technology', 'blue'),
       ('Literature', 'yellow'),
       ('Movies', 'purple'),
       ('Fitness', 'orange');

-- Insert data into the topics_rooms table
INSERT INTO topics_rooms (t_id, r_id)
VALUES (1, 45),
       (2, 43),
       (3, 43),
       (4, 45),
       (3, 46),
       (5, 42),
       (1, 44);