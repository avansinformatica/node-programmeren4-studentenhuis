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
	`Password` CHAR(64) NOT NULL,
	PRIMARY KEY (`ID`)
) 
ENGINE = InnoDB;

-- Voorbeeld insert query. Wanneer je in Nodejs de ? variant gebruikt hoeven de '' niet om de waarden.
-- Zet die dan wel in het array er na, in de goede volgorde.
-- In je Nodejs app zou het password wel encrypted moeten worden.
INSERT INTO `user` (Firstname, Lastname, Email, Password) VALUES ('Jan', 'Smit', 'jsmit@server.nl', 'secret');

-- -----------------------------------------------------
-- Table `studentenhuis`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `studentenhuis` ;
CREATE TABLE IF NOT EXISTS `studentenhuis` (
	`ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`Naam` VARCHAR(32) NOT NULL,
	`Adres` VARCHAR(32) DEFAULT 'hier het adres',
	`UserID` INT UNSIGNED NOT NULL,
	PRIMARY KEY (`ID`)
) 
ENGINE = InnoDB;

ALTER TABLE `studentenhuis` 
ADD CONSTRAINT `fk_studentenhuis_user`
FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`)
ON DELETE NO ACTION
ON UPDATE CASCADE;

-- Voorbeeld insert query. Wanneer je in Nodejs de ? variant gebruikt hoeven de '' niet om de waarden.
INSERT INTO `studentenhuis` (Naam, Adres, UserID) VALUES ('Lovensdijk', 'Lovensdijkstraat, Breda', 1);















-- INSERT INTO `users` (`Titel`,`Beschrijving`) VALUES
-- ('Boodschappen halen', 'Niet vergeten om boodschappen te halen'),
-- ('Huiswerk maken', 'Oefenen met Node.js, MySql en Git!'),
-- ('Sporten', 'Ook belangrijk'),
-- ('Netflixen', 'Fargo nog kijken!');