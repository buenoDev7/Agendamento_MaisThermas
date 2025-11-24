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

            // Sanitização de Inputs
            // Verifica se "nomesAgendamento" existe e verifica typeof
            if (!nomesAgendamento || typeof nomesAgendamento !== 'string') {
                throw new Error('O campo "Nomes" deve ser do tipo "STRING"')
            }
            
            // Normaliza caracteres UniCode e aplica trim
            let nomesTrim = nomesAgendamento.trim().normalize('NFC');
            
            // Verifica length do input
            if (nomesTrim.length <= 2 || nomesTrim.length >= 255) {
                throw new Error('O campo "Nomes" deve ser preenchido com valores entre 3 - 255 caracteres')
            }

            // Regex que permite vírgulas e nomes com acento
            const regexNomes = /^[A-Za-zÀ-ÖØ-öø-ÿ ,e]+$/
            
            // Verifica se o input corresponde à regEx
            if (!regexNomes.test(nomesTrim)) {
                throw new Error('O valor preenchido no campo "Nomes" não é válido')
            }

            const agendamento = await Agendamento.create({
                nomesAgendamento: nomesTrim,
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
            res.status(400).render('404', {
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
                agendamentosFiltrados,
                dataInicioBR,
                dataFimBR
            })
        } catch (error) {
            console.error(error.message)
            return res.render('404', {
                error
            })
        }
    }
}
