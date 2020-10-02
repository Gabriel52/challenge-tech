const Sequelize = require('sequelize');
const connection = require('./database');

//##### Model de um departamento ########
const Department = connection.define('departamento',{
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

//#### CRIANDO A TABELO NO BANCO #####
Department.sync({force: false}).then(()=>{
    console.log('Tabela departamento criada');
}).catch((error)=>{
    console.log(error);
});

module.exports = Department;