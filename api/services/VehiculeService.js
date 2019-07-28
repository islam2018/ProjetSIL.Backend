const VEHICULE=require('../model/vehicule');
const VERSION=require('../model/version');
const values=require('sequelize-values')();
const groupBy=require('group-by');
const OPTION=require('../model/option');
const sequelize=require('../config/dbconnection');
const Sequelize = require('sequelize');
const LigneTarifService = require('./LigneTarifService');
const ligneTarifService = new LigneTarifService();
const REL_VEHIC_OPT = require('../model/REL_vehicule_option');
//VEHICULE.belongsTo(VERSION,{foreignKey:'CodeVersion',targetKey:'CodeVersion'});
VEHICULE.belongsToMany(OPTION,{as:'options',foreignKey:'NumChassis',through:REL_VEHIC_OPT,otherKey:'CodeOption'});

let VehiculeService=class VehiculeService {

    getAllVehicules() {
        return VEHICULE.findAll({});
    }

    getVehicules(code) {
        return new Promise((resolve,reject)=>{
            VEHICULE.findAll({
                include:[
                    {model:OPTION,through: {model: REL_VEHIC_OPT, attributes:['']},as:'options'}
                ],
                where:{CodeVersion:code,Disponible:1}
            }).then(data=>{

                let vehicules = [];
                let Optgroups = [];
                data.forEach(v=>{
                   vehicules.push(v.toJSON());
                });
                let i=0;
               while (i<vehicules.length) {
                    let group=[];
                    let j=0;
                    let f=false;
                   let optionsA = JSON.parse(JSON.stringify(vehicules[i])).options;
                   while (j<vehicules.length) {
                       let optionsB = JSON.parse(JSON.stringify(vehicules[j])).options;
                       if (this.checkOptions(optionsA,optionsB)===true) {
                           group.push(JSON.parse(JSON.stringify(vehicules[j])));
                           vehicules.splice(j, 1);
                           f=true;
                       } else j++;
                   }
                   if (f!==true) i++;
                   Optgroups.push(group);
                }

                let groups = [];
                let promises=[];

                Optgroups.forEach(optgroup=>{
                    let clrgroups = Object.values(groupBy(optgroup,'CodeCouleur'));
                    clrgroups.forEach(clrgroup=>{
                        promises.push(this.calculMontant(clrgroup[0]));

                    });
                });
                let k=0;
                Promise.all(promises).then(prices=>{

                   Optgroups.forEach(optgroup=> {
                       let options = optgroup[0].options;
                       let clrgroups = Object.values(groupBy(optgroup, 'CodeCouleur'));
                       clrgroups.forEach(clrgroup => {
                           let vehicules = [];
                           clrgroup.forEach(v => {
                               vehicules.push({
                                   NumChassis: v.NumChassis,
                                   Concessionaire: v.Concessionaire
                               });
                           });
                           groups.push({
                               vehicules : vehicules,
                               Montant: prices[k],
                               quantite : vehicules.length,
                               CodeVersion: clrgroup[0].CodeVersion,
                               CodeCouleur: clrgroup[0].CodeCouleur,
                               options: options,
                           });
                           k++;
                       });
                   });
                    resolve(groups);
                }).catch(e=>{
                    reject(e);
                });


            }).catch(error=>{
                reject(error);
            });
        });
    }

    getVehiculesDisponible(body) {
        return new Promise((resolve,reject)=>{
            console.log(body.codeCouleur+" "+body.codeVersion);
            VEHICULE.findAll({
               include:[
                    {model:OPTION,through: {model: REL_VEHIC_OPT, attributes:['']},as:'options'},
                    //{model:VERSION,as:'version',required:false}
                ],
                where:{CodeVersion:body.codeVersion,CodeCouleur:body.codeCouleur,Disponible:1}
            }).then(data=>{

                let res = [];
                let promises = [];
                data.forEach(v => {
                    let vehicule = v.toJSON();
                    let all = true;
                    if (body.options !== undefined) {
                        console.log(vehicule.options)
                        console.log(body.options)
                        all = this.checkOptions(vehicule.options, body.options);
                    }
                    if (all===true) {
                        promises.push(this.calculMontant(vehicule));
                        res.push({
                            NumChassis: vehicule.NumChassis,
                            Options: vehicule.options
                        });
                    }
                });
                Promise.all(promises).then(montants=>{
                    let i=0;
                    res.forEach(v=>{
                        v.Montant=montants[i];
                        i++;
                    });
                    resolve(res);
                }).catch(e=>{
                    reject(e);
                });

            }).catch(e=>{
                reject(e);
            });
        });
    }

    createVehicule(vehicule) {
        return VEHICULE.create({
            NumChassis: vehicule.NumChassis,
            Concessionaire: vehicule.Concessionaire,
            CodeVersion: vehicule.CodeVersion,
            CodeCouleur: vehicule.CodeCouleur
        });
    }

    getVehicule(numChassis) {
        return VEHICULE.findOne({
            where : {NumChassis: numChassis}
        });
    }

    updateVehicule(vehicule,numChassis) {
        return VEHICULE.update({
            Concessionaire:vehicule.Concessionaire
        },{where:{NumChassis: numChassis}});
    }


    deleteVehicule(numChassis) {
        return VEHICULE.destroy({where:{NumChassis:numChassis}});
    }


    /*getAllOptionsOfVehicules(numChassis) {
        return  OPTION.findAll({
            include: [{
                model: REL_VEHIC_OPT,attributes:['NumChassis'],
                where: {NumChassis : numChassis}
            },{model: LIGNETARIF, where:{Type:2}, as:'lignetarif', required:false}]
        });
    }*/


    checkOptions(optionsVehicules, options) {
        let available = true;
        options.forEach(option=>{
           let found = optionsVehicules.find(o=>{
              return parseInt(option.CodeOption.toString()) === parseInt(o.CodeOption.toString());
           });
           if (found===undefined) available = false;
        });
        optionsVehicules.forEach(optionV=>{
            let found = options.find(o=>{
                return parseInt(optionV.CodeOption.toString()) === parseInt(o.CodeOption.toString());
            });
            if (found===undefined) available = false;
        });
        return available;
    }

    findOption(codeOption,numChassis) {
        return REL_VEHIC_OPT.findOne({
            where:{
                CodeOption:codeOption,
                NumChassis:numChassis
            }});
    }

    addOption(codeOption,numChassis) {
        return REL_VEHIC_OPT.create({
            CodeOption: codeOption,
            NumChassis: numChassis
        });
    }

    calculMontant(vehicule) {
        let montant=0;
        return new Promise((resolve,reject)=>{
            ligneTarifService.getLigneTarif(vehicule.CodeVersion,0).then(ltVersion=>{
                montant+=ltVersion.Prix;
                ligneTarifService.getLigneTarif(vehicule.CodeCouleur,1).then(ltCouleur=>{
                    montant+=ltCouleur.Prix;
                    let promises =[];
                    vehicule.options.forEach(option=>{
                       promises.push(ligneTarifService.getLigneTarif(option.CodeOption,2));
                    });
                    Promise.all(promises).then(ltOptions=>{
                        ltOptions.forEach(ltOption=>{
                            montant+=ltOption.Prix;
                        });
                        resolve(montant);
                    }).catch(e=>{
                        reject(e);
                    });
                }).catch(e=>{
                    reject(e);
                });
            }).catch(e=>{
                reject(e);
            });
        });


    }

    updateStock(stock) {

    }
};


module.exports=VehiculeService;
