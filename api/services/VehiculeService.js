const VEHICULE=require('../model/vehicule');
const VERSION=require('../model/version');
const REL_VEHIC_OPT = require('../model/REL_vehicule_option');
VEHICULE.belongsTo(VERSION,{foreignKey:'CodeVersion',targetKey:'CodeVersion'});

let VehiculeService=class VehiculeService {

    getAllVehicules() {
        return VEHICULE.findAll({});
    }

    getVehiculesDisponible(body) {
        return new Promise((resolve,reject)=>{
            VEHICULE.findAll({
                include:[
                    {model:VERSION,as:'version'}
                ]
            },{where:{CodeVersion:body.codeVersion,CodeCouleur:body.codeCouleur}}).then(data=>{
                let res = {};
                if (data.length === 0) {
                    res.disponible = false;
                    res.NumChassis = null;
                    res.Montant = null;
                } else {
                    res.disponible = true;
                    res.NumChassis = data[0].toJSON().NumChassis;
                    res.Montant = body.Montant;
                }
                resolve(res);
            }).catch(e=>{
                reject(e);
            });
        });
    }

    createVehicule(vehicule) {
        return VEHICULE.create({
            NumChassis: vehicule.NumChassis,
            Concessionnaire: vehicule.Concessionaire,
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

    updateStock(stock) {
        
    }
};


module.exports=VehiculeService;
