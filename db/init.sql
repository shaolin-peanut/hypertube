CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT, -- auto incrementing primary key
    email VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL, -- 50 is the max length of a username
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    active BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE profile (
    user_id INT PRIMARY KEY,
    gender VARCHAR(10) NOT NULL,
    sexuality VARCHAR(10) NOT NULL,
	biography TEXT NOT NULL,
    interest TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
);
