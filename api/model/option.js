const Sequelize = require('sequelize');
const sequelize = require('../config/dbconnection');

const Option = sequelize.define('option', {
    CodeOption: {type:Sequelize.INTEGER,primaryKey: true, autoIncrement: true},
    NomOption: {type:Sequelize.STRING}
});
module.exports = Option;
