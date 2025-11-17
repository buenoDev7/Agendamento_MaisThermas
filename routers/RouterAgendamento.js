const express = require('express');
const router = express.Router();
const ControllerAgendamento = require('../controllers/ControllerAgendamento');

// > View para cadastro de informações do agendamento
router.get('/cadastro', ControllerAgendamento.cadastro);

module.exports = router;