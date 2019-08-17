const Sequelize = require('sequelize');
const sequelize = require('../config/dbconnection');

const Info = sequelize.define('infos', {
    CodeMarque: {type:Sequelize.INTEGER,primaryKey: true},
    DateUploadStock: {type:Sequelize.DATE},
    DateUploadTarif: {type:Sequelize.DATE}
});
module.exports =Info;
