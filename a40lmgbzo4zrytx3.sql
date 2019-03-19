-- Adminer 4.7.1 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP DATABASE IF EXISTS `a40lmgbzo4zrytx3`;
CREATE DATABASE `a40lmgbzo4zrytx3` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `a40lmgbzo4zrytx3`;

DROP TABLE IF EXISTS `administrateur`;
CREATE TABLE `administrateur` (
  `idAdmin` int(11) NOT NULL AUTO_INCREMENT,
  `Mail` varchar(30) NOT NULL,
  `Nom` varchar(30) NOT NULL,
  `Prenom` varchar(30) NOT NULL,
  `Mdp` text NOT NULL,
  PRIMARY KEY (`idAdmin`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `administrateur` (`idAdmin`, `Mail`, `Nom`, `Prenom`, `Mdp`) VALUES
(1,	'admin@gmail.fr',	'Administrateur',	'Administrateur',	'$2a$10$cj9MfyV1HIcA9U/BX3ZWk.fliZsSor9iComAw.alTNsBdqUPEU10C');

DROP TABLE IF EXISTS `annonce`;
CREATE TABLE `annonce` (
  `idAnnonce` int(11) NOT NULL AUTO_INCREMENT,
  `Prix` varchar(50) NOT NULL,
  `idAutomobiliste` varchar(50) NOT NULL,
  `CodeVersion` int(11) NOT NULL,
  PRIMARY KEY (`idAnnonce`),
  KEY `Contrainte_Anonce_Version` (`CodeVersion`),
  KEY `Contrainte_Anonce_Automobiliste` (`idAutomobiliste`),
  CONSTRAINT `Contrainte_Anonce_Automobiliste` FOREIGN KEY (`idAutomobiliste`) REFERENCES `automobiliste` (`idAutomobiliste`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Contrainte_Anonce_Version` FOREIGN KEY (`CodeVersion`) REFERENCES `version` (`CodeVersion`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `annonce` (`idAnnonce`, `Prix`, `idAutomobiliste`, `CodeVersion`) VALUES
(39,	'566622569 DA',	'380466752766558',	89451),
(42,	'57853247 DA',	'380466752766558',	89451),
(43,	'57853247 DA',	'380466752766558',	89451);

DROP TABLE IF EXISTS `automobiliste`;
CREATE TABLE `automobiliste` (
  `idAutomobiliste` varchar(50) NOT NULL,
  `NumTel` varchar(30) DEFAULT NULL,
  `Nom` varchar(30) NOT NULL,
  `Prenom` varchar(30) NOT NULL,
  PRIMARY KEY (`idAutomobiliste`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `automobiliste` (`idAutomobiliste`, `NumTel`, `Nom`, `Prenom`) VALUES
('117943661900596087054',	NULL,	'ISLAM',	'NEDDAR'),
('380466752766558',	NULL,	'islem',	'neddar');

DROP TABLE IF EXISTS `commande`;
CREATE TABLE `commande` (
  `idCommande` int(11) NOT NULL AUTO_INCREMENT,
  `Date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Montant` int(11) NOT NULL,
  `idAutomobiliste` varchar(50) NOT NULL,
  `NumChassis` int(11) NOT NULL,
  PRIMARY KEY (`idCommande`),
  KEY `Contrainte_Commande_Vehicule` (`NumChassis`),
  KEY `Contrainte_Commande_Automobiliste` (`idAutomobiliste`),
  CONSTRAINT `Contrainte_Commande_Automobiliste` FOREIGN KEY (`idAutomobiliste`) REFERENCES `automobiliste` (`idAutomobiliste`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Contrainte_Commande_Vehicule` FOREIGN KEY (`NumChassis`) REFERENCES `vehicule` (`NumChassis`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `couleur`;
CREATE TABLE `couleur` (
  `CodeCouleur` int(11) NOT NULL AUTO_INCREMENT,
  `NomCouleur` varchar(30) NOT NULL,
  PRIMARY KEY (`CodeCouleur`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `couleur` (`CodeCouleur`, `NomCouleur`) VALUES
(1,	'red');

DROP TABLE IF EXISTS `favoris_modele`;
CREATE TABLE `favoris_modele` (
  `idFavorisModele` int(11) NOT NULL AUTO_INCREMENT,
  `CodeModele` int(11) NOT NULL,
  `idAutomobiliste` varchar(50) NOT NULL,
  PRIMARY KEY (`idFavorisModele`),
  KEY `contrainte_fav_modele` (`CodeModele`),
  KEY `contrainte_fav_automob` (`idAutomobiliste`),
  CONSTRAINT `contrainte_fav_automob` FOREIGN KEY (`idAutomobiliste`) REFERENCES `automobiliste` (`idAutomobiliste`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contrainte_fav_modele` FOREIGN KEY (`CodeModele`) REFERENCES `modele` (`CodeModele`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `favoris_modele` (`idFavorisModele`, `CodeModele`, `idAutomobiliste`) VALUES
(4,	48756,	'380466752766558'),
(20,	87651,	'380466752766558');

DROP TABLE IF EXISTS `favoris_version`;
CREATE TABLE `favoris_version` (
  `idFavorisVersion` int(11) NOT NULL AUTO_INCREMENT,
  `CodeVersion` int(11) NOT NULL,
  `idAutomobiliste` varchar(50) NOT NULL,
  PRIMARY KEY (`idFavorisVersion`),
  KEY `contrainte_fav_version` (`CodeVersion`),
  KEY `contrainte_fav_automob1` (`idAutomobiliste`),
  CONSTRAINT `contrainte_fav_automob1` FOREIGN KEY (`idAutomobiliste`) REFERENCES `automobiliste` (`idAutomobiliste`),
  CONSTRAINT `contrainte_fav_version` FOREIGN KEY (`CodeVersion`) REFERENCES `version` (`CodeVersion`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `favoris_version` (`idFavorisVersion`, `CodeVersion`, `idAutomobiliste`) VALUES
(15,	89451,	'380466752766558'),
(16,	12454,	'380466752766558');

DROP TABLE IF EXISTS `image`;
CREATE TABLE `image` (
  `idImage` int(11) NOT NULL AUTO_INCREMENT,
  `Type` int(11) NOT NULL,
  `Code` int(11) NOT NULL,
  `CheminImage` text NOT NULL,
  `Description` text NOT NULL,
  PRIMARY KEY (`idImage`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `image` (`idImage`, `Type`, `Code`, `CheminImage`, `Description`) VALUES
(18,	0,	5,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552051778/Marques/2019-03-08T13-29-37.595Z_renault-logo.png.png',	'Logo Renault'),
(19,	2,	9000545,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552564699/Versions/2019-03-14T11-58-18.947Z_offre3.png.png',	''),
(26,	3,	5,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552569461/Annonces/2019-03-14T13-17-40.424Z_bg_city.png.png',	'good car'),
(27,	3,	5,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552569461/Annonces/2019-03-14T13-17-41.014Z_logo.png.png',	'good car'),
(28,	3,	5,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552569473/Annonces/2019-03-14T13-17-41.308Z_Web.pdf.pdf',	'good car'),
(29,	2,	90875,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552571322/Versions/2019-03-14T13-48-32.793Z_user.png.png',	''),
(30,	2,	90635,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552571749/Versions/2019-03-14T13-55-39.078Z_user.png.png',	''),
(31,	2,	6000005,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552571952/Versions/2019-03-14T13-59-02.172Z_user.png.png',	''),
(32,	2,	766665,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552572103/Versions/2019-03-14T14-01-32.678Z_user.png.png',	''),
(33,	2,	200005,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552572372/Versions/2019-03-14T14-06-02.256Z_user.png.png',	''),
(34,	2,	0,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552572650/Versions/2019-03-14T14-10-41.140Z_user.png.png',	''),
(35,	2,	761245,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552572751/Versions/2019-03-14T14-12-31.190Z_offre3.png.png',	''),
(36,	2,	76545,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552572959/Versions/2019-03-14T14-15-49.928Z_user.png.png',	''),
(37,	2,	95,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552573169/Versions/2019-03-14T14-19-29.562Z_offre3.png.png',	''),
(38,	2,	5445,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552573301/Versions/2019-03-14T14-21-39.820Z_Stock.png.png',	''),
(39,	3,	15,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552593796/Annonces/2019-03-14T20-03-16.170Z_bg_city.png.png',	'good car'),
(40,	3,	15,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552593797/Annonces/2019-03-14T20-03-16.698Z_logo.png.png',	'good car'),
(41,	3,	15,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552593797/Annonces/2019-03-14T20-03-16.939Z_try3.png.png',	'good car'),
(42,	3,	30,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552668127/Annonces/2019-03-15T16-42-07.239Z_bg_city.png.png',	'test'),
(43,	3,	30,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552668128/Annonces/2019-03-15T16-42-07.816Z_logo.png.png',	'test'),
(44,	3,	30,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552668128/Annonces/2019-03-15T16-42-08.064Z_no-photo.png.png',	'test'),
(45,	3,	33,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552668527/Annonces/2019-03-15T16-48-46.806Z_3144.png.jpg',	'somthing'),
(46,	3,	34,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552669565/Annonces/2019-03-15T17-06-04.784Z_bg_city.png.png',	'test'),
(47,	3,	34,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552669565/Annonces/2019-03-15T17-06-05.341Z_logo.png.png',	'test'),
(48,	3,	34,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552669566/Annonces/2019-03-15T17-06-05.580Z_no-photo.png.png',	'test'),
(49,	3,	39,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552682442/Annonces/2019-03-15T20-40-41.646Z_logo.png.png',	'good car'),
(50,	3,	39,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552682442/Annonces/2019-03-15T20-40-41.895Z_no-photo.png.png',	'good car'),
(51,	3,	42,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552688517/Annonces/2019-03-15T22-21-32.740Z_received_404388053457828.jpeg.jpg',	'something '),
(52,	3,	43,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552688848/Annonces/2019-03-15T22-26-45.046Z_FB_IMG_1552307651101.jpg.jpg',	'something '),
(53,	2,	100015,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552725688/Versions/2019-03-16T08-40-22.368Z_user.png.png',	''),
(54,	2,	100025,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552753679/Versions/2019-03-16T16-26-40.663Z_user.png.png',	''),
(55,	0,	55,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552757914/Marques/2019-03-16T17-38-34.486Z_twitter.png.png',	''),
(56,	2,	100035,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552758197/Versions/2019-03-16T17-43-17.494Z_img2.png.png',	''),
(57,	0,	9998,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552769759/Marques/2019-03-16T20-55-59.032Z_logo.png.png',	''),
(58,	0,	7841,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552771202/Marques/2019-03-16T21-19-53.240Z_no-photo.png.png',	''),
(59,	0,	752,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552771863/Marques/2019-03-16T21-31-02.803Z_try3.png.png',	''),
(60,	0,	985,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552772701/Marques/2019-03-16T21-45-01.048Z_logo.png.png',	''),
(61,	0,	755,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552772753/Marques/2019-03-16T21-45-53.392Z_logo.png.png',	''),
(62,	2,	100045,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552816477/Versions/2019-03-17T09-54-36.970Z_img2.png.png',	''),
(63,	0,	125,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552827352/Marques/2019-03-17T12-55-52.082Z_logo.png.png',	''),
(64,	0,	445,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552827441/Marques/2019-03-17T12-57-20.905Z_Warning.png.png',	''),
(65,	0,	445,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552827441/Marques/2019-03-17T12-57-21.184Z_Warning.png.png',	''),
(66,	2,	100065,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552836535/Versions/2019-03-17T15-28-55.441Z_img2.png.png',	''),
(67,	0,	874,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552861606/Marques/2019-03-17T22-26-45.697Z_logo.png.png',	''),
(68,	2,	100035,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552898966/Versions/2019-03-18T08-49-17.402Z_user.png.png',	''),
(69,	2,	100035,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552899249/Versions/2019-03-18T08-54-07.530Z_Gestion%20modele.png.png',	''),
(70,	2,	100015,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552914442/Versions/2019-03-18T13-07-19.879Z_story-board-jumia-food-highres.png.png',	''),
(71,	2,	100015,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552914450/Versions/2019-03-18T13-07-19.583Z_user.png.png',	''),
(72,	5,	6,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552914459/Versions/2019-03-18T13-07-39.094Z_offre3.png.png',	''),
(73,	5,	7,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552914468/Versions/2019-03-18T13-07-39.135Z_user.png.png',	''),
(74,	2,	84571,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552914564/Versions/2019-03-18T13-09-21.411Z_Stock.png.png',	''),
(75,	2,	84571,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552914572/Versions/2019-03-18T13-09-21.110Z_user.png.png',	''),
(76,	2,	100045,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552922701/Versions/2019-03-18T15-25-00.732Z_offre3.png.png',	''),
(77,	2,	100045,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552922788/Versions/2019-03-18T15-26-28.117Z_offre3.png.png',	''),
(78,	2,	100045,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552922797/Versions/2019-03-18T15-26-28.090Z_user.png.png',	''),
(79,	2,	100045,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552922852/Versions/2019-03-18T15-27-22.776Z_user.png.png',	''),
(80,	2,	100045,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552923332/Versions/2019-03-18T15-35-27.824Z_Stock.png.png',	''),
(81,	2,	100015,	'http://res.cloudinary.com/hftzhatr4/image/upload/v1552923549/Versions/2019-03-18T15-39-08.096Z_Stock.png.png',	'');

DROP TABLE IF EXISTS `lignetarif`;
CREATE TABLE `lignetarif` (
  `idLigneTarif` int(11) NOT NULL AUTO_INCREMENT,
  `Type` int(11) NOT NULL,
  `Code` int(11) NOT NULL,
  `DateDebut` date NOT NULL,
  `DateFin` date NOT NULL,
  `Prix` int(11) NOT NULL,
  PRIMARY KEY (`idLigneTarif`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `marque`;
CREATE TABLE `marque` (
  `CodeMarque` int(11) NOT NULL AUTO_INCREMENT,
  `NomMarque` varchar(30) NOT NULL,
  PRIMARY KEY (`CodeMarque`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `marque` (`CodeMarque`, `NomMarque`) VALUES
(5,	'Renault'),
(6,	'Mercedes'),
(8,	'Dacia'),
(10,	'Audi'),
(12,	'Peugeot'),
(55,	'KIA'),
(125,	'MG'),
(445,	'ABC'),
(542,	'nouvelle marque'),
(554,	'this is a test'),
(874,	'new '),
(8542,	'test3'),
(22345,	'Hyundai'),
(79613,	'Porshe');

DROP TABLE IF EXISTS `modele`;
CREATE TABLE `modele` (
  `CodeModele` int(11) NOT NULL AUTO_INCREMENT,
  `CodeMarque` int(11) NOT NULL,
  `NomModele` varchar(30) NOT NULL,
  PRIMARY KEY (`CodeModele`),
  KEY `Contrainte_Modele_Marque` (`CodeMarque`),
  CONSTRAINT `Contrainte_Modele_Marque` FOREIGN KEY (`CodeMarque`) REFERENCES `marque` (`CodeMarque`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `modele` (`CodeModele`, `CodeMarque`, `NomModele`) VALUES
(1,	5,	'Clio'),
(18764,	12,	'3008'),
(48756,	12,	'308'),
(54895,	12,	'508'),
(67512,	5,	'Fluence'),
(78945,	12,	'208'),
(87651,	5,	'Megane');

DROP TABLE IF EXISTS `offre`;
CREATE TABLE `offre` (
  `idOffre` int(11) NOT NULL AUTO_INCREMENT,
  `idAutomobiliste` varchar(50) NOT NULL,
  `idAnnonce` int(11) NOT NULL,
  `Montant` varchar(30) NOT NULL,
  PRIMARY KEY (`idOffre`),
  KEY `Contrainte_Offre_Anonce` (`idAnnonce`),
  KEY `Contrainte_Offre_Automobiliste` (`idAutomobiliste`),
  CONSTRAINT `Contrainte_Offre_Anonce` FOREIGN KEY (`idAnnonce`) REFERENCES `annonce` (`idAnnonce`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Contrainte_Offre_Automobiliste` FOREIGN KEY (`idAutomobiliste`) REFERENCES `automobiliste` (`idAutomobiliste`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `option`;
CREATE TABLE `option` (
  `CodeOption` int(11) NOT NULL AUTO_INCREMENT,
  `NomOption` varchar(30) NOT NULL,
  PRIMARY KEY (`CodeOption`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `option` (`CodeOption`, `NomOption`) VALUES
(1,	'Air bag'),
(2,	'Climatisation'),
(5,	'option x'),
(10,	'Air Bag'),
(11,	'Climatisation'),
(12,	'Option2'),
(70,	'Climatisation'),
(84,	'parchoc'),
(123,	'Anti derapage'),
(195,	'Toit Panoramique'),
(354,	'Airbag'),
(768,	'Chevaux'),
(849,	'Climatisation'),
(900,	'Air'),
(987,	'Clio7'),
(56789,	'AIRBAG'),
(100000001,	'Testing post existed'),
(100000002,	'Testing post existed'),
(100000003,	'Testing post existed'),
(100000004,	'Testing post existed'),
(100000005,	'Testing post existed'),
(100000006,	'Testing post existed'),
(100000007,	'Testing post existed'),
(100000008,	'Testing post existed'),
(100000009,	'Testing post existed'),
(100000010,	'Testing post existed'),
(100000011,	'Testing post existed'),
(100000012,	'Testing post existed'),
(100000013,	'Testing post existed'),
(100000014,	'Testing post existed'),
(100000015,	'Testing post existed'),
(100000016,	'Testing post existed'),
(100000017,	'Testing post existed'),
(100000018,	'Testing post existed'),
(100000019,	'Testing post existed'),
(100000020,	'Testing post existed'),
(100000021,	'Testing post existed'),
(100000022,	'Testing post existed'),
(100000023,	'Testing post existed'),
(100000024,	''),
(100000025,	'');

DROP TABLE IF EXISTS `rel_mod_opt`;
CREATE TABLE `rel_mod_opt` (
  `idRelModOpt` int(11) NOT NULL AUTO_INCREMENT,
  `CodeModele` int(11) NOT NULL,
  `CodeOption` int(11) NOT NULL,
  PRIMARY KEY (`idRelModOpt`),
  KEY `Contrainte_Modele_1` (`CodeModele`),
  KEY `Contrainte_Option_2` (`CodeOption`),
  CONSTRAINT `Contrainte_Modele_1` FOREIGN KEY (`CodeModele`) REFERENCES `modele` (`CodeModele`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Contrainte_Option_2` FOREIGN KEY (`CodeOption`) REFERENCES `option` (`CodeOption`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `rel_mod_opt` (`idRelModOpt`, `CodeModele`, `CodeOption`) VALUES
(42165,	1,	12),
(42166,	1,	11),
(42167,	1,	10);

DROP TABLE IF EXISTS `rel_vehic_opt`;
CREATE TABLE `rel_vehic_opt` (
  `idRelVehicOption` int(11) NOT NULL AUTO_INCREMENT,
  `NumChassis` int(11) NOT NULL,
  `CodeOption` int(11) NOT NULL,
  PRIMARY KEY (`idRelVehicOption`),
  KEY `Contrainte_vehicule` (`NumChassis`),
  KEY `Contrainte_option` (`CodeOption`),
  CONSTRAINT `Contrainte_option` FOREIGN KEY (`CodeOption`) REFERENCES `option` (`CodeOption`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Contrainte_vehicule` FOREIGN KEY (`NumChassis`) REFERENCES `vehicule` (`NumChassis`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `rel_ver_coul`;
CREATE TABLE `rel_ver_coul` (
  `idRelVerCoul` int(11) NOT NULL AUTO_INCREMENT,
  `CodeVersion` int(11) NOT NULL,
  `CodeCouleur` int(11) NOT NULL,
  PRIMARY KEY (`idRelVerCoul`),
  KEY `Contrainte_Version` (`CodeVersion`),
  KEY `Contrainte_Couleur` (`CodeCouleur`),
  CONSTRAINT `Contrainte_Couleur` FOREIGN KEY (`CodeCouleur`) REFERENCES `couleur` (`CodeCouleur`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Contrainte_Version` FOREIGN KEY (`CodeVersion`) REFERENCES `version` (`CodeVersion`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `rel_ver_opt`;
CREATE TABLE `rel_ver_opt` (
  `idRelVerOpt` int(11) NOT NULL AUTO_INCREMENT,
  `CodeVersion` int(11) NOT NULL,
  `CodeOption` int(11) NOT NULL,
  PRIMARY KEY (`idRelVerOpt`),
  KEY `Contrainte_Version_1` (`CodeVersion`),
  KEY `Contrainte_Option_1` (`CodeOption`),
  CONSTRAINT `Contrainte_Option_1` FOREIGN KEY (`CodeOption`) REFERENCES `option` (`CodeOption`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Contrainte_Version_1` FOREIGN KEY (`CodeVersion`) REFERENCES `version` (`CodeVersion`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `rel_ver_opt` (`idRelVerOpt`, `CodeVersion`, `CodeOption`) VALUES
(10,	12454,	354),
(11,	12454,	123),
(12,	49765,	354),
(13,	49765,	195),
(100000023,	100015,	11),
(100000025,	100025,	10),
(100000026,	100025,	11),
(100000027,	100035,	10),
(100000028,	100045,	11),
(100000029,	100045,	10),
(100000030,	100035,	11),
(100000031,	100065,	11);

DROP TABLE IF EXISTS `utilisateurfabricant`;
CREATE TABLE `utilisateurfabricant` (
  `IdUserF` int(11) NOT NULL AUTO_INCREMENT,
  `Mail` varchar(30) NOT NULL,
  `Nom` varchar(30) NOT NULL,
  `Prenom` varchar(30) NOT NULL,
  `Mdp` text NOT NULL,
  `NumTel` int(11) NOT NULL,
  `Fabricant` int(11) NOT NULL,
  `Valide` tinyint(1) NOT NULL DEFAULT '0',
  `Bloque` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`IdUserF`),
  UNIQUE KEY `unique_mail` (`Mail`),
  KEY `Contrainte_Utilisateur_Fabricant` (`Fabricant`),
  CONSTRAINT `Contrainte_Utilisateur_Fabricant` FOREIGN KEY (`Fabricant`) REFERENCES `marque` (`CodeMarque`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `utilisateurfabricant` (`IdUserF`, `Mail`, `Nom`, `Prenom`, `Mdp`, `NumTel`, `Fabricant`, `Valide`, `Bloque`) VALUES
(6,	'islam@esi.dz',	'BOUAYACHE',	'islam',	'$2b$10$ZxO5nTq2QIvoiddaITksc.lMZv.lAnwh6FcIWJY1bJcM8vR23O.ZO',	699415163,	5,	0,	1),
(7,	'islam1@esi.dz',	'BOUAYACHE',	'Mohamed Islam',	'$2a$10$vkxiJmerHv3QlRQeGRwoTesUVKuC7iD9YlYFZZ3ve8XayEqRxFaO.',	994,	5,	0,	1);

DROP TABLE IF EXISTS `vehicule`;
CREATE TABLE `vehicule` (
  `NumChassis` int(11) NOT NULL,
  `Concessionaire` varchar(30) NOT NULL,
  `CodeVersion` int(11) NOT NULL,
  `CodeCouleur` int(11) NOT NULL,
  UNIQUE KEY `NumChassis` (`NumChassis`),
  KEY `Contrainte_Vehicule_Version` (`CodeVersion`),
  KEY `Contrainte_Vehicule_Couleur` (`CodeCouleur`),
  CONSTRAINT `Contrainte_Vehicule_Couleur` FOREIGN KEY (`CodeCouleur`) REFERENCES `couleur` (`CodeCouleur`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Contrainte_Vehicule_Version` FOREIGN KEY (`CodeVersion`) REFERENCES `version` (`CodeVersion`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `version`;
CREATE TABLE `version` (
  `CodeVersion` int(11) NOT NULL AUTO_INCREMENT,
  `CodeModele` int(11) NOT NULL,
  `NomVersion` varchar(30) NOT NULL,
  PRIMARY KEY (`CodeVersion`),
  KEY `Contrainte_Version_Modele` (`CodeModele`),
  CONSTRAINT `Contrainte_Version_Modele` FOREIGN KEY (`CodeModele`) REFERENCES `modele` (`CodeModele`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `version` (`CodeVersion`, `CodeModele`, `NomVersion`) VALUES
(12454,	87651,	'Life'),
(49765,	67512,	'Sport Version'),
(89451,	87651,	'RS'),
(100015,	1,	'Clio série 5'),
(100025,	1,	'Clio série 4'),
(100035,	1,	'Clio 3'),
(100045,	1,	'Clio 7'),
(100065,	1,	'Clio Campus');

-- 2019-03-19 23:00:17
