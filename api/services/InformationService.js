let INFO = require('../model/information');
let MODELE = require('../model/modele');
let VERSION = require('../model/version');
let VEHICULE = require('../model/vehicule');
const sequelize=require('../config/dbconnection');
const Sequelize = require('sequelize');


let InformationService=class ImageService {

    getInfos(fabricant) {
        return new Promise((resolve,reject)=> {
            INFO.findOne({
                where: {CodeMarque: fabricant}
            }).then(infos => {
                let promises = [];
                let promisesV = [];
                MODELE.findAll({where:{CodeMarque:fabricant}}).then(modeles=>{
                    modeles.forEach(m=>{
                       promises.push(VERSION.findAll({where:{CodeModele:m.toJSON().CodeModele}}))
                    });
                    Promise.all(promises).then(tables=>{

                        tables.forEach(table=> {
                            table.forEach(v=>{
                                promisesV.push(VEHICULE.count({
                                    distinct: true,
                                    col: 'NumChassis',
                                    where: {CodeVersion: v.toJSON().CodeVersion,Disponible:1}
                                }));
                            });
                        });
                        Promise.all(promisesV).then(counts=>{
                            let total = 0;
                            counts.forEach(count=>{
                                total = total + count;
                            });
                            resolve({
                               DateUploadStock: infos.DateUploadStock,
                               DateUploadTarif: infos.DateUploadTarif,
                                NbVehiculesDisponibles: total
                            });
                        }).catch(e => {
                            reject(e);
                        });
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
    }

    updateStockInfo(fabricant) {
        return INFO.update({
            DateUploadStock: sequelize.fn('NOW')
        },{where:{CodeMarque:fabricant}})
    }

    updateTarifInfo(fabricant) {
        return INFO.update({
            DateUploadTarif: sequelize.fn('NOW')
        },{where:{CodeMarque:fabricant}})
    }
};

module.exports=InformationService;