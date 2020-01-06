USE `test_tecoexpress`;

-- create LibraryBooks table
--------------------------------------------------------------

DROP TABLE IF EXISTS `LibraryBooks`;

CREATE TABLE `LibraryBooks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `publisher` varchar(255) DEFAULT NULL,
  `isbn` varchar(255) NOT NULL,
  `desc` varchar(255) DEFAULT '내용 없음',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `isbn` (`isbn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- create RentHistories table
--------------------------------------------------------------

DROP TABLE IF EXISTS `RentHistories`;

CREATE TABLE `RentHistories` (
  `serialId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`serialId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



-- create Serials table
--------------------------------------------------------------

DROP TABLE IF EXISTS `Serials`;

CREATE TABLE `Serials` (
  `id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



-- create Users table
--------------------------------------------------------------

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `githubId` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `avatarUrl` varchar(255) NOT NULL,
  `authorization` enum('NONE','USER','MANAGER','KING') NOT NULL DEFAULT 'NONE',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `githubId` (`githubId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- create WishBooks table
--------------------------------------------------------------

DROP TABLE IF EXISTS `WishBooks`;

CREATE TABLE `WishBooks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `publisher` varchar(255) DEFAULT NULL,
  `isbn` varchar(255) NOT NULL,
  `desc` varchar(255) DEFAULT '내용 없음',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `isbn` (`isbn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;