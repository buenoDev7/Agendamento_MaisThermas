const express = require('express');
const router = express.Router();
const ControllerAgendamento = require('../controllers/ControllerAgendamento');

// > View para cadastro de informações do agendamento
router.get('/cadastro', ControllerAgendamento.cadastro);

// > Rota POST para salvar agendamento no Banco de Dados
router.post('/salvar_agendamento', ControllerAgendamento.salvar_agendamento);

// > View para lista de agendamentos
router.get('/agendamentos', ControllerAgendamento.agendamentos);

// > View para edição de agendamento
router.get('/editar/:idAgendamento', ControllerAgendamento.editarAgendamento);

// > Persiste alterações do agendamento
router.post('/salvar_edicao', ControllerAgendamento.salvarEdicao);

// > Deletar agendamento
router.post('/del_agendamento', ControllerAgendamento.deletarAgendamento);

// > View para agendamentos filtrados por data
router.get('/filtrar_agendamentos', ControllerAgendamento.filtrarAgendamentos);

module.exports = router;