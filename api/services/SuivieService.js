const sequelize=require('sequelize');
const s=require('sequelize-values')();
const request=require('request');
const configurl='https://sayaradz.herokuapp.com';
const FAVORIS_MODELE=require('../model/favoris_modele');
const FAVORIS_VERSION=require('../model/favoris_version');
const VersionService = require('./VersionService');
const versionService = new VersionService();


let SuivieService=class SuivieService {

    ajouterSuivieModele(idAutomobiliste, codeModele) {

        return versionService.getAllVersion(codeModele).then(value => {
           let versions = s.getValues(value);
           console.log(versions);
           versions.forEach(function(version) {
              request.post(configurl+'/suivies/versions/'+version.CodeVersion,{form:{idAutomobiliste:idAutomobiliste}},null);
           });
            return FAVORIS_MODELE.create({
                CodeModele:codeModele,
                idAutomobiliste: idAutomobiliste
            });
        });


    }

    ajouterSuivieVersion(idAutomobiliste, codeVersion) {
        return FAVORIS_VERSION.create({
            CodeVersion:codeVersion,
            idAutomobiliste: idAutomobiliste
        });
    }

    supprimerSuivieModele(idAutomobiliste, codeModele) {
        return new Promise((resolve, reject) => {

            versionService.getAllVersion(codeModele).then(versions => {
                let promises = [];

                versions.forEach(v => {
                    let version = v.toJSON();
                    console.log(version);
                    promises.push(this.supprimerSuivieVersion(idAutomobiliste, version.CodeVersion));
                    //request.delete(configurl+'/suivies/versions/'+version.CodeVersion,{form:{idAutomobiliste:idAutomobiliste}},null);
                });
                Promise.all(promises).then(data => {
                        FAVORIS_MODELE.destroy({
                            where: {
                                CodeModele: codeModele,
                                idAutomobiliste: idAutomobiliste
                            }
                        }).then(value => {
                            resolve(value);
                        }).catch(error => {
                            reject(error);
                        })
                }).catch(e => {
                    reject(e);
                });
            }).catch(e1 => {
                reject(e1);
            });
        });
    }

    supprimerSuivieVersion(idAutomobiliste, codeVersion) {
        return FAVORIS_VERSION.destroy({
            where: {
                CodeVersion: codeVersion,
                idAutomobiliste: idAutomobiliste
            }
        });
    }

    getSuivieModele(idAutomobiliste, codeModele) {
        return FAVORIS_MODELE.findOne({
            where:{idAutomobiliste:idAutomobiliste, CodeModele: codeModele}
        });
    }
    getSuivieVersion(idAutomobiliste, codeVersion) {
        return FAVORIS_VERSION.findOne({
            where:{idAutomobiliste:idAutomobiliste, CodeVersion: codeVersion}
        });
    }
};

module.exports=SuivieService;
