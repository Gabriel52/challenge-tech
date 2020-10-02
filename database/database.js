//######## Conexão com o banco ##########
const sequelize = require('sequelize');
const connection = new sequelize('desafiotech','root', '123456', {
    host:'localhost',
    dialect: 'mysql'
});

//########## Exportando conexão #######
module.exports = connection;