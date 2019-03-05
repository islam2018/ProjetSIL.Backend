const Sequelize = require('sequelize');
const sequelize = require('../config/dbconnection');

const FavorisModele = sequelize.define('favoris_modele', {
    idFavorisModele : {type:Sequelize.INTEGER,primaryKey: true,autoIncrement:true},
    CodeModele: {type:Sequelize.INTEGER},
    idAutomobiliste: {type:Sequelize.STRING}

});

module.exports = FavorisModele;
