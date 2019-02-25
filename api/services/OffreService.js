const OFFRE=require('../model/Offre');

let OffreService=class OffreService {

    getAllOffres(idAnnonce) {
        return OFFRE.findAll({
            where: {idAnnonce:idAnnonce}
        });
    }

    createOffre(offre,idAnnonce) {
        return OFFRE.create({
            idAutomobiliste: offre.idAutomobiliste,
            Montant: offre.Montant,
            idAnnonce: idAnnonce
        });
    }

    getOffre(idOffre) {
        return OFFRE.findOne({
            where : {idOffre: idOffre}
        });
    }

    updateOffre(offre,idOffre) {
        return OFFRE.update({
            Montant: offre.Montant
        },{where:{idOffre: idOffre}});
    }

    deleteOffre(idOffre) {
        return OFFRE.destroy({where:{idOffre:idOffre}});
    }
};

module.exports=OffreService;