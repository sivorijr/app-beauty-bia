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

            let cliente = await Clientes.findOne({ telefone: objCliente.telefone }, async (err, resCliente) => {
                if(err) {
                    throw err;
                }

                if(resCliente) {
                    if(resCliente.nome != objCliente.nome) {
                        await this.put(null, null, {
                            id: resCliente._id,
                            nome: objCliente.nome
                        });
                    }

                    return resCliente;
                }
            });

            if(!cliente) {
                cliente = await this.set(null, null, objCliente);
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

    async put(req, res, obj) {
        try {
            let id = "";

            let objCliente = {
                nome: ""
            }

            if(obj) {
                id = obj.id;
                objCliente.nome = obj.nome;
            } else{
                id = req.params.id;
                objCliente.nome = req.params.nome;
            }

            await Clientes.findByIdAndUpdate(id, objCliente, { new: true }, (err, model) => {
                if(err) {
                    throw err;
                }

                const response = {
                    message: "Cliente alterado com sucesso!",
                    id: model._id
                }
    
                return obj ? response : res.json(response);
            });
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new ClienteController();