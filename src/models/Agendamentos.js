const mongoose = require("mongoose");

const Agendamentos = new mongoose.Schema({
    clienteID: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true,
        ref: "Clientes"
    },

    especialidadeID: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true,
        ref: "Especialidades"
    },

    atendimento: {
        type: String,
        require: true
    },

    data: {
        type: Date,
        require: true
    },

    status: {
        type: String,
        require: true
    }
}, {
    collection: 'agendamentos',
    timestamps: true
});

module.exports = mongoose.model("Agendamentos", Agendamentos);