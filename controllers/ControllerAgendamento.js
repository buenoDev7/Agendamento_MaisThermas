const Agendamento = require('../models/ModelAgendamento');
const moment = require('moment')

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
            const dataAtual = moment();
            const dataISO = dataAtual.format('YYYY-MM-DD');
            const dataAtualBR = dataAtual.format('DD/MM/YYYY');

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
    }
}
