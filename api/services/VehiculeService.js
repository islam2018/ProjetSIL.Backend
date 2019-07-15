const VEHICULE=require('../model/vehicule');
const VERSION=require('../model/version');
const OPTION=require('../model/option');
const REL_VEHIC_OPT = require('../model/REL_vehicule_option');
VEHICULE.belongsTo(VERSION,{foreignKey:'CodeVersion',targetKey:'CodeVersion'});
VEHICULE.belongsToMany(OPTION,{as:'options',foreignKey:'NumChassis',through:REL_VEHIC_OPT,otherKey:'CodeOption'});

let VehiculeService=class VehiculeService {

    getAllVehicules() {
        return VEHICULE.findAll({});
    }

    getVehiculesDisponible(body) {
        return new Promise((resolve,reject)=>{
            VEHICULE.findAll({
                include:[
                    {model:OPTION,through: {model: REL_VEHIC_OPT, attributes:['']},as:'options'},
                    {model:VERSION,as:'version'}
                ]
            },{where:{CodeVersion:body.codeVersion,CodeCouleur:body.codeCouleur}}).then(data=>{

                let res = [];
                if (data.length > 0 ) {
                    data.forEach(v=>{
                       let vehicule = v.toJSON();
                       //check Options here
                        let all=true;
                        if (body.options!==undefined) {
                            all = this.checkOptions(vehicule.options,body.options);
                        }
                        if (all) {
                            res.push({
                                NumChassis: vehicule.NumChassis,
                                Montant: "GET IT FROM LIGNETARIF",
                                Options: vehicule.options
                            });
                        }
                    });
                    /*res.disponible = true;
                    res.NumChassis = data[0].toJSON().NumChassis;
                    res.Montant = body.Montant;
                    res.options = data[0].options;*/
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
              return option.CodeOption === o.CodeOption;
           });
           if (found===undefined) available = false;
        });
        optionsVehicules.forEach(optionV=>{
            let found = options.find(o=>{
                return optionV.CodeOption === o.CodeOption;
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

    updateStock(stock) {
        
    }
};


module.exports=VehiculeService;
