const Sequelize = require('sequelize');
const sequelize = require('../config/dbconnection');

const Lignetarif = sequelize.define('lignetarif', {
    idLigneTarif: {type:Sequelize.INTEGER,primaryKey: true, autoIncrement: true},
    Type: {type:Sequelize.INTEGER},
    Code: {type:Sequelize.INTEGER},
    DateDebut: {type:Sequelize.DATE},
    DateFin: {type:Sequelize.DATE},
    Prix: {type:Sequelize.INTEGER}
});

module.exports = Lignetarif;
