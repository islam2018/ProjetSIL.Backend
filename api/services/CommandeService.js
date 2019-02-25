const COMMANDE=require('../model/commande');
const VEHICULE=require('../model/vehicule');
COMMANDE.belongsTo(VEHICULE,{foreignKey:'NumChassis',targetKey:'NumChassis'});

let CommandeService=class CommandeService {

    getAllCommandes() {
        return COMMANDE.findAll();
    }

    createCommande(commande) {
        return COMMANDE.create({
            Date: commande.Date,
            Montant: commande.Montant,
            idAutomobilste: commande.idAutomobilste,
            NumChassis: commande.NumChassis
        });
    }

    getCommande(idCommande) {
        return COMMANDE.findOne({
            where : {idCommande: idCommande}
        });
    }

    /*updateCommande(commande,idCommande) {
        return COMMANDE.update({
            CheminPhoto: annonce.CheminPhoto,
            Prix: annonce.Prix
        },{where:{CodeVersion: idAnnonce}});
    }*/

    deleteCommande(idCommande) {
        return COMMANDE.destroy({where:{idCommande:idCommande}});
    }
};

module.exports=CommandeService;