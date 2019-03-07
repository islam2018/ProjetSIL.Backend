const Sequelize = require('sequelize');
const sequelize=require('../config/dbconnection');
const Administrateur=sequelize.define('administrateur',
    {
        idAdmin:{type:Sequelize.INTEGER,primaryKey: true, autoIncrement: true},
        Mail:{type:Sequelize.STRING},
        Nom:{type:Sequelize.STRING},
        Prenom:{type:Sequelize.STRING},
        Mdp:{type:Sequelize.TEXT}

    });

module.exports=Administrateur;
