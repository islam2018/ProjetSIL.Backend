const AUTOMOBILISTE=require('../model/automobilste');

let AutomobilisteService=class AutomobilisteService {

    getAllAutomobilistes() {
        return AUTOMOBILISTE.findAll({});
    }

    createAutomobilste(automobilste) {
        return AUTOMOBILISTE.create({
            idAutomobiliste: automobilste.idAutomobiliste,
            Nom: automobilste.Nom,
            Prenom: automobilste.Prenom,
            NumTel: automobilste.NumTel
        });
    }

    getAutomobilste(idAutomobiliste) {
        return AUTOMOBILISTE.findOne({
            where : {idAutomobiliste: idAutomobiliste}
        });
    }

    updateAutomobilste(automobilste,idAutomobilste) {
        return AUTOMOBILISTE.update({
            NumTel: automobilste.NumTel
        },{ where : {idAutomobiliste: idAutomobiliste}});
    }

    deleteAutomobilste(idAutomobilste) {
        return AUTOMOBILISTE.destroy({where : {idAutomobiliste: idAutomobiliste}});
    }

    getAutomobOfAnnonce(idAnnonce) {
        return AUTOMOBILISTE.findOne({
            where: {idA}
        })
    }
};

module.exports=AutomobilisteService ;
