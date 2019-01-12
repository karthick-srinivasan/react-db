SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema reactdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `reactdb` DEFAULT CHARACTER SET utf8 ;
USE `reactdb`;

-- -----------------------------------------------------
-- Table `reactdb`.`food_menu`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reactdb`.`food_menu` (
  `_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `course` VARCHAR(45) NOT NULL,
  `category` VARCHAR(45) NOT NULL,
  `cuisines` VARCHAR(45) NOT NULL,
  `price` VARCHAR(45) NOT NULL,
  `status` TINYINT(1) NULL DEFAULT 1,
  PRIMARY KEY (`_id`));