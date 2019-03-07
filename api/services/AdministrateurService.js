const ADMIN=require('../model/administrateur');

let AdministrateurService=class AdministrateurService {


    getAdmin(idAdmin) {
        return ADMIN.findOne({
            where: {idAdmin: idAdmin}
        });
    }


    getAdminParMail(mail) {
        return ADMIN.findOne({
            where : {Mail: mail}
        });
    }

    updateAdmin(admin,idAdmin) {
        return ADMIN.update({
            Mail: admin.Mail,
            Nom: admin.Nom,
            Prenom: admin.Prenom
        },{where:{idAdmin: idAdmin}});
    }

    updateMdpForAdmin(admin,idAdmin) {
        return ADMIN.update({
            Mdp: admin.Mdp
        },{where:{idAdmin: idAdmin}});
    }

};

module.exports=AdministrateurService;