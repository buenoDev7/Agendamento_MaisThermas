require('dotenv').config()

process.env.TZ = 'America/Sao_Paulo';

// Express.js
const express = require('express');
const app = express();

// Conexão com Banco de Dados
const connection = require('./database/db_connection');
connection.authenticate({ alter: true }).then(() => {
    console.log('\n✅ Banco de Dados conectado com sucesso!');
}).catch(error => {
    console.error(`\n❌ Erro ao conectar com o Banco de Dados: [${error}]}`);
});

// > BodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// EJS
app.use(express.static('public'));
app.set('view engine', 'ejs');

// > PORT
const PORT = process.env.PORT || 3553;
app.listen(PORT, () => {
    console.log(`\n✅ Servidor rodando na porta ${PORT}.`);
});

// > Uso de Routers
const routerAgendamento = require('./routers/RouterAgendamento');
app.use('/', routerAgendamento);