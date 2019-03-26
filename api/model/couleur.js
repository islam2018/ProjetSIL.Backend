const Sequelize = require('sequelize');
const sequelize = require('../config/dbconnection');

const Couleur = sequelize.define('couleur', {
    CodeCouleur: {type:Sequelize.INTEGER,primaryKey: true},
    NomCouleur: {type:Sequelize.STRING},
    CodeHexa: {type:Sequelize.STRING}

});

module.exports = Couleur;
