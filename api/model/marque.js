const Sequelize = require('sequelize');
const sequelize = require('../config/dbconnection');
const Marque = sequelize.define('Marque', {
    CodeMarque:{type:Sequelize.INTEGER,primaryKey: true},
    NomMarque:{type:Sequelize.STRING}
});

module.exports=Marque;
