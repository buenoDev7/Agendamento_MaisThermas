'use strict'

const { Op } = require('sequelize');
const Agendamento = require('../models/ModelAgendamento');
const moment = require('moment');


module.exports = {
    cadastro: (req, res) => {
        res.render('cadastro');
    },

    salvar_agendamento: async (req, res) => {
        try {
            // Recebe os dados do Form
            const { nomesAgendamento, horarioAgendamento, dataAgendamento, voucher, telefone } = req.body;

            // Cria o agendamento no Banco de Dados
            const agendamento = await Agendamento.create({
                nomesAgendamento,
                horarioAgendamento,
                dataAgendamento,
                voucher,
                telefone
            });

            // Renderiza o convite
            return res.render('convite', {
                agendamento
            })

        } catch (error) {
            console.error(error.message);
            res.status(400).render('errorPage', {
                error
            })
        }
    },

    agendamentos: async (req, res) => {
        let dataAtual = moment();
        let dataISO = dataAtual.format('YYYY-MM-DD');
        let dataAtualBR = dataAtual.format('DD/MM/YYYY');
        try {
            const agendamentos = await Agendamento.findAll({
                where: {
                    dataAgendamento: dataISO
                },
                order: [['horarioAgendamento', 'ASC']]
            })
            return res.render('agendamentos', {
                currentUrl: req.originalUrl,
                agendamentos,
                dataAtualBR
            })
        } catch (error) {
            return res.status(500).json({ error: `Erro ao buscar agendamentos: [${error.message}]` })
        }
    },

    filtrarAgendamentos: async (req, res) => {
        let dataAtual = moment();
        let dataISO = dataAtual.format('YYYY-MM-DD');

        try {
            let { dataInicioFiltro, dataFimFiltro } = req.query;

            // Se a dataInicio for vazia, assume como data atual
            if (!dataInicioFiltro) {
                dataInicioFiltro = dataISO
            }

            // Se a dataFim for vazia, assume como data atual
            if (!dataFimFiltro) {
                dataFimFiltro = dataISO
            }

            // Evita filtragem de dataFim menor que dataInicio. (Parâmentros invertidos na pesquisa)
            if (dataFimFiltro < dataInicioFiltro) {
                throw new Error('\n❌ Erro ao filtrar agendamentos: A data fim não pode ser maior que a data de início')
            }

            let dataInicioBR = moment(dataInicioFiltro).format('DD/MM/YYYY');
            let dataFimBR = moment(dataFimFiltro).format('DD/MM/YYYY');

            const agendamentosFiltrados = await Agendamento.findAll({
                where: {
                    dataAgendamento: {
                        [Op.between]: [dataInicioFiltro, dataFimFiltro]
                    }
                },
                order: [['dataAgendamento', 'ASC']]
            })
            return res.render('agendamentosPorData', {
                currentUrl: req.originalUrl,
                agendamentosFiltrados,
                dataInicioBR,
                dataFimBR
            })
        } catch (error) {
            console.error(error.message)
        }
    },

    editarAgendamento: async (req, res) => {
        try {
            let idAgendamento = req.params.idAgendamento;
            let agendamento = await Agendamento.findByPk(idAgendamento)
            res.render('editarAgendamento', {
                agendamento
            })
        } catch (error) {
            console.error(error.message)
            return res.status(400).render('errorPage', {
                error: error.message
            })
        }
    },

    salvarEdicao: async (req, res) => {
        let novosDados = {
            nomesAgendamento: req.body.nomesAgendamento,
            horarioAgendamento: req.body.horarioAgendamento,
            dataAgendamento: req.body.dataAgendamento,
            voucher: req.body.voucher,
            telefone: req.body.telefone,
        }

        Agendamento.update(novosDados, {
            where: {
                id: req.body.idAgendamento
            }
        })

        res.render('conviteEditado', {
            novosDados
        })
    },

    deletarAgendamento: async (req, res) => {
        try {
            const idAgendamento = req.body.idAgendamento;
            await Agendamento.destroy({
                where: { id: idAgendamento }
            });

            const returnTo = req.get('referer') || '/agendamentos';
            return res.redirect(returnTo);
        } catch (error) {
            console.error(error.message);
            return res.status(500).render('errorPage', { error });
        }
    }
}
