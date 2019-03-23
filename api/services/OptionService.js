const OPTION=require('../model/option');
const REL_VER_OPT=require('../model/rel_ver_opt');
const REL_VEHIC_OPT=require('../model/REL_vehicule_option');
const REL_MOD_OPT=require('../model/rel_mod_opt');
OPTION.belongsTo(REL_VER_OPT,{foreignKey: 'CodeOption', targetKey: 'CodeOption'});
OPTION.belongsTo(REL_MOD_OPT,{foreignKey: 'CodeOption', targetKey: 'CodeOption'});
OPTION.belongsTo(REL_VEHIC_OPT,{foreignKey: 'CodeOption', targetKey: 'CodeOption'});



let OptionService=class OptionService {

    getAllOptionsOfVersion(codeVersion) {
        return  OPTION.findAll({
            include: [{
                model: REL_VER_OPT,attributes:['CodeVersion'],
                where: {CodeVersion : codeVersion}
            }]
        });
    }

    getAllOptionsOfModele(codeModele) {
        return  OPTION.findAll({
            include: [{
                model: REL_MOD_OPT,attributes:['CodeModele'],
                where: {CodeModele : codeModele}
            }]
        });
    }

    getAllOptionsOfVehicules(numChassis) {
        return  OPTION.findAll({
            include: [{
                model: REL_VEHIC_OPT,attributes:['NumChassis'],
                where: {NumChassis : numChassis}
            }]
        });
    }

    createOption(option) {
        return OPTION.create({
            CodeOption: option.CodeOption,
            NomOption:option.NomOption
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

    findOptionofVersion(codeOption,codeVersion) {
        return REL_VER_OPT.findOne({
            where:{
                CodeOption:codeOption,
                CodeVersion:codeVersion
            }});
    }

    findOptionofModele(codeOption,codeModele) {
        return REL_MOD_OPT.findOne({
            where:{
                CodeOption:codeOption,
                CodeModele:codeModele
            }});
    }

    addOptionforVersion(codeOption,codeVersion) {
        return REL_VER_OPT.create({
            CodeOption: codeOption,
            CodeVersion: codeVersion
        });
    }
    addOptionforModele(codeOption,codeModele) {
        return REL_MOD_OPT.create({
            CodeOption: codeOption,
            CodeModele: codeModele
        });
    }

    removeOptionofVersion(codeOption,codeVersion) {
        return REL_VER_OPT.destroy({where:{CodeOption:codeOption,CodeVersion:codeVersion}});
    }

    removeOptionofModele(codeOption,codeModele) {
        return REL_MOD_OPT.destroy({where:{CodeOption:codeOption,CodeModele:codeModele}});
    }
};


module.exports=OptionService;
