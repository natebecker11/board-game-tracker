USE tabletopper

DROP TABLE IF EXISTS `Game`
CREATE TABLE `Game` (
    `Id` INT PRIMARY AUTO_INCREMENT,
    `Name` VARCHAR(100) NOT NULL,
    `PlayerMin` INT NOT NULL DEFAULT 1,
    `PlayerMax` INT NULL,
    `BoardGameGeekUrl` VARCHAR(200) NULL,
    `Publisher` VARCHAR(100) NULL,
    `Creator` VARCHAR(100) NULL
)
