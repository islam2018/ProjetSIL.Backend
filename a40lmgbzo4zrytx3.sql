-- Adminer 4.7.1 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';

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


DROP TABLE IF EXISTS `annonce`;
CREATE TABLE `annonce` (
  `idAnnonce` int(11) NOT NULL AUTO_INCREMENT,
  `Prix` varchar(50) NOT NULL,
  `idAutomobiliste` varchar(50) NOT NULL,
  `CodeVersion` int(11) NOT NULL,
  `CodeCouleur` int(11) NOT NULL,
  `Km` varchar(50) NOT NULL,
  `Description` text NOT NULL,
  PRIMARY KEY (`idAnnonce`),
  KEY `Contrainte_Anonce_Version` (`CodeVersion`),
  KEY `Contrainte_Anonce_Automobiliste` (`idAutomobiliste`),
  KEY `CodeCouleur` (`CodeCouleur`),
  CONSTRAINT `Contrainte_Anonce_Automobiliste` FOREIGN KEY (`idAutomobiliste`) REFERENCES `automobiliste` (`idAutomobiliste`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Contrainte_Anonce_Version` FOREIGN KEY (`CodeVersion`) REFERENCES `version` (`CodeVersion`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `annonce_ibfk_1` FOREIGN KEY (`CodeCouleur`) REFERENCES `couleur` (`CodeCouleur`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `automobiliste`;
CREATE TABLE `automobiliste` (
  `idAutomobiliste` varchar(50) NOT NULL,
  `NumTel` varchar(30) DEFAULT NULL,
  `Nom` varchar(30) NOT NULL,
  `Prenom` varchar(30) NOT NULL,
  PRIMARY KEY (`idAutomobiliste`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


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


DROP TABLE IF EXISTS `image`;
CREATE TABLE `image` (
  `idImage` int(11) NOT NULL AUTO_INCREMENT,
  `Type` int(11) NOT NULL,
  `Code` int(11) NOT NULL,
  `CheminImage` text NOT NULL,
  `Description` text NOT NULL,
  PRIMARY KEY (`idImage`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


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


DROP TABLE IF EXISTS `modele`;
CREATE TABLE `modele` (
  `CodeModele` int(11) NOT NULL AUTO_INCREMENT,
  `CodeMarque` int(11) NOT NULL,
  `NomModele` varchar(30) NOT NULL,
  PRIMARY KEY (`CodeModele`),
  KEY `Contrainte_Modele_Marque` (`CodeMarque`),
  CONSTRAINT `Contrainte_Modele_Marque` FOREIGN KEY (`CodeMarque`) REFERENCES `marque` (`CodeMarque`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


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


DROP TABLE IF EXISTS `rel_mod_coul`;
CREATE TABLE `rel_mod_coul` (
  `idRelModCoul` int(11) NOT NULL AUTO_INCREMENT,
  `CodeCouleur` int(11) NOT NULL,
  `CodeModele` int(11) NOT NULL,
  PRIMARY KEY (`idRelModCoul`),
  KEY `Contrainte_Modele` (`CodeModele`),
  KEY `Contrainte_couleur_1` (`CodeCouleur`),
  CONSTRAINT `Contrainte_Modele` FOREIGN KEY (`CodeModele`) REFERENCES `modele` (`CodeModele`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Contrainte_couleur_1` FOREIGN KEY (`CodeCouleur`) REFERENCES `couleur` (`CodeCouleur`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


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


-- 2019-03-23 14:17:31
