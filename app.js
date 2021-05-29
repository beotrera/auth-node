const express = require('express')
const app = express();
const api = require('./routes/routes')

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/birras',api)

module.exports = app