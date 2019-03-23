const Sequelize = require('sequelize');
const sequelize = require('../config/dbconnection');

const Annonce = sequelize.define('annonce', {
    idAnnonce: {type:Sequelize.INTEGER,primaryKey: true, autoIncrement: true},
    Prix: {type:Sequelize.STRING},
    idAutomobiliste: {type:Sequelize.INTEGER},
    CodeVersion : {type:Sequelize.INTEGER},
    CodeCouleur : {type:Sequelize.INTEGER},
    Km : {type:Sequelize.STRING},
    Description: {type: Sequelize.STRING}

});
module.exports = Annonce;
