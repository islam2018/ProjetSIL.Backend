const Sequelize = require('sequelize');
const sequelize = require('../config/dbconnection');

const Modele = sequelize.define('Modele', {
    CodeModele: {type:Sequelize.INTEGER,primaryKey: true, autoIncrement: true},
    CodeMarque: {type:Sequelize.INTEGER},
    NomModele: {type:Sequelize.STRING}
});
module.exports = Modele;
