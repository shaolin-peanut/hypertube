CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT, -- auto incrementing primary key
    username VARCHAR(50) NOT NULL, -- 50 is the max length of a username
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    active BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);