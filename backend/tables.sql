-- -- Table One - Users
-- CREATE TABLE Users (
--   id INT NOT NULL IDENTITY(1,1),
--   username VARCHAR(255) NOT NULL,
--   email VARCHAR(255) NOT NULL,
--   password VARCHAR(255) NOT NULL,
--   img VARCHAR(255),
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE Users (
--   id INT IDENTITY(1,1) PRIMARY KEY,
--   username VARCHAR(255) NOT NULL,
--   email VARCHAR(255) NOT NULL,
--   password VARCHAR(255) NOT NULL,
--   img VARCHAR(255),
--   position INT
-- );

-- -- Table Two - Posts
-- CREATE TABLE Posts (
--   id INT PRIMARY KEY IDENTITY,
--   title VARCHAR(255) NOT NULL,
--   description VARCHAR(1000) NOT NULL,
--   img VARCHAR(255) NOT NULL,
--   post_date DATETIME NOT NULL,
--   uid INT NOT NULL,
--   FOREIGN KEY (uid) REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE
-- );



