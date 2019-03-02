const VERSION=require('../model/version');
const REL_VER_OPT = require('../model/rel_ver_opt');
const REL_VER_COUL = require('../model/rel_ver_coul');

let VersionService=class VersionService {

    getAllVersion(codeModele) {
        return VERSION.findAll({
            where: {CodeModele: codeModele}
        });
    }

    createVersion(version,codeModele) {
        return VERSION.create({
            CodeVersion: version.CodeVersion,
            CodeModele: codeModele,
            NomVersion:version.NomVersion
        });
    }

    getVersion(codeVersion) {
        return VERSION.findOne({
            where : {CodeVersion: codeVersion}
        });
    }

    getVersionParNom(nomVersion) {
        return VERSION.findOne({
            where : {NomVersion: nomVersion}
        });
    }

    updateVersion(version,codeVersion) {
        return VERSION.update({
            NomVersion:version.NomVersion
        },{where:{CodeVersion: codeVersion}});
    }

    deleteVersion(codeVersion) {
        return VERSION.destroy({where:{CodeVersion:codeVersion}});
    }

    findOption(codeOption,codeVersion) {
        return REL_VER_OPT.findOne({
            where:{
                CodeOption:codeOption,
                CodeVersion:codeVersion
            }});
    }

    addOption(codeOption,codeVersion) {
        return REL_VER_OPT.create({
            CodeOption: codeOption,
            CodeVersion: codeVersion
        });
    }

    findCouleur(codeCouleur,codeVersion) {
        return REL_VER_COUL.findOne({
            where:{
                CodeCouleur:codeCouleur,
                CodeVersion:codeVersion
            }});
    }

    addCouleur(codeCouleur,codeVersion) {
        return REL_VER_COUL.create({
            CodeCouleur: codeCouleur,
            CodeVersion: codeVersion
        });
    }

};


module.exports=VersionService;