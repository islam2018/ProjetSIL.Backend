const VERSION=require('../model/version');
const OPTION=require('../model/option');
const COULEUR=require('../model/couleur');
const REL_VER_OPT = require('../model/rel_ver_opt');
const REL_VER_COUL = require('../model/rel_ver_coul');
const IMAGE=require('../model/image');
const FAVORIS_VERSION=require('../model/favoris_version');
VERSION.hasMany(IMAGE,{as:'images',foreignKey:'Code',foreignKeyKey:'CodeVersion'});
VERSION.belongsToMany(OPTION,{as:'options',foreignKey:'CodeVersion',through:REL_VER_OPT,otherKey:'CodeOption'});
VERSION.belongsToMany(COULEUR,{as:'couleurs',foreignKey:'CodeVersion',through:REL_VER_COUL,otherKey:'CodeCouleur'});
VERSION.hasMany(FAVORIS_VERSION,{as:'suivies',foreignKey:'CodeVersion',foreignKeyKey:'CodeVersion'});

let VersionService=class VersionService {

    getAllVersion(codeModele) {
        return VERSION.findAll({

            include:[
               {model:OPTION,through: {model: REL_VER_OPT, attributes:['']},as:'options'},
                {model:COULEUR,through: {model: REL_VER_COUL, attributes:['']},as:'couleurs'},
                {model:IMAGE, attributes:['CheminImage'],as:'images'}
            ],
            where: {CodeModele: codeModele}
        });
    }
    getAllVersionPourAutomobiliste(codeModele,idAutomobiliste) {
        return VERSION.findAll({

            include:[
                {model:OPTION,through: {model: REL_VER_OPT, attributes:['']},as:'options'},
                {model:COULEUR,through: {model: REL_VER_COUL, attributes:['']},as:'couleurs'},
                {model:IMAGE, attributes:['CheminImage'],as:'images'},
                {model:FAVORIS_VERSION, attributes:['idAutomobiliste'],as:'suivies',
                    where:{idAutomobiliste:idAutomobiliste},required:false}
            ],
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
            include:[
                {model:OPTION,through: {model: REL_VER_OPT, attributes:['']},as:'options'},
                {model:COULEUR,through: {model: REL_VER_COUL, attributes:['']},as:'couleurs'},
                {model:IMAGE, attributes:['CheminImage'],as:'images'}
            ],
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

    addCouleur(couleur,codeVersion) {
        return REL_VER_COUL.create({
            CodeCouleur: couleur.CodeCouleur,
            CodeVersion: codeVersion,
            NomCouleur: couleur.NomCouleur
        });
    }

};


module.exports=VersionService;
