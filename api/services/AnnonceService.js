const ANNONCE=require('../model/Annonce');

let AnnonceService=class AnnonceService {

    getAllAnnonces() {
        return ANNONCE.findAll({});
    }

    createAnnonce(annonce) {
        return ANNONCE.create({
            CheminPhoto: annonce.CheminPhoto,
            Prix: annonce.Prix,
            idAutomobilste: annonce.idAutomobilste,
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
            CheminPhoto: annonce.CheminPhoto,
            Prix: annonce.Prix
        },{where:{idAnnonce: idAnnonce}});
    }

    deleteAnnonce(idAnnonce) {
        return ANNONCE.destroy({where:{idAnnonce:idAnnonce}});
    }
};

module.exports=AnnonceService;
