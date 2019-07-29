const Sequelize = require('sequelize');
const sequelize = require('../config/dbconnection');

const Offre = sequelize.define('offre', {
    idOffre: {type:Sequelize.INTEGER,primaryKey: true, autoIncrement: true},
    idAnnonce: {type:Sequelize.INTEGER},
    Montant: {type:Sequelize.STRING},
    idAutomobiliste: {type:Sequelize.INTEGER},
    Date: {type:Sequelize.DATE},
    Etat: {type:Sequelize.INTEGER}
});
module.exports = Offre;
