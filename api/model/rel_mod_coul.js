const Sequelize = require('sequelize');
const sequelize = require('../config/dbconnection');

const Rel_mod_coul = sequelize.define('rel_mod_coul', {
    idRelModCoul: {type:Sequelize.INTEGER,primaryKey: true, autoIncrement: true},
    CodeModele: {type:Sequelize.INTEGER},
    CodeCouleur: {type:Sequelize.STRING}
});
module.exports = Rel_mod_coul;
