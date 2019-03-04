const Sequelize = require('sequelize');
const sequelize = require('../config/dbconnection');

const Rel_mod_opt = sequelize.define('rel_mod_opt', {
    idRelModOpt: {type:Sequelize.INTEGER,primaryKey: true, autoIncrement: true},
    CodeModele: {type:Sequelize.INTEGER},
    CodeOption: {type:Sequelize.STRING}
});
module.exports = Rel_mod_opt;
