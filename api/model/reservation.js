const Sequelize = require('sequelize');
const sequelize=require('../config/dbconnection');
const UtilFab=sequelize.define('reservation',
    {
        IdUserF:{type:Sequelize.INTEGER,primaryKey: true, autoIncrement: true},
        Montant:{type:Sequelize.INTEGER},
        Mode:{type:Sequelize.STRING}
    });

module.exports=UtilFab;
