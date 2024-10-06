DROP DATABASE IF EXISTS `gamer_for_gamer`;
CREATE DATABASE `gamer_for_gamer`;
USE `gamer_for_gamer`;

CREATE TABLE users (
  user_id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(50),
  pass VARCHAR(50),
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  age INT,
  zip_code INT NOT NULL,
  PRIMARY KEY (user_id)
);


CREATE TABLE games (
  game_id INT NOT NULL AUTO_INCREMENT,
  game_title VARCHAR(255) NOT NULL,
  PRIMARY KEY (game_id)
);


CREATE TABLE conversations (
  conversation_id INT NOT NULL AUTO_INCREMENT,
  participants JSON NOT NULL,
  messages JSON NOT NULL,
  PRIMARY KEY (conversation_id)
);



CREATE TABLE matches (
	match_id INT NOT NULL AUTO_INCREMENT,
	user_id_a INT NOT NULL,
    user_id_b INT NOT NULL,
    FOREIGN KEY (user_id_a) REFERENCES users(user_id),
    FOREIGN KEY (user_id_b) REFERENCES users(user_id),
    PRIMARY KEY (match_id)
);

CREATE TABLE selections (
  selection_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  game_id INT NOT NULL,
  PRIMARY KEY (selection_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (game_id) REFERENCES games(game_id)
);

CREATE TABLE user_likes (
  like_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,          -- The user who is liking
  liked_user_id INT NOT NULL,     -- The user being liked
  PRIMARY KEY (like_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (liked_user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
