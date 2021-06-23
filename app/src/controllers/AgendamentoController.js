const mongoose = require("mongoose");

const Agendamentos = require("../models/Agendamentos");
const Clientes = require("./ClienteController");
const Especialidades = require("./EspecialidadeController");

class AgendamentoController {
    async getAll(req, res) {
        try {
            const agendamentos = await Agendamentos
                .find()
                .populate({
                    path: "clienteID",
                    options: { sort: { data: -1 } }
                })
                .populate({
                    path: "especialidadeID",
                    options: { sort: { data: -1 } }
                });

            return res.json(agendamentos);
        } catch (err) {
            throw err;
        }
    }

    async getAllByDates(req, res) {
        try {
            const dados = JSON.parse(req.params.filter);

            const dataInicio = new Date(dados.dataInicio).toISOString();
            const dataFim = new Date(dados.dataFim + "T23:59:59.000Z").toISOString();

            const agendamentos = await Agendamentos
                .find({ data: { $gte: dataInicio, $lt: dataFim } })
                .populate({
                    path: "clienteID",
                    options: { sort: { data: -1 } }
                })
                .populate({
                    path: "especialidadeID",
                    options: { sort: { data: -1 } }
                });

            return res.json(agendamentos);
        } catch (err) {
            throw err;
        }
    }

    async set(req, res) {
        try {
            const splitCliente = req.body.cliente.split(' - ');

            const cliente = await Clientes.getByNomeAndTelefone(null, null, { nome: splitCliente[0], telefone: splitCliente[1] });
            const especialidade = await Especialidades.getByNome(null, null, { nome: req.body.trabalho });

            const newAgendamento = {
                clienteID: mongoose.Types.ObjectId(cliente._id),
                especialidadeID: mongoose.Types.ObjectId(especialidade._id),
                atendimento: req.body.atendimento,
                tempo: req.body.tempo,
                data: req.body.data,
                status: req.body.status
            }

            const agendamento = await Agendamentos.create(newAgendamento);

            return res.json(agendamento);
        } catch (err) {
            throw err;
        }
    }

    async get(req, res) {
        try {
            const agendamento = await Agendamentos.findById(req.params.id);

            return res.json(agendamento);
        } catch (err) {
            throw err;
        }
    }

    async delete(req, res) {
        try {
            await Agendamentos.findByIdAndDelete(req.params.id, (err, model) => {
                if(err) {
                    throw err;
                }
 
                const response = {
                    message: "Agendamento deletado com sucesso!",
                    id: model._id
                }

                return res.json(response);
            });
        } catch (err) {
            throw err;
        }
    }

    async put(req, res) {
        try {
            const obj = JSON.parse(req.params.obj);

            await Agendamentos.findByIdAndUpdate(req.params.id, obj, { new: true }, (err, model) => {
                if(err) {
                    throw err;
                }

                const response = {
                    message: "Agendamento alterado com sucesso!",
                    id: model._id
                }
    
                return res.json(response);
            });
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new AgendamentoController();