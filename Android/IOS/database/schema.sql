<<<<<<< HEAD
-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'user'
-- 
-- ---

DROP TABLE IF EXISTS `user`;
		
CREATE TABLE `user` (
  `user_id` INTEGER(20) NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(25) NOT NULL,
  `lastName` VARCHAR(25) NOT NULL,
  `email` VARCHAR(25) NOT NULL,
  `password` VARCHAR(25) NOT NULL,
  `organization` VARCHAR(25) NOT NULL,
  `phoneNumber` INTEGER(25) NOT NULL,
  `primum` INTEGER(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`user_id`, `organization`, `email`)
);

-- ---
-- Table 'queue'
-- 
-- ---

DROP TABLE IF EXISTS `queue`;
		
CREATE TABLE `queue` (
  `queue_id` INTEGER NOT NULL AUTO_INCREMENT,
  `nameOfQueeu` VARCHAR(25) NOT NULL,
  `start_time` TIME(6) NOT NULL,
  `end_time` TIME(6) NOT NULL,
  `date` DATE NOT NULL,
  `timeforone` VARCHAR(25) NOT NULL,
  `windows` VARCHAR(25) NOT NULL,
  `imgUrl` VARCHAR(200) NOT NULL,
  `take_premum` INTEGER(1) NOT NULL DEFAULT 0,
  `accept_join` INTEGER(1) NOT NULL DEFAULT 0,
  `requierment` VARCHAR(80) NOT NULL,
  `creator_id` INTEGER(20) NOT NULL,
  PRIMARY KEY (`queue_id`)
);

-- ---
-- Table 'user_queue'
-- 
-- ---

DROP TABLE IF EXISTS `user_queue`;
		
CREATE TABLE `user_queue` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_id` INTEGER(20) NOT NULL,
  `queue_id` INTEGER NOT NULL,
  `onwindow` INTEGER(25) NOT NULL DEFAULT 0,
  `Notes` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'waitingList'
-- 
-- ---

DROP TABLE IF EXISTS `waitingList`;
		
CREATE TABLE `waitingList` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_id` INTEGER(20) NOT NULL,
  `queue_id` INTEGER NOT NULL,
  `onwindow` SMALLINT(25) NOT NULL DEFAULT 0,
  `notes` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'history'
-- 
-- ---

DROP TABLE IF EXISTS `history`;
		
CREATE TABLE `history` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `queu_name` VARCHAR(25) NOT NULL,
  `organization` VARCHAR(25) NOT NULL,
  `date` DATE NOT NULL,
  `numOfTicket` INTEGER NOT NULL,
  `creator_id` INTEGER(20) NOT NULL,
  `start_time` TIME NOT NULL,
  `end_time` TIME NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'customer'
-- 
-- ---

DROP TABLE IF EXISTS `customer`;
		
CREATE TABLE `customer` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(250) NOT NULL,
  `email` VARCHAR(250) NOT NULL,
  `phoneNumber` VARCHAR(20) NOT NULL,
  `comments` VARCHAR(250) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'customerchat'
-- 
-- ---

DROP TABLE IF EXISTS `customerchat`;
		
