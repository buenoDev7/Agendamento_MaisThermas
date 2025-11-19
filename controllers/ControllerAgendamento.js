const { Op } = require('sequelize');
const Agendamento = require('../models/ModelAgendamento');
const moment = require('moment');
let dataAtual = moment();
let dataISO = dataAtual.format('YYYY-MM-DD');
let dataAtualBR = dataAtual.format('DD/MM/YYYY');


module.exports = {
    cadastro: (req, res) => {
        res.render('cadastro');
    },

    salvar_agendamento: async (req, res) => {
        try {
            const { nomesAgendamento, horarioAgendamento, dataAgendamento, voucher, telefone } = req.body;
            if (!nomesAgendamento || !dataAgendamento) {
                throw new Error(`\n❌ Erro ao salvar agendamento: [INFORMAÇÕES INCOMPLETAS]`);
            }

            const agendamento = await Agendamento.create({
                nomesAgendamento,
                horarioAgendamento,
                dataAgendamento,
                voucher,
                telefone
            });

            return res.render('convite', {
                agendamento
            })

        } catch (error) {
            console.error(error.message);
        }
    },

    agendamentos: async (req, res) => {
        try {
            const agendamentos = await Agendamento.findAll({
                where: {
                    dataAgendamento: dataISO
                },
                order: [['horarioAgendamento', 'ASC']]
            })
            return res.render('agendamentos', {
                agendamentos,
                dataAtualBR
            })
        } catch (error) {
            return res.status(500).json({ error: `Erro ao buscar agendamentos: [${error.message}]` })
        }
    },

    filtrarAgendamentos: async (req, res) => {
        try {
            let { dataInicioFiltro, dataFimFiltro } = req.query;

            if (!dataInicioFiltro) {
                dataInicioFiltro = dataISO
            }

            if (!dataFimFiltro) {
                dataFimFiltro = dataInicioFiltro
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
                agendamentosFiltrados,
                dataInicioBR,
                dataFimBR
            })
        } catch (error) {
            console.log(error.message)
        }
    }
}
