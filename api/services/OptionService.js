const OPTION=require('../model/option');
const REL_VER_OPT=require('../model/rel_ver_opt');
const REL_VEHIC_OPT=require('../model/REL_vehicule_option');
OPTION.belongsTo(REL_VER_OPT,{foreignKey: 'CodeOption', targetKey: 'CodeOption'});
OPTION.belongsTo(REL_VEHIC_OPT,{foreignKey: 'CodeOption', targetKey: 'CodeOption'});

let OptionService=class OptionService {

    getAllOptionsOfVersion(codeVersion) {
        return  OPTION.findAll({
            include: [{
                model: REL_VER_OPT,
                where: {CodeVersion : codeVersion}
            }]
        });
    }

    getAllOptionsOfVehicules(numChassis) {
        return  OPTION.findAll({
            include: [{
                model: REL_VEHIC_OPT,
                where: {NumChassis : numChassis}
            }]
        });
    }

    createOption(option,codeVersion) {
        return OPTION.create({
            CodeModele: codeVersion,
            NomOption:version.NomOption
        });
    }

    getOption(codeOption) {
        return OPTION.findOne({
            where : {CodeOption: codeOption}
        });
    }

    updateOption(option,codeOption) {
        return OPTION.update({
            NomOption:option.NomOption
        },{where:{CodeOption: codeOption}});
    }

    deleteOption(codeOption) {
        return OPTION.destroy({where:{CodeOption:codeOption}});
    }
};


module.exports=OptionService;