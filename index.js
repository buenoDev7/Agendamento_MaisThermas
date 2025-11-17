// Express.js
const express = require('express');
const app = express();

// EJS
app.use(express.static('public'));
app.set('view engine', 'ejs');

// > PORT
const PORT = process.env.PORT || 3553;
app.listen(PORT, () => {
    console.log(`\n✅ Servidor conectado na porta ${PORT}.`);
});

// > Uso de Routers
const routerAgendamento = require('./routers/RouterAgendamento');
app.use('/', routerAgendamento);