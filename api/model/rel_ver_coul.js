const Sequelize = require('sequelize');
const sequelize = require('../config/dbconnection');

const Rel_ver_coul = sequelize.define('rel_ver_coul', {
    idRelVerCoul: {type:Sequelize.INTEGER,primaryKey: true, autoIncrement: true},
    CodeVersion: {type:Sequelize.INTEGER},
    CodeCouleur: {type:Sequelize.INTEGER}

});
module.exports = Rel_ver_coul;
