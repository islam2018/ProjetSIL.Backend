const Sequelize = require('sequelize');
const sequelize = new Sequelize('kw7hslq7wxkw5ttr', 'j3ljxgyybyee8yx8', 'c4r1cssb9muu3yfg', {
    host: 'vlvlnl1grfzh34vj.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
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



