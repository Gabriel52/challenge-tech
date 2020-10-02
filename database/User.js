const Sequelize = require('sequelize');
const connection = require('./database');
const Department = require('./Department')

//###### Model de um usuario #######
const Users = connection.define('usuarios',{
    email: {
        type: Sequelize.STRING,
        allowNull:false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false
    },

});
//##### Ligando as tabelos por uma chave estrangeira #######
Department.hasMany(Users);
Users.belongsTo(Department);
Users.sync({force: false});

module.exports = Users;