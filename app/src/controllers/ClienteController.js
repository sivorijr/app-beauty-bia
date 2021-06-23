require("dotenv").config();
const axios = require("axios");

const Clientes = require("../models/Clientes");

class ClienteController {
    
    async getAll(req, res) {
        try {
            const clientes = await Clientes.find().populate({
                path: "data",
                options: { sort: { createdAt: -1 } }
            });

            return res.json(clientes);
        } catch (err) {
            throw err;
        }
    }

    async set(req, res, obj) {
        try {
            let newCliente = {};

            if(obj) {
                newCliente = {
                    nome: obj.nome,
                    telefone: obj.telefone,
                    status: "Ativo"
                }
            } else{
                newCliente = {
                    nome: req.body.nome,
                    telefone: req.body.telefone,
                    status: req.body.status
                }
            }

            const cliente = await Clientes.create(newCliente);
            
            return obj ? cliente : res.json(cliente);
        } catch (err) {
            throw err;
        }
    }

    async get(req, res) {
        try {
            const cliente = await Clientes.findById(req.params.id);

            return res.json(cliente);
        } catch (err) {
            throw err;
        }
    }

    async getByNomeAndTelefone(req, res, obj) {
        try {
            let objCliente = {
                nome: "",
                telefone: ""
            }

            if(obj) {
                objCliente.nome = obj.nome;
                objCliente.telefone = obj.telefone;
            } else{
                objCliente.nome = req.params.nome;
                objCliente.telefone = req.params.telefone;
            }

            let cliente = await Clientes.findOne(objCliente, async (err, resCliente) => {
                if(err) {
                    throw err;
                }

                if(resCliente) {
                    return resCliente;
                }
            });

            if(!cliente) {
                const clienteController = new ClienteController();
                cliente = await clienteController.set(null, null, objCliente);
            }

            return obj ? cliente : res.json(cliente);
        } catch (err) {
            throw err;
        }
    }

    async delete(req, res) {
        try {
            await Cliente.findByIdAndDelete(req.params.id);

            return res.send("Cliente deleted with success");
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new ClienteController();