const Sequelize = require('sequelize');
const sequelize = require('../config/dbconnection');

const Commande = sequelize.define('commande', {
    idCommande: {type:Sequelize.INTEGER,primaryKey: true, autoIncrement: true},
    Dae: {type:Sequelize.DATE},
    Montant: {type:Sequelize.INTEGER},
    idAutomobiliste: {type:Sequelize.INTEGER},
    NumChassis : {type:Sequelize.INTEGER}
});
module.exports = Commande;
