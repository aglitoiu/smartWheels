CREATE DATABASE `smartWheels` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
CREATE TABLE `Buses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `line` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `longitude` decimal(30,8) NOT NULL,
  `latitude` decimal(30,8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
SELECT * FROM smartWheels.Buses;
CREATE TABLE `Meteo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `temp` decimal(4,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8208 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `Route_5` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `longitude` decimal(30,8) DEFAULT NULL,
  `latitude` decimal(30,8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=343 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `Route_6` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `longitude` decimal(30,8) DEFAULT NULL,
  `latitude` decimal(30,8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `Route_BvCt` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `latitude` decimal(30,8) DEFAULT NULL,
  `longitude` decimal(30,8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=193 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `Route_BvSb` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `latitude` decimal(30,8) DEFAULT NULL,
  `longitude` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=488 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
CREATE TABLE `Trains` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `route` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `longitude` decimal(30,8) DEFAULT NULL,
  `latitude` decimal(30,8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
