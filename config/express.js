const express = require('express');
const bodyParser = require('body-parser');
const celebrate = require('celebrate');
const cors = require('cors');

const api = require('../api/routes');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/', api);
app.use(celebrate.errors());

module.exports = app;
