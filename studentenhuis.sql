DROP DATABASE IF EXISTS `studentenhuis`;
CREATE DATABASE `studentenhuis`;
USE `studentenhuis`;

-- studentenhuis_user aanmaken
CREATE USER 'studentenhuis_user'@'%' IDENTIFIED BY 'secret';
CREATE USER 'studentenhuis_user'@'localhost' IDENTIFIED BY 'secret';

-- geef in een keer alle rechten - soort administrator!
GRANT ALL ON `studentenhuis`.* TO 'studentenhuis_user'@'%';
GRANT ALL ON `studentenhuis`.* TO 'studentenhuis_user'@'localhost';

-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;
CREATE TABLE IF NOT EXISTS `user` (
	`ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`Firstname` VARCHAR(32) NOT NULL,
	`Lastname` VARCHAR(32) NOT NULL,
	`Email` VARCHAR(32) NOT NULL,
	`Password` VARCHAR(32) NOT NULL,
	PRIMARY KEY (`ID`)
) 
ENGINE = InnoDB;

-- Voorbeeld insert query. Wanneer je in Nodejs de ? variant gebruikt hoeven de '' niet om de waarden.
-- Zet die dan wel in het array er na, in de goede volgorde.
INSERT INTO `user` (Firstname, Lastname, Email, Password) VALUES ('Jan', 'Smit', 'jsmit@server.nl', 'secret');

-- -----------------------------------------------------
-- Table `studentenhuis`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `studentenhuis` ;
CREATE TABLE IF NOT EXISTS `studentenhuis` (
	`ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`Titel` VARCHAR(32) NOT NULL,
	`Beschrijving` VARCHAR(1000) NOT NULL,
	`Status` ENUM('OPEN','GEANNULEERD','AFGEROND') NOT NULL DEFAULT 'OPEN',
	`LaatstGewijzigdOp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`ID`)
) 
ENGINE = InnoDB;














-- INSERT INTO `users` (`Titel`,`Beschrijving`) VALUES
-- ('Boodschappen halen', 'Niet vergeten om boodschappen te halen'),
-- ('Huiswerk maken', 'Oefenen met Node.js, MySql en Git!'),
-- ('Sporten', 'Ook belangrijk'),
-- ('Netflixen', 'Fargo nog kijken!');