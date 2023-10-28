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
        'Biography for User 2', 30, '2023-02-01', NULL),
       ('user3', 'user3@example.com', '5906ac361a137e2d286465cd6588ebb5ac3f5ae955001100bc41577c3d751764',
        'Biography for User 3', 28, '2023-03-01', NULL);

-- Insert test data into the 'room' table
INSERT INTO room (name, maximum_users, description, password, creator_id)
VALUES ('Animals and Stuff', NULL, 'Description for Room 1', NULL, 1),
       ('Just chilling... Only 18 years old and above!!!', 8, 'Description for Room 2', 'room2pass', 2),
       ('Gaming lounge [ENG/GER] LoL Counter Strike 2 Minecraft', 12, 'Description for Room 3', NULL, 3),
       ('Hi', 92, 'Description for Room 4', NULL, 1),
       ('My Room!', 2, 'Description for Room 5', 'room2pass2', 1),
       ('Join for free hugs', 100, 'Description for Room 6', NULL, 1),
       ('Wassup bois', NULL, 'Description for Room 7', 'room2pass2', 1);

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
VALUES (1, 'Hello from user 1 in Room 1', CURRENT_TIMESTAMP, 1),
       (2, 'Hi, this is user 2 in Room 2', CURRENT_TIMESTAMP, 2),
       (3, 'Greetings from user 3 in Room 1', CURRENT_TIMESTAMP, 1);

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