const Sequelize = require('sequelize');
const sequelize = require('../config/dbconnection');

const Image = sequelize.define('image', {
    idImage: {type:Sequelize.INTEGER,primaryKey: true,autoIncrement:true},
    Type: {type:Sequelize.INTEGER},
    Code: {type:Sequelize.INTEGER},
    CheminImage: {type:Sequelize.STRING},
    Description: {type:Sequelize.STRING},
});
module.exports =Image;
