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
            const dataInicio = new Date(req.params.dataInicio).toISOString();
            const dataFim = new Date(req.params.dataFim + "T23:59:59.000Z").toISOString();

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
            // const obj = JSON.parse(req.body.data);
            const obj = req.body.data;

            const cliente = await Clientes.getByNomeAndTelefone(null, null, { nome: obj.nomeCliente, telefone: obj.telefoneCliente });
            const especialidade = await Especialidades.getByNome(null, null, { nome: obj.especialidade });
            
            let data = new Date(obj.data);
            data.setHours(data.getHours() - 3);

            const newAgendamento = {
                clienteID: mongoose.Types.ObjectId(cliente._id),
                especialidadeID: mongoose.Types.ObjectId(especialidade._id),
                atendimento: obj.atendimento,
                tempo: obj.duracao,
                data: data,
                status: "Ativo"
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
            const obj = JSON.parse(req.body.data);

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