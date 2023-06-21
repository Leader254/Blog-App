-- -- Table One - users
-- CREATE TABLE `blog`.`users` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `username` VARCHAR(255) NOT NULL,
--   `email` VARCHAR(255) NOT NULL,
--   `password` VARCHAR(255) NOT NULL,
--   `img` VARCHAR(255) NOT NULL,
--   PRIMARY KEY (`id`)),


-- -- Table Two - blogs
-- CREATE TABLE `blog`.`posts` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `title` VARCHAR(255) NOT NULL,
--   `desc` VARCHAR(1000) NOT NULL,
--   `img` VARCHAR(255) NOT NULL,
--   `date` DATETIME NOT NULL,
--   `uid` INT NOT NULL,
--   PRIMARY KEY (`id`),
--   INDEX `uid_idx` (`uid` ASC) VISIBLE,
--   CONSTRAINT `uid`
--     FOREIGN KEY (`uid`)
--     REFERENCES `blog`.`users` (`id`)
--     ON DELETE CASCADE
--     ON UPDATE CASCADE);



-- CREATE DATABASE Blogs;
-- USE Blogs;
-- SQL SERVER Blogs Table


-- Table One - Users
CREATE TABLE Users (
  id INT NOT NULL IDENTITY(1,1),
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  img VARCHAR(255),
  PRIMARY KEY (id)
);

-- Table Two - Posts
CREATE TABLE Posts (
  id INT PRIMARY KEY IDENTITY,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  img VARCHAR(255) NOT NULL,
  post_date DATETIME NOT NULL,
  uid INT NOT NULL,
  FOREIGN KEY (uid) REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table Three - Categories
CREATE TABLE Categories (
  id INT PRIMARY KEY IDENTITY,
  name VARCHAR(255) NOT NULL
);

-- Table Four - PostCategories (junction table)
CREATE TABLE PostCategories (
  postId INT NOT NULL,
  categoryId INT NOT NULL,
  PRIMARY KEY (postId, categoryId),
  FOREIGN KEY (postId) REFERENCES Posts(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (categoryId) REFERENCES Categories(id) ON DELETE CASCADE ON UPDATE CASCADE
);
