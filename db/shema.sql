CREATE DATABASE SECURE_SWAP;
use SECURE_SWAP;

CREATE TABLE `ds_mon` (
  `id` varchar(50) NOT NULL,
  `display_name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `ds_nhom_hoc` (
  `id_to_hoc` varchar(25) NOT NULL,
  `ma_mon` varchar(50) NOT NULL,
  `so_tc` int NOT NULL,
  `nhom` varchar(10) DEFAULT NULL,
  `nam` varchar(10) DEFAULT NULL,
  `tkb_map` BIGINT,
  PRIMARY KEY (`id_to_hoc`),
  KEY `ma_mon` (`ma_mon`),
  CONSTRAINT `ds_nhom_hoc_ibfk_1` FOREIGN KEY (`ma_mon`) REFERENCES `ds_mon` (`id`) ON DELETE CASCADE
);

DROP TABLE `user`;

CREATE TABLE `user` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `two_factor_secret` TEXT DEFAULT NULL,

    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL DEFAULT NULL,
    `is_active` BOOLEAN DEFAULT TRUE
);

CREATE TABLE `exchange_posts` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `id_mon` VARCHAR(50) NOT NULL,
    `current_section` VARCHAR(25) NOT NULL,
    `desired_section` VARCHAR(25) NOT NULL,
    `description` TEXT NOT NULL,
    `author` INTEGER NOT NULL,

    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL DEFAULT NULL,
    `is_active` BOOLEAN DEFAULT TRUE,

    Foreign Key (author) REFERENCES `user`(`id`),
    Foreign Key (id_mon) REFERENCES `ds_mon`(`id`)
);
