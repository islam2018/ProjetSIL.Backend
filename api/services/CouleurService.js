const COULEUR=require('../model/couleur');
const IMAGE=require('../model/image');
const sequelize = require('sequelize');
const REL_VER_COUL=require('../model/rel_ver_coul');
const REL_MOD_COUL=require('../model/rel_mod_coul');
const LIGNETARIF = require('../model/lignetarif');

COULEUR.hasMany(IMAGE,{as:'image',foreignKey:'CodeSup',targetKey:'CodeCouleur'});
COULEUR.belongsTo(REL_VER_COUL,{foreignKey: 'CodeCouleur', targetKey: 'CodeCouleur'});
COULEUR.belongsTo(REL_MOD_COUL,{foreignKey: 'CodeCouleur', targetKey: 'CodeCouleur'});
COULEUR.hasOne(LIGNETARIF,{as:'lignetarif',foreignKey:'Code',targetKey:'CodeCouleur'});



let CouleurService=class CouleurService {

    getAllCouleursOfVersion(codeVersion) {
        return  COULEUR.findAll({
            include: [
                {model: REL_VER_COUL,attributes:['CodeVersion'], where: {CodeVersion : codeVersion}},
                {model: IMAGE, attributes: ['CheminImage'],
                    where: {Type: 2, Code:  codeVersion},
                    as: 'image', required: false},
                {model: LIGNETARIF, where:{Type:1}, as:'lignetarif', required:false}]
        });
    }

    getAllCouleursOfModele(codeModele) {
        return  COULEUR.findAll({
            include: [{
                model: REL_MOD_COUL,attributes:['CodeModele'],
                where: {CodeModele : codeModele}
            }, {model: LIGNETARIF, where:{Type:1}, as:'lignetarif', required:false}]
        });
    }

    createCouleur(couleur) {
        return COULEUR.create({
            CodeCouleur: couleur.CodeCouleur,
            NomCouleur: couleur.NomCouleur,
            CodeHexa: couleur.CodeHexa
        });
    }

    getCouleur(codeCouleur) {
        return COULEUR.findOne({
            include: [{model: LIGNETARIF, where:{Type:1}, as:'lignetarif', required:false}],
            where : {CodeCouleur: codeCouleur}
        });
    }

    updateCouleur(couleur,codeCouleur) {
        return COULEUR.update({
            NomCouleur:couleur.NomCouleur,
            CodeHexa:couleur.CodeHexa
        },{where:{CodeCouleur: codeCouleur}});
    }

    deleteCouleur(codeCouleur) {
        return COULEUR.destroy({where:{CodeCouleur:codeCouleur}});
    }

    findCouleurofVersion(codeCouleur,codeVersion) {
        return REL_VER_COUL.findOne({
            where:{
                CodeCouleur:codeCouleur,
                CodeVersion:codeVersion
            }});
    }

    findCouleurofModele(codeCouleur,codeModele) {
        return REL_MOD_COUL.findOne({
            where:{
                CodeCouleur:codeCouleur,
                CodeModele:codeModele
            }});
    }

    addCouleurforVersion(codeCouleur,codeVersion) {
        return REL_VER_COUL.create({
            CodeCouleur: codeCouleur,
            CodeVersion: codeVersion
        });
    }
    addCouleurforModele(codeCouleur,codeModele) {
        return REL_MOD_COUL.create({
            CodeCouleur: codeCouleur,
            CodeModele: codeModele
        });
    }

    removeCouleurofModele(codeCouleur,codeModele) {
        return REL_MOD_COUL.destroy({where:{CodeCouleur:codeCouleur,CodeModele:codeModele}});
    }

    removeCouleurofVersion(codeCouleur,codeVersion) {
        return REL_VER_COUL.destroy({where:{CodeCouleur:codeCouleur,CodeVersion:codeVersion}});
    }
};


module.exports=CouleurService;
