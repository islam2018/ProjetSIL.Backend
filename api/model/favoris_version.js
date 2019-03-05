const Sequelize = require('sequelize');
const sequelize = require('../config/dbconnection');

const FavorisVersion = sequelize.define('favoris_version', {
    idFavorisVersion : {type:Sequelize.INTEGER,primaryKey: true,autoIncrement:true},
    CodeVersion: {type:Sequelize.INTEGER},
    idAutomobiliste: {type:Sequelize.STRING}
});

module.exports = FavorisVersion;
