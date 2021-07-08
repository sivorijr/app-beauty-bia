require("dotenv").config();
const express = require("express");

const routes = express.Router();

const AgendamentoController = require("../controllers/AgendamentoController");
const ClienteController = require("../controllers/ClienteController");
const EspecialidadeController = require("../controllers/EspecialidadeController");

routes.get("/", (req, res) => { return res.send("BeautyBia API by Sivori Junior") });

routes.get("/agendamentos", AgendamentoController.getAll);
routes.get("/agendamentos/:filter", AgendamentoController.getAllByDates);

routes.post("/agendamento", AgendamentoController.set);
routes.get("/agendamento/:id", AgendamentoController.get);
routes.delete("/agendamento/:id", AgendamentoController.delete);
routes.put("/agendamento/:id", AgendamentoController.put);

routes.get("/clientes", ClienteController.getAll);

routes.post("/cliente", ClienteController.set);
routes.get("/cliente/:id", ClienteController.get);
routes.delete("/cliente/:id", ClienteController.delete);

routes.get("/especialidades", EspecialidadeController.getAll);

routes.post("/especialidade", EspecialidadeController.set);
routes.get("/especialidade/:id", EspecialidadeController.get);
routes.delete("/especialidade/:id", EspecialidadeController.delete);

module.exports = routes;