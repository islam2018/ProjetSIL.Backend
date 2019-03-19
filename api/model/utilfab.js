const Sequelize = require('sequelize');
const sequelize=require('../config/dbconnection');
const UtilFab=sequelize.define('utilisateurfabricant',
    {
        IdUserF:{type:Sequelize.INTEGER,primaryKey: true, autoIncrement: true},
        Mail:{type:Sequelize.STRING},
        Nom:{type:Sequelize.STRING},
        Prenom:{type:Sequelize.STRING},
        Mdp:{type:Sequelize.TEXT},
        NumTel:{type:Sequelize.INTEGER},
        Fabricant:{type:Sequelize.INTEGER},
            Valide:{type:Sequelize.INTEGER},
            Bloque: {type:Sequelize.INTEGER}
    });

module.exports=UtilFab;
