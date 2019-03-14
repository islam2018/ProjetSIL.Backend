const ANNONCE=require('../model/Annonce');

let AnnonceService=class AnnonceService {

    getAllAnnonces() {
        return ANNONCE.findAll({});
    }

    createAnnonce(annonce) {
        return ANNONCE.create({
            Prix: annonce.Prix,
            idAutomobiliste: annonce.idAutomobiliste,
            CodeVersion: annonce.CodeVersion
        });
    }

    getAnnonce(idAnnonce) {
        return ANNONCE.findOne({
            where : {idAnnonce: idAnnonce}
        });
    }

    updateAnnonce(annonce,idAnnonce) {
        return ANNONCE.update({
            Prix: annonce.Prix
        },{where:{idAnnonce: idAnnonce}});
    }

    deleteAnnonce(idAnnonce) {
        return ANNONCE.destroy({where:{idAnnonce:idAnnonce}});
    }
};

module.exports=AnnonceService;
