const Sequelize = require('sequelize');
const sequelize = require('../config/dbconnection');

const Annonce = sequelize.define('annonce', {
    idAnnonce: {type:Sequelize.INTEGER,primaryKey: true, autoIncrement: true},
    CheminPhoto: {type:Sequelize.TEXT},
    Prix: {type:Sequelize.STRING},
    idAutomobiliste: {type:Sequelize.INTEGER},
    CodeVersion : {type:Sequelize.INTEGER}

});
module.exports = Annonce;
