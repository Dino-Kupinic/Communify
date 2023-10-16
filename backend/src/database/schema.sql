CREATE TABLE IF NOT EXISTS room
(
    room_id       SERIAL PRIMARY KEY NOT NULL,
    name          VARCHAR(60) UNIQUE NOT NULL,
    maximum_users INT,
    description   VARCHAR(150),
    password      VARCHAR(30),
    creator_id    INT                NOT NULL
);

CREATE TABLE IF NOT EXISTS client
(
    user_id         SERIAL PRIMARY KEY  NOT NULL,
    username        VARCHAR(30) UNIQUE  NOT NULL,
    email           VARCHAR(255) UNIQUE NOT NULL,
    password        VARCHAR(255)        NOT NULL,
    biography       VARCHAR(200),
    age             INT                 NOT NULl,
    member_since    DATE                NOT NULL,
    current_room_id INT
);

CREATE TABLE IF NOT EXISTS message
(
    message_id SERIAL PRIMARY KEY NOT NULL,
    user_id    INT                NOT NULL DEFAULT 0,
    content    VARCHAR(1000)      NOT NULL,
    timestamp  TIMESTAMP          NOT NULL,
    room_id    INT                NOT NULL,
    FOREIGN KEY (user_id) REFERENCES client (user_id) ON DELETE SET DEFAULT,
    FOREIGN KEY (room_id) REFERENCES room (room_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS topic
(
    topic_id SERIAL PRIMARY KEY NOT NULL,
    text     VARCHAR(25)        NOT NULL,
    color    VARCHAR(30)        NOT NULL,
    UNIQUE (text, color)
);

CREATE TABLE IF NOT EXISTS topics_rooms
(
    t_id INT NOT NULL,
    r_id INT NOT NULL,
    FOREIGN KEY (t_id) REFERENCES topic (topic_id) ON DELETE CASCADE,
    FOREIGN KEY (r_id) REFERENCES room (room_id) ON DELETE CASCADE,
    PRIMARY KEY (t_id, r_id)
);

ALTER TABLE room
    ADD FOREIGN KEY (creator_id) REFERENCES client (user_id);
ALTER TABLE client
    ADD FOREIGN KEY (current_room_id) REFERENCES room (room_id);




