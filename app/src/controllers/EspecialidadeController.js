const Especialidades = require("../models/Especialidades");

class EspecialidadeController {
    async getAll(req, res) {
        try {
            const especialidade = await Especialidades.find().populate({
                path: "data",
                options: { sort: { createdAt: -1 } }
            });

            return res.json(especialidade);
        } catch (err) {
            throw err;
        }
    }

    async set(req, res) {
        try {
            var newEspecialidade = {
                nome: req.body.nome,
                duracao: req.body.duracao,
                valor: req.body.valor,
                status: req.body.status
            }

            const especialidade = await Especialidades.create(newEspecialidade);

            return res.json(especialidade);
        } catch (err) {
            throw err;
        }
    }

    async get(req, res) {
        try {
            const especialidade = await Especialidades.findById(req.params.id);

            return res.json(especialidade);
        } catch (err) {
            throw err;
        }
    }

    async getByNome(req, res, obj) {
        try {
            let objEspecialidade = { nome: "" }

            objEspecialidade.nome = obj ? obj.nome : req.params.nome;

            const especialidade = await Especialidades.findOne(objEspecialidade, async (err, resCliente) => {
                if(err) {
                    throw err;
                }

                if(resCliente) {
                    return resCliente;
                }
            });

            return obj ? especialidade : res.json(especialidade);
        } catch (err) {
            throw err;
        }
    }

    async delete(req, res) {
        try {
            await Especialidades.findByIdAndDelete(req.params.id);

            return res.send("Especialidade deleted with success");
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new EspecialidadeController();