const Sequelize = require('sequelize');
const sequelize = require('../config/dbconnection');

const Version = sequelize.define('version', {
    CodeVersion: {type:Sequelize.INTEGER,primaryKey: true},
    CodeModele: {type:Sequelize.INTEGER},
    NomVersion: {type:Sequelize.STRING}
});
module.exports = Version;