CREATE TABLE `customerchat` (
  `id` INTEGER(20) NOT NULL,
  `message` VARCHAR(200) NOT NULL
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `queue` ADD FOREIGN KEY (creator_id) REFERENCES `user` (`user_id`);
ALTER TABLE `user_queue` ADD FOREIGN KEY (user_id) REFERENCES `user` (`user_id`);
ALTER TABLE `user_queue` ADD FOREIGN KEY (queue_id) REFERENCES `queue` (`queue_id`);
ALTER TABLE `waitingList` ADD FOREIGN KEY (user_id) REFERENCES `user` (`user_id`);
ALTER TABLE `waitingList` ADD FOREIGN KEY (queue_id) REFERENCES `queue` (`queue_id`);
ALTER TABLE `history` ADD FOREIGN KEY (creator_id) REFERENCES `user` (`user_id`);
ALTER TABLE `customer` ADD FOREIGN KEY (id) REFERENCES `user` (`user_id`);
ALTER TABLE `customerchat` ADD FOREIGN KEY (id) REFERENCES `user` (`user_id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `user` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `queue` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `user_queue` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `waitingList` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `history` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `customer` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `customerchat` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `user` (`user_id`,`firstName`,`lastName`,`email`,`password`,`organization`,`phoneNumber`,`primum`) VALUES
-- ('','','','','','','','');
-- INSERT INTO `queue` (`queue_id`,`nameOfQueeu`,`start_time`,`end_time`,`date`,`timeforone`,`windows`,`imgUrl`,`take_premum`,`accept_join`,`requierment`,`creator_id`) VALUES
-- ('','','','','','','','','','','','');
-- INSERT INTO `user_queue` (`id`,`user_id`,`queue_id`,`onwindow`,`Notes`) VALUES
-- ('','','','','');
-- INSERT INTO `waitingList` (`id`,`user_id`,`queue_id`,`onwindow`,`notes`) VALUES
-- ('','','','','');
-- INSERT INTO `history` (`id`,`queu_name`,`organization`,`date`,`numOfTicket`,`creator_id`,`start_time`,`end_time`) VALUES
-- ('','','','','','','','');
-- INSERT INTO `customer` (`id`,`name`,`email`,`phoneNumber`,`comments`) VALUES
-- ('','','','','');
-- INSERT INTO `customerchat` (`id`,`message`) VALUES
=======
-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'user'
-- 
-- ---

DROP TABLE IF EXISTS `user`;
		
CREATE TABLE `user` (
  `user_id` INTEGER(20) NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(25) NOT NULL,
  `lastName` VARCHAR(25) NOT NULL,
  `email` VARCHAR(25) NOT NULL,
  `password` VARCHAR(25) NOT NULL,
  `organization` VARCHAR(25) NOT NULL,
  `phoneNumber` INTEGER(25) NOT NULL,
  `primum` INTEGER(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`user_id`, `organization`, `email`)
);

-- ---
-- Table 'queue'
-- 
-- ---

DROP TABLE IF EXISTS `queue`;
		
CREATE TABLE `queue` (
  `queue_id` INTEGER NOT NULL AUTO_INCREMENT,
  `nameOfQueeu` VARCHAR(25) NOT NULL,
  `start_time` TIME(6) NOT NULL,
  `end_time` TIME(6) NOT NULL,
  `date` DATE NOT NULL,
  `timeforone` VARCHAR(25) NOT NULL,
  `windows` VARCHAR(25) NOT NULL,
  `imgUrl` VARCHAR(200) NOT NULL,
  `take_premum` INTEGER(1) NOT NULL DEFAULT 0,
  `accept_join` INTEGER(1) NOT NULL DEFAULT 0,
  `requierment` VARCHAR(80) NOT NULL,
  `creator_id` INTEGER(20) NOT NULL,
  PRIMARY KEY (`queue_id`)
);

-- ---
-- Table 'user_queue'
-- 
-- ---

DROP TABLE IF EXISTS `user_queue`;
		
CREATE TABLE `user_queue` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_id` INTEGER(20) NOT NULL,
  `queue_id` INTEGER NOT NULL,
  `onwindow` INTEGER(25) NOT NULL DEFAULT 0,
  `Notes` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'waitingList'
-- 
-- ---

DROP TABLE IF EXISTS `waitingList`;
		
CREATE TABLE `waitingList` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_id` INTEGER(20) NOT NULL,
  `queue_id` INTEGER NOT NULL,
  `onwindow` SMALLINT(25) NOT NULL DEFAULT 0,
  `notes` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'history'
-- 
-- ---

DROP TABLE IF EXISTS `history`;
		
CREATE TABLE `history` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `queu_name` VARCHAR(25) NOT NULL,
  `organization` VARCHAR(25) NOT NULL,
  `date` DATE NOT NULL,
  `numOfTicket` INTEGER NOT NULL,
  `creator_id` INTEGER(20) NOT NULL,
  `start_time` TIME NOT NULL,
  `end_time` TIME NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'customer'
-- 
-- ---

DROP TABLE IF EXISTS `customer`;
		
CREATE TABLE `customer` (
  `id` INTEGER(20) NOT NULL,
  `name` VARCHAR(250) NOT NULL,
  `email` VARCHAR(250) NOT NULL,
  `phoneNumber` VARCHAR(20) NOT NULL,
  `comments` VARCHAR(250) NULL DEFAULT NULL
);

-- ---
-- Table 'customerchat'
-- 
-- ---

DROP TABLE IF EXISTS `customerchat`;
		
CREATE TABLE `customerchat` (
  `id` INTEGER(20) NOT NULL,
  `message` VARCHAR(200) NOT NULL
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `queue` ADD FOREIGN KEY (creator_id) REFERENCES `user` (`user_id`);
ALTER TABLE `user_queue` ADD FOREIGN KEY (user_id) REFERENCES `user` (`user_id`);
ALTER TABLE `user_queue` ADD FOREIGN KEY (queue_id) REFERENCES `queue` (`queue_id`);
ALTER TABLE `waitingList` ADD FOREIGN KEY (user_id) REFERENCES `user` (`user_id`);
ALTER TABLE `waitingList` ADD FOREIGN KEY (queue_id) REFERENCES `queue` (`queue_id`);
ALTER TABLE `history` ADD FOREIGN KEY (creator_id) REFERENCES `user` (`user_id`);
ALTER TABLE `customer` ADD FOREIGN KEY (id) REFERENCES `user` (`user_id`);
ALTER TABLE `customerchat` ADD FOREIGN KEY (id) REFERENCES `user` (`user_id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `user` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `queue` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `user_queue` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `waitingList` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `history` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `customer` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `customerchat` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `user` (`user_id`,`firstName`,`lastName`,`email`,`password`,`organization`,`phoneNumber`,`primum`) VALUES
-- ('','','','','','','','');
-- INSERT INTO `queue` (`queue_id`,`nameOfQueeu`,`start_time`,`end_time`,`date`,`timeforone`,`windows`,`imgUrl`,`take_premum`,`accept_join`,`requierment`,`creator_id`) VALUES
-- ('','','','','','','','','','','','');
-- INSERT INTO `user_queue` (`id`,`user_id`,`queue_id`,`onwindow`,`Notes`) VALUES
-- ('','','','','');
-- INSERT INTO `waitingList` (`id`,`user_id`,`queue_id`,`onwindow`,`notes`) VALUES
-- ('','','','','');
-- INSERT INTO `history` (`id`,`queu_name`,`organization`,`date`,`numOfTicket`,`creator_id`,`start_time`,`end_time`) VALUES
-- ('','','','','','','','');
-- INSERT INTO `customer` (`id`,`name`,`email`,`phoneNumber`,`comments`) VALUES
-- ('','','','','');
-- INSERT INTO `customerchat` (`id`,`message`) VALUES
>>>>>>> 544fca0d44dac5fa195ee45ca790b1bf82bd0e86
-- ('','');