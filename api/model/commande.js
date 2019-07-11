const Sequelize = require('sequelize');
const sequelize = require('../config/dbconnection');

const Commande = sequelize.define('commande', {
    idCommande: {type:Sequelize.INTEGER,primaryKey: true, autoIncrement: true},
    Date: {type:Sequelize.DATE},
    Montant: {type:Sequelize.INTEGER},
    idAutomobiliste: {type:Sequelize.INTEGER},
    NumChassis : {type:Sequelize.INTEGER},
    Etat: {type:Sequelize.INTEGER},
    Reservation: {type:Sequelize.INTEGER}
});
module.exports = Commande;
