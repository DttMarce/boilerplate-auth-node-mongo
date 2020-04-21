const express = require('express');
const bodyParser = require('body-parser');
const celebrate = require('celebrate');
const cors = require('cors');

const api = require('../api/routes');
const accessControl = require('../config/middleware/access-control');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(accessControl);
app.use('/v1/', api);
app.use(celebrate.errors());

module.exports = app;
