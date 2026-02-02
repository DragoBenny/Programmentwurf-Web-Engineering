CREATE DATABASE `hiking-db`;

USE `hiking-db`;

CREATE TABLE `Users`(
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `username` varchar(255) DEFAULT NULL,
    `email` varchar(255) DEFAULT NULL,
    `password` varchar(255) DEFAULT NULL,
    `active` boolean DEFAULT True,
    PRIMARY KEY (`id`)
);

INSERT INTO `Users` (`username`,`email`, `password`) VALUES (`Andy84`, `Andy@gmail.com`, `password`);