const VEHICULE=require('../model/vehicule');
const REL_VEHIC_OPT = require('../model/REL_vehicule_option');

let VehiculeService=class VehiculeService {

    getAllVehicules() {
        return VEHICULE.findAll({});
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
