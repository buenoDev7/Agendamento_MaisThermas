const express = require('express');
const router = express.Router();
const ControllerAgendamento = require('../controllers/ControllerAgendamento');

// > View para cadastro de informações do agendamento
router.get('/cadastro', ControllerAgendamento.cadastro);

// > Rota POST para salvar agendamento no Banco de Dados
router.post('/salvar_agendamento', ControllerAgendamento.salvar_agendamento);

// > View para lista de agendamentos
router.get('/agendamentos', ControllerAgendamento.agendamentos);

// > View para agendamentos filtrados por data
router.get('/filtrar_agendamentos', ControllerAgendamento.filtrarAgendamentos);

module.exports = router;