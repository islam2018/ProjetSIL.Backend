const Sequelize = require('sequelize');
const sequelize = require('../config/dbconnection');

const Vehicule = sequelize.define('vehicule', {
    NumChassis: {type:Sequelize.INTEGER,primaryKey: true},
    CodeVersion: {type:Sequelize.INTEGER},
    CodeCouleur: {type:Sequelize.INTEGER},
    Disponible: {type:Sequelize.INTEGER},
    Concessionaire: {type:Sequelize.STRING}
});

module.exports = Vehicule;
