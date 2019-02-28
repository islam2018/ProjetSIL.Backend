const COULEUR=require('../model/couleur');
const REL_VER_COUL=require('../model/rel_ver_coul');
COULEUR.belongsTo(REL_VER_COUL,{foreignKey: 'CodeCouleur', targetKey: 'CodeCouleur'});

let CouleurService=class CouleurService {

    getAllCouleurs(codeVersion) {
        return COULEUR.findAll({
            include:[{
                model: REL_VER_COUL,
                where: {codeVersion:codeVersion}
            }]
        });
    }

    createCouleur(couleur,codeVersion) {
        return COULEUR.create({
            CodeCouleur: couleur.CodeCouleur,
            CodeVersion: codeVersion,
            NomCouleur:version.NomCouleur
        });
    }

    getCouleur(codeCouleur) {
        return COULEUR.findOne({
            where : {CodeCouleur: codeCouleur}
        });
    }

    updateCouleur(couleur,codeCouleur) {
        return COULEUR.update({
            NomVersion:couleur.NomCouleur
        },{where:{CodeCouleur: codeCouleur}});
    }

    deleteCouleur(codeCouleur) {
        return COULEUR.destroy({where:{CodeCouleur:codeCouleur}});
    }
};


module.exports=CouleurService;