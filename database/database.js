const dotenv = require('dotenv');

dotenv.config();

//######## Conexão com o banco ##########
const sequelize = require('sequelize');

const connection = new sequelize(process.env.MYSQL_DATABASE_NAME, process.env.MYSQL_DATABASE_USER, process.env.MYSQL_DATABASE_PASSWORD, {
    host: process.env.MYSQL_DATABASE_HOST,
    dialect: 'mysql'
});

//########## Exportando conexão #######
module.exports = connection;