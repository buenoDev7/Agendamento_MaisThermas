const express = require('express');
const router = express.Router();
const ControllerAgendamento = require('../controllers/ControllerAgendamento');

// > View para cadastro de informações do agendamento
router.get('/cadastro', ControllerAgendamento.cadastro);

// > Rota POST para salvar agendamento no Banco de Dados
router.post('/salvar_agendamento', ControllerAgendamento.salvar_agendamento);

module.exports = router;