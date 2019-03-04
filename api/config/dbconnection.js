const Sequelize = require('sequelize');
const sequelize = new Sequelize('sayaradz', 'root', 'root', {
    host: 'localhost',
    port: '8889',
    dialect: 'mysql',
    operatorsAliases: false,
    define: {
        freezeTableName: true,
        timestamps:false
    }
});



sequelize
    .authenticate().then(() => {
    console.log('Connection has been established successfully.');
})
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports=sequelize;



