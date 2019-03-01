const Sequelize = require('sequelize');
const sequelize = require('../config/dbconnection');

const Automobiliste = sequelize.define('automobiliste', {
    idAutomobiliste: {type:Sequelize.INTEGER,primaryKey: true},
    NumTel: {type:Sequelize.STRING},
    Nom: {type:Sequelize.STRING},
    Prenom: {type:Sequelize.STRING}
});
module.exports =Automobiliste;
