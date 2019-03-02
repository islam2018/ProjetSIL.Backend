const MODELE=require('../model/modele');
const VERSION=require('../model/version');


let ModeleService=class ModeleService {

    getAllModeles(codeMarque) {
        return MODELE.findAll({
            where: {CodeMarque: codeMarque}
        });
    }

    createModele(modele,codeMarque) {
        return MODELE.create({
            CodeModele: modele.CodeModele,
            CodeMarque: codeMarque,
            NomModele:modele.NomModele

        });
    }

    getModele(codeModele) {
        return MODELE.findOne({
            where : {CodeModele: codeModele}
        });
    }

    getModeleParNom(nomModele) {
        return MODELE.findOne({
            where : {NomModele: nomModele}
        });
    }

    updateModele(modele,codeModele) {
        return MODELE.update({
            NomModele:modele.NomModele
        },{where:{CodeModele: codeModele}});
    }

    deleteModele(codeModele) {
        return MODELE.destroy({where:{CodeModele:codeModele}});
    }
};

module.exports=ModeleService;