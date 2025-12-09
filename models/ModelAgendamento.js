const Sequelize = require('sequelize');
const connection = require('../database/db_connection');
const Agendamento = connection.define('agendamento', {
    nomesAgendamento: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O campo "nomes" não pode ser vazio!'
            }
        }
    },

    horarioAgendamento: {
        type: Sequelize.TIME,
        allowNull: true
    },

    dataAgendamento: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O campo "data" não pode ser vazio!'
            }
        }
    },

    voucher: {
        type: Sequelize.STRING,
        allowNull: true
    },

    telefone: {
        type: Sequelize.STRING,
        allowNull: true
    },

    statusAgendamento: {
        type: Sequelize.STRING,
        allowNull: true
    }
},
    {
        freezeTableName: true
    }
);

Agendamento.sync({ force: false }).then(() => {
    console.log('\n✅ Tabela de agendamentos atualizada com sucesso!');
}).catch(error => {
    console.error(`\n❌ Erro ao atualizar tabela de agendamentos: [${error}]}`)
})

module.exports = Agendamento;