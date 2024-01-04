-- removed user
-- name: [unknown]
-- password: unknown
INSERT INTO client (user_id, username, email, password, age, member_since, current_room_id)
VALUES (0, '[unknown]', 'removed@removed.com', 'b23a6a8439c0dde5515893e7c90c1e3233b8616e634470f20dc4928bcf3609bc', 18,
        '2023-01-01', NULL);

-- Insert test data into the 'client' table
-- dev login:
-- name: user1
-- password: password1
INSERT INTO client (username, email, password, biography, age, member_since, current_room_id)
VALUES ('user1', 'user1@example.com', '0b14d501a594442a01c6859541bcb3e8164d183d32937b851835442f69d5c94e',
        'Biography for User 1', 25, '2023-01-01', NULL),
       ('user2', 'user2@example.com', '6cf615d5bcaac778352a8f1f3360d23f02f34ec182e259897fd6ce485d7870d4',
        'Biography for User 2', 30, '2023-04-11', NULL),
       ('user3', 'user3@example.com', '5906ac361a137e2d286465cd6588ebb5ac3f5ae955001100bc41577c3d751764',
        'Biography for User 3', 28, '2023-06-21', NULL),
       ('user4', 'user4@example.com', '0b14d501a594442a01c6859541bcb3e8164d183d32937b851835442f69d5c94e',
        'Biography for User 4', 25, '2023-05-21', NULL),
       ('user5', 'user5@example.com', '6cf615d5bcaac778352a8f1f3360d23f02f34ec182e259897fd6ce485d7870d4',
        'Biography for User 5', 30, '2023-02-11', NULL),
       ('user6', 'user6@example.com', '5906ac361a137e2d286465cd6588ebb5ac3f5ae955001100bc41577c3d751764',
        'Biography for User 6', 28, '2023-01-01', NULL);

-- Insert test data into the 'room' table
INSERT INTO room (name, maximum_users, description, password, creator_id)
VALUES ('Animals and Stuff', NULL, 'Description for Room 1', NULL, 1),
       ('Just chilling... Only 18 years old and above!!!', 8, 'Description for Room 2', 'room2pass', 2),
       ('Gaming lounge [ENG/GER] LoL Counter Strike 2 Minecraft', 12, 'Description for Room 3', NULL, 3),
       ('Hi', 92, 'Description for Room 4', NULL, 1),
       ('My Room!', 2, 'Description for Room 5', 'room2pass2', 1),
       ('Join for free hugs', 100, 'Description for Room 6', NULL, 1),
       ('Hey guys!!', NULL, 'Description for Room 7', 'room2pass2', 1);

-- Insert test data into the 'topic' table
INSERT INTO topic (text, color)
VALUES ('Software Engineering', 'Red'),
       ('Summer Vacation', 'Blue'),
       ('Just Chilling', 'Green'),
       ('Video Games', 'Yellow'),
       ('Comics', 'Purple'),
       ('Art', 'Teal'),
       ('Movies', 'Orange'),
       ('Anything', 'Brown');

-- Insert test data into the 'message' table
INSERT INTO message (user_id, content, timestamp, room_id)
VALUES (4, 'Message from user 4 in Room 1', '2023-10-29 10:01:00', 1),
       (5, 'User 5 here in Room 2', '2023-10-29 10:02:00', 2),
       (6, 'Hello, user 6 in Room 3', '2023-10-29 10:03:00', 3),
       (1, 'Another message from user 1 in Room 4', '2023-10-29 10:04:00', 4),
       (2, 'User 2 again in Room 5', '2023-10-29 10:05:00', 5),
       (3, 'Back again, user 3 in Room 6', '2023-10-29 10:06:00', 6),
       (4, 'User 4 saying hi again in Room 7', '2023-10-29 10:07:00', 7),
       (5, 'Here is user 5 in Room 1', '2023-10-29 10:08:00', 1),
       (6, 'Good day from user 6 in Room 2', '2023-10-29 10:09:00', 2),
       (1, 'Third message from user 1 in Room 3', '2023-10-29 10:10:00', 3),
       (2, 'Three times, user 2 in Room 4', '2023-10-29 10:11:00', 4),
       (3, 'User 3 is still here in Room 5', '2023-10-29 10:12:00', 5),
       (4, 'Message four from user 4 in Room 6', '2023-10-29 10:13:00', 6),
       (5, 'User 5 is still in Room 7', '2023-10-29 10:14:00', 7),
       (6, 'Hello again from user 6 in Room 1', '2023-10-29 10:15:00', 1),
       (1, 'I’m not tired, user 1 in Room 2', '2023-10-29 10:16:00', 2),
       (2, 'Still here, user 2 in Room 3', '2023-10-29 10:17:00', 3),
       (3, 'Message from user 3 in Room 4', '2023-10-29 10:18:00', 4),
       (4, 'Another one from user 4 in Room 5', '2023-10-29 10:19:00', 5),
       (5, 'And another one from user 5 in Room 6', '2023-10-29 10:20:00', 6),
       (6, 'Final message from user 6 in Room 7', '2023-10-29 10:21:00', 7);

-- Insert test data into the 'topics_rooms' table
INSERT INTO topics_rooms (t_id, r_id)
VALUES (1, 1),
       (2, 1),
       (5, 1),
       (3, 1),
       (4, 1),
       (5, 2),
       (6, 2),
       (7, 2),
       (1, 2),
       (3, 3),
       (1, 3),
       (2, 3),
       (1, 4),
       (4, 4),
       (8, 4),
       (8, 5),
       (1, 5),
       (2, 5),
       (1, 6),
       (2, 6),
       (3, 6),
       (4, 6),
       (7, 6),
       (3, 7),
       (4, 7),
       (7, 7);