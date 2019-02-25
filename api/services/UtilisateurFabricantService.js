const UTILFAB=require('../model/utilfab');

let UtilisateurFabricantService=class UtilisateurFabricantService {

    getAllUtilFab() {
        return UTILFAB.findAll();
    }

    getAllUtilFabForMarque(codeMarque) {
        return UTILFAB.findAll({
            where: {Fabricant: codeMarque}
        });
    }

    createUtilFab(utilfab,codeMarque) {
        return UTILFAB.create({
            Mail: utilfab.Mail,
            Nom:utilfab.Nom,
            Prenom: utilfab.Prenom,
            Mdp: utilfab.Mdp,
            NumTel: utilfab.NumTel,
            Fabricant: codeMarque
        });
    }

    getUtilFab(IdUtilFab) {
        return UTILFAB.findOne({
            where : {idUserF: idUtilFab}
        });
    }

    getUtilFabParMail(mail) {
        return UTILFAB.findOne({
            where : {Mail: mail}
        });
    }

    updateUtilFab(utilfab,idUtilFab) {
        return UTILFAB.update({
            Mail: utilfab.Mail,
            Nom:utilfab.Nom,
            Prenom: utilfab.Prenom,
            NumTel: utilfab.NumTel
        },{where:{idUtilF: idUtilFab}});
    }

    updateMdpForUtilFab(utilfab,idUtilFab) {
        return OFFRE.update({
            Mdp: utilfab.Mdp
        },{where:{idUserF: idUtilFab}});
    }

    deleteUtilFab(idUtilFab) {
        return UTILFAB.destroy({where:{idUserF:idUtilFab}});
    }
};

module.exports=UtilisateurFabricantService;