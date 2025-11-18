const Agendamento = require('../models/ModelAgendamento');

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
    }
}