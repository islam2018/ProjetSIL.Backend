
const LIGNETARIF=require('../model/lignetarif');

let LigneTarifService=class LigneTarifService {

    getAllLigneTarifs(type) {
        return LIGNETARIF.findAll({
            where: {type:type}
        });
    }

    createLigneTarif(ligneTarif,type,code) {
        return LIGNETARIF.create({
            Type: type,
            Code: code,
            DateDebut: ligneTarif.DateDebut,
            DateFin: ligneTarif.DateFin,
            Prix: ligneTarif.Prix
        });
    }

    getLigneTarifById(idLigneTarif) {
        return LIGNETARIF.findOne({
            where : {idLigneTarif: idLigneTarif}
        });
    }

    getLigneTarif(code,type) {
        return LIGNETARIF.findOne({
            where : {Code: code,Type:type/*,
                /*DateDebut: {[Sequelize.Op.lte]: Sequelize.fn('NOW')},
                DateFin: {[Sequelize.Op.lte]: Sequelize.fn('NOW')}*/
            }
        });
    }


    updateLigneTarif(ligneTarif,code,type) {
        return LIGNETARIF.update({
            DateDebut: ligneTarif.DateDebut,
            DateFin: ligneTarif.DateFin,
            Prix: ligneTarif.Prix
        },{where : {Code: code,Type:type}});
    }

    deleteLigneTarif(code,type) {
        return LIGNETARIF.destroy({where : {Code: code,Type:type}});
    }
};

module.exports=LigneTarifService;
