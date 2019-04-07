const Sequelize = require('sequelize');
const sequelize = new Sequelize('a40lmgbzo4zrytx3', 'f3icoadbdy24u76v', 'hjg40kzep37lxt54', {
    host: 'gi6kn64hu98hy0b6.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
    port: '3306',
    dialect: 'mysql',
    operatorsAliases: false,
    define: {
        freezeTableName: true,
        timestamps:false
    }
});

/*const sequelize = new Sequelize('a40lmgbzo4zrytx3', 'debian-sys-maint', 'YtkaCyun9oqIzkNt', {
    host: 'localhost',
    //port: '8889',
    dialect: 'mysql',
    operatorsAliases: false,
    define: {
        freezeTableName: true,
        timestamps:false
    }
});*/



sequelize
    .authenticate().then(() => {
    console.log('Connection has been established successfully.');
})
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports=sequelize;



