const mongoose = require("mongoose");

const Clientes = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },

    telefone: {
        type: String,
        require: true
    },

    status: {
        type: String,
        require: true
    }
}, {
    collection: 'clientes',
    timestamps: true
});

module.exports = mongoose.model("Clientes", Clientes);