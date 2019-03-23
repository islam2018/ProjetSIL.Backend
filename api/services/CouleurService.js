const COULEUR=require('../model/couleur');
const REL_VER_COUL=require('../model/rel_ver_coul');
const REL_MOD_COUL=require('../model/rel_mod_coul');

COULEUR.belongsTo(REL_VER_COUL,{foreignKey: 'CodeCouleur', targetKey: 'CodeCouleur'});
COULEUR.belongsTo(REL_MOD_COUL,{foreignKey: 'CodeCouleur', targetKey: 'CodeCouleur'});



let CouleurService=class CouleurService {

    getAllCouleursOfVersion(codeVersion) {
        return  COULEUR.findAll({
            include: [{
                model: REL_VER_COUL,attributes:['CodeVersion'],
                where: {CodeVersion : codeVersion}
            }]
        });
    }

    getAllCouleursOfModele(codeModele) {
        return  COULEUR.findAll({
            include: [{
                model: REL_MOD_COUL,attributes:['CodeModele'],
                where: {CodeModele : codeModele}
            }]
        });
    }

    createCouleur(couleur) {
        return COULEUR.create({
            CodeCouleur: couleur.CodeCouleur,
            NomCouleur: couleur.NomCouleur
        });
    }

    getCouleur(codeCouleur) {
        return COULEUR.findOne({
            where : {CodeCouleur: codeCouleur}
        });
    }

    updateCouleur(couleur,codeCouleur) {
        return COULEUR.update({
            NomCouleur:couleur.NomCouleur
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

    removeCouleurofVersion(codeCouleur,codeVersion) {
        return REL_VER_COUL.destroy({where:{CodeCouleur:codeCouleur,CodeVersion:codeVersion}});
    }

    removeCouleurofModele(codeCouleur,codeModele) {
        return REL_MOD_COUL.destroy({where:{CodeCouleur:codeCouleur,CodeModele:codeModele}});
    }
};


module.exports=CouleurService;
