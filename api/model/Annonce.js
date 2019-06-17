const Sequelize = require('sequelize');
const sequelize = require('../config/dbconnection');

const Annonce = sequelize.define('annonce', {
    idAnnonce: {type:Sequelize.INTEGER,primaryKey: true, autoIncrement: true},
    Prix: {type:Sequelize.STRING},
    idAutomobiliste: {type:Sequelize.INTEGER},
    CodeVersion : {type:Sequelize.INTEGER},
    Couleur : {type:Sequelize.STRING},
    Km : {type:Sequelize.STRING},
    Carburant : {type:Sequelize.STRING},
    Annee : {type: Sequelize.INTEGER},
    Description: {type: Sequelize.STRING}

});
module.exports = Annonce;
