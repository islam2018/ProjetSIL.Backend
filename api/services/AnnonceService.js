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
                {model:IMAGE, attributes:['CheminImage'],as:'images'}
            ]
        });
    }
    getAllAnnoncesOfAutomobiliste(idAutomobiliste) {
        return ANNONCE.findAll({

            include:[
                {model:IMAGE,attributes:['CheminImage'], as:'images'},
                {model:OFFRE,
                    attributes:['idAutomobiliste'] ,as:'offres'}
            ],

            where: {idAutomobiliste: idAutomobiliste}

        }).then(data => {
            return new Promise((resolve, reject)=>{
               var tab= [];
               var promises= [];
                data.forEach((ab) => {
                    let a = ab.toJSON();
                    promises.push(offreService.getNbOffre(a.idAnnonce));
                });

                Promise.all(promises).then(values=>{
                        let i=0;
                        data.forEach(ab=>{
                            let a= ab.toJSON();
                            tab.push({
                                idAnnonce:a.idAnnonce,
                                Prix:a.Prix,
                                idAutomobiliste: a.idAutomobiliste,
                                CodeVersion: a.CodeVersion,
                                Couleur: a.Couleur,
                                Km: a.Km,
                                Carburant: a.Carburant,
                                Description: a.Description,
                                NombreOffres: values[i],
                                images:a.images
                            });
                            i++;
                        });
                        resolve(tab);
                }).catch(e=>{
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

    getAllAnnoncesForClient(idAutomobiliste) {
        return ANNONCE.findAll({

            include:[

                {model:IMAGE,attributes:['CheminImage'], as:'images'},
                {model:OFFRE,
                    attributes:['idAutomobiliste'] ,as:'offres'}
            ],

            where: {idAutomobiliste: {[Sequelize.Op.ne]:idAutomobiliste}}

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
            Carburant : annonce.Carburant,
            Description: annonce.Description
        });
    }


    getAnnonce(idAnnonce) {
        return ANNONCE.findOne({
            include:[
                {model:IMAGE, attributes:['CheminImage'],as:'images'}
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
