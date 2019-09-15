const ANNONCE=require('../model/Annonce');
const OFFRE = require('../model/Offre');
const IMAGE=require('../model/image');
const VERSION = require('../model/version');
const MODELE = require('../model/modele');
const AUTOMOBILISTE = require('../model/automobilste');
const sequelize=require('../config/dbconnection');
const Sequelize = require('sequelize');
ANNONCE.hasMany(IMAGE,{as:'images',foreignKey:'Code',targetKey:'idAnnonce'});
ANNONCE.hasMany(OFFRE,{as:'offres',foreignKey:'idAnnonce',targetKey:'idAnnonce'});
const OffreService = require('./OffreService');
const offreService = new OffreService();
const AutomobService = require('./AutomobilsteService');
const automobService = new AutomobService();
const VersionService = require('./VersionService');
const versionService = new VersionService();


let AnnonceService=class AnnonceService {


    getAllAnnonces() {
        return ANNONCE.findAll({
            include:[
                {model:IMAGE, attributes:['CheminImage'],where:{Type:3},as:'images',required:false}
            ]
        });
    }

    getAllAnnoncesOfAutomobiliste(idAutomobiliste) {

        return ANNONCE.findAll({
            include:[

                {model:IMAGE,attributes:['CheminImage'],where:{Type:3}, as:'images',required:false},
                {model:OFFRE,
                    attributes:['idAutomobiliste'] ,as:'offres',required:false}
            ],
            where: {idAutomobiliste:  idAutomobiliste}

        }).then(data => {
            return new Promise((resolve, reject)=>{
                var tab= [];
                var promises_offres= [];
                var promises_automob= [];
                var promises_versions= [];
                data.forEach((ab) => {
                    let a = ab.toJSON();
                    promises_offres.push(offreService.getNbOffre(a.idAnnonce));
                    promises_automob.push(automobService.getAutomobilste(a.idAutomobiliste));
                    promises_versions.push(versionService.getVersionInfo(a.CodeVersion));
                });

                Promise.all(promises_offres).then(nbOffres=> {
                    Promise.all(promises_automob).then(automobs => {
                        Promise.all(promises_versions).then(versions => {
                            let i = 0;
                            data.forEach(ab => {
                                let a = ab.toJSON();
                                tab.push({
                                    idAnnonce: a.idAnnonce,
                                    Prix: a.Prix,
                                    automobiliste: automobs[i],
                                    version: {
                                        CodeVersion: versions[i].CodeVersion,
                                        NomVersion: versions[i].NomVersion,
                                        NomModele: versions[i].modele.NomModele,
                                        NomMarque: versions[i].modele.marque.NomMarque
                                    },
                                    Couleur: a.Couleur,
                                    Km: a.Km,
                                    Carburant: a.Carburant,
                                    Annnee : a.Annee,
                                    Description: a.Description,
                                    NombreOffres: nbOffres[i],
                                    images: a.images
                                });
                                i++;
                            });
                            resolve(tab);
                        }).catch(e => {
                            reject(e);
                        });
                    }).catch(e => {
                        reject(e);
                    });
                }).catch(e => {
                    reject(e);
                });

            });

        }).catch(erreur=>{
            return new Promise((resolve,reject)=>{
                console.log(erreur);
                reject(erreur);
            });
        });
    }
    getLatestAnnonces(idAutomobiliste) {

        return ANNONCE.findAll({
            include:[

                {model:IMAGE,attributes:['CheminImage'], where:{Type:3},as:'images',required:false},
                {model:OFFRE,
                    attributes:['idAutomobiliste'] ,as:'offres',required:false}
            ],
            order: [
                ['idAnnonce', 'DESC'],
            ],
            limit: 5,
            where: {idAutomobiliste: {[Sequelize.Op.ne]: idAutomobiliste}}

        }).then(data => {
            return new Promise((resolve, reject)=>{
                var tab= [];
                var promises_offres= [];
                var promises_automob= [];
                var promises_versions= [];
                data.forEach((ab) => {
                    let a = ab.toJSON();
                    promises_offres.push(offreService.getNbOffre(a.idAnnonce));
                    promises_automob.push(automobService.getAutomobilste(a.idAutomobiliste));
                    promises_versions.push(versionService.getVersionInfo(a.CodeVersion));
                });

                Promise.all(promises_offres).then(nbOffres=> {
                    Promise.all(promises_automob).then(automobs => {
                        Promise.all(promises_versions).then(versions => {
                            let i = 0;
                            data.forEach(ab => {
                                let a = ab.toJSON();
                                tab.push({
                                    idAnnonce: a.idAnnonce,
                                    Prix: a.Prix,
                                    automobiliste: automobs[i],
                                    version: {
                                        CodeVersion: versions[i].CodeVersion,
                                        NomVersion: versions[i].NomVersion,
                                        NomModele: versions[i].modele.NomModele,
                                        NomMarque: versions[i].modele.marque.NomMarque
                                    },
                                    Couleur: a.Couleur,
                                    Km: a.Km,
                                    Carburant: a.Carburant,
                                    Annnee : a.Annee,
                                    Description: a.Description,
                                    NombreOffres: nbOffres[i],
                                    images: a.images
                                });
                                i++;
                            });
                            resolve(tab);
                        }).catch(e => {
                            reject(e);
                        });
                    }).catch(e => {
                        reject(e);
                    });
                }).catch(e => {
                    reject(e);
                });

            });

        }).catch(erreur=>{
            return new Promise((resolve,reject)=>{
                console.log(erreur);
                reject(erreur);
            });
        });
    }

    getAllAnnoncesForClient(idAutomobiliste, options) {

        let conditions = {idAutomobiliste: {[Sequelize.Op.ne]: idAutomobiliste}};
        if (options.Carburant) {
            conditions.Carburant = options.Carburant;
        }
        if (options.CodeVersion) {
            conditions.CodeVersion = parseInt(options.CodeVersion);
        }
        if (options.minAnnee) {
            if (options.maxAnnee) {
                conditions.Annee = {[Sequelize.Op.gte]: parseInt(options.minAnnee),
                    [Sequelize.Op.lte]: parseInt(options.maxAnnee)};
            } else {
                conditions.Annee = {[Sequelize.Op.gte]: parseInt(options.minAnnee)};
            }

        } else {
            if (options.maxAnnee) {
                conditions.Annee = {[Sequelize.Op.lte]: parseInt(options.maxAnnee)};
            }
        }

        if (options.minPrix) {
            if (options.maxPrix) {
                conditions.Prix = {[Sequelize.Op.gte]: parseInt(options.minPrix),[Sequelize.Op.lte]: parseInt(options.maxPrix)};
            } else {
                conditions.Prix = {[Sequelize.Op.gte]: parseInt(options.minPrix)}
            }
        } else {
            if (options.maxPrix) {
                conditions.Prix = {[Sequelize.Op.lte]: parseInt(options.maxPrix)};
            }
        }
        if (options.maxKm) {
            conditions.Km = {[Sequelize.Op.lte]: parseInt(options.maxKm)};
        }


        return ANNONCE.findAll({

            include:[

                {model:IMAGE,attributes:['CheminImage'],where:{Type:3}, as:'images',required:false},
                {model:OFFRE,
                    attributes:['idAutomobiliste'] ,as:'offres',required:false}
            ],

            where: conditions

        }).then(data => {
            return new Promise((resolve, reject)=>{
                var tab= [];
                var promises_offres= [];
                var promises_automob= [];
                var promises_versions= [];
                data.forEach((ab) => {
                    let a = ab.toJSON();
                    promises_offres.push(offreService.getNbOffre(a.idAnnonce));
                    promises_automob.push(automobService.getAutomobilste(a.idAutomobiliste));
                    promises_versions.push(versionService.getVersionInfo(a.CodeVersion));
                });

                Promise.all(promises_offres).then(nbOffres=> {
                    Promise.all(promises_automob).then(automobs => {
                        Promise.all(promises_versions).then(versions => {
                            let i = 0;
                            data.forEach(ab => {
                                let a = ab.toJSON();
                                tab.push({
                                    idAnnonce: a.idAnnonce,
                                    Prix: a.Prix,
                                    automobiliste: automobs[i],
                                    version: {
                                        CodeVersion: versions[i].CodeVersion,
                                        NomVersion: versions[i].NomVersion,
                                        NomModele: versions[i].modele.NomModele,
                                        NomMarque: versions[i].modele.marque.NomMarque
                                    },
                                    Couleur: a.Couleur,
                                    Km: a.Km,
                                    Carburant: a.Carburant,
                                    Annee : a.Annee,
                                    Description: a.Description,
                                    NombreOffres: nbOffres[i],
                                    images: a.images
                                });
                                i++;
                            });
                            resolve(tab);
                        }).catch(e => {
                            reject(e);
                        });
                    }).catch(e => {
                        reject(e);
                    });
                }).catch(e => {
                    reject(e);
                });

            });

        }).catch(erreur=>{
            return new Promise((resolve,reject)=>{
                console.log(erreur);
                reject(erreur);
            });
        });
    }
    createAnnonce(annonce) {
        return ANNONCE.create({
            Prix: annonce.Prix,
            idAutomobiliste: annonce.idAutomobiliste,
            CodeVersion: annonce.CodeVersion,
            Couleur : annonce.Couleur,
            Km : annonce.Km,
            Annee: annonce.Annee,
            Carburant : annonce.Carburant,
            Description: annonce.Description
        });
    }


    getAnnonce(idAnnonce) {
        return ANNONCE.findOne({
            include:[
                {model:IMAGE, attributes:['CheminImage'],where:{Type:3},as:'images',required:false}
            ],
            where : {idAnnonce: idAnnonce}
        });
    }

    updateAnnonce(annonce,idAnnonce) {
        return ANNONCE.update({
            Prix: annonce.Prix,
            Description: annonce.Description
        },{where:{idAnnonce: idAnnonce}});
    }

    deleteAnnonce(idAnnonce) {
        return ANNONCE.destroy({where:{idAnnonce:idAnnonce}});
    }
};

module.exports=AnnonceService;
