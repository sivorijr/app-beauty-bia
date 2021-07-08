require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(bodyParser.json());
app.use(require("./routes"));

app.listen(process.env.PORT || 5555);