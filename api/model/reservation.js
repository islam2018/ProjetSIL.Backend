const Sequelize = require('sequelize');
const sequelize=require('../config/dbconnection');
const UtilFab=sequelize.define('reservation',
    {
        idReservation:{type:Sequelize.INTEGER,primaryKey: true, autoIncrement: true},
        Montant:{type:Sequelize.STRING},
    });

module.exports=UtilFab;
