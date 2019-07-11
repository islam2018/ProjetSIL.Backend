const Sequelize = require('sequelize');
const COMMANDE=require('../model/commande');
const VEHICULE=require('../model/vehicule');
COMMANDE.belongsTo(VEHICULE,{foreignKey:'NumChassis',targetKey:'NumChassis'});

let CommandeService=class CommandeService {

    getAllCommandes() {
        return COMMANDE.findAll({
            order: [
                ['Date', 'ASC'],
            ],
        });
    }

    getCommandes(Etat) {
        return COMMANDE.findAll({
            order: [
                ['Date', 'ASC'],
            ],
            where: {Etat:Etat}
        });
    }

    getReservedCommandes() {
        return COMMANDE.findAll({
            order: [
                ['Date', 'ASC'],
            ],
            where : {Reservation: {[Sequelize.Op.ne]: null}}
        });
    }


    createCommande(commande) {
        return COMMANDE.create({

            Montant: commande.Montant,
            idAutomobiliste: commande.idAutomobiliste,
            NumChassis: commande.NumChassis
        });
    }

    confirmCommande(idCommande) {
        return COMMANDE.update({
            Etat:3
        }, {where:{idCommande: idCommande}})
    }
    rejectCommande(idCommande) {
        return COMMANDE.update({
            Etat:2
        }, {where:{idCommande: idCommande}})
    }

    cancelCommande(idCommande) {
        return COMMANDE.update({
            Etat:1
        }, {where:{idCommande: idCommande}})
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
