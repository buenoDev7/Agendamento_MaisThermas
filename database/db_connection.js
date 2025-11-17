const Sequelize = require('sequelize');
const connection = new Sequelize('agendamento_maisthermas', 'root', '@Yan2004', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00',
    logging: false
});

module.exports = connection;