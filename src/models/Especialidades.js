const mongoose = require("mongoose");

const Especialidades = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },

    duracao: {
        type: String,
        require: true
    },

    valor: {
        type: Number,
        require: true
    },

    status: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Especialidades", Especialidades);