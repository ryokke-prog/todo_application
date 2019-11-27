const express = require('express');
const todosRouter = require('./routers/todos');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/todos', todosRouter);

module.exports = app;