-- Insert test data into the 'client' table
INSERT INTO client (username, email, password, biography, age, member_since, current_room_id)
VALUES
    ('user1', 'user1@example.com', 'password1', 'Biography for User 1', 25, '2023-01-01', NULL),
    ('user2', 'user2@example.com', 'password2', 'Biography for User 2', 30, '2023-02-01', NULL),
    ('user3', 'user3@example.com', 'password3', 'Biography for User 3', 28, '2023-03-01', NULL);

-- Insert test data into the 'room' table
INSERT INTO room (name, maximum_users, description, password, creator_id)
VALUES
    ('Room 1', 10, 'Description for Room 1', NULL, 1),
    ('Room 2', 8, 'Description for Room 2', 'room2pass', 2),
    ('Room 3', 12, 'Description for Room 3', NULL, 3);

-- Insert test data into the 'topic' table
INSERT INTO topic (text, color)
VALUES
    ('Topic 1', 'Red'),
    ('Topic 2', 'Blue'),
    ('Topic 3', 'Green');

-- Insert test data into the 'message' table
INSERT INTO message (user_id, content, timestamp, room_id)
VALUES
    (1, 'Hello from user 1 in Room 1', CURRENT_TIMESTAMP, 1),
    (2, 'Hi, this is user 2 in Room 2', CURRENT_TIMESTAMP, 2),
    (3, 'Greetings from user 3 in Room 1', CURRENT_TIMESTAMP, 1);

-- Insert test data into the 'topics_rooms' table
INSERT INTO topics_rooms (t_id, r_id)
VALUES
    (1, 1),
    (2, 2),
    (1, 3);
