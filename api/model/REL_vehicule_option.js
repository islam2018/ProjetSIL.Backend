const Sequelize = require('sequelize');
const sequelize = require('../config/dbconnection');

const RelVechicOpt = sequelize.define('rel_vehic_opt', {
    idRelVehicOption: {type:Sequelize.INTEGER,primaryKey: true,autoIncrement: true},
    NumChassis: {type:Sequelize.INTEGER},
    CodeOption: {type:Sequelize.INTEGER}
});
module.exports = RelVechicOpt;
