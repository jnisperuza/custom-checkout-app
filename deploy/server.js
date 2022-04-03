'use strict';
const express = require('express'),
  app = express(),
  open = require('open');

const port = 9000;

app.use(express.json());
app.set('view options', { layout: false });
app.use(express.static(__dirname + '/web'));

const routes = require('./api/routes/appRoutes');
routes(app);

app.get('/', function (req, res) {
  res.render('/web/index.html');
});

app.use((req, res) => {
  res.status(404).send({
    url: req.originalUrl + ' not found',
  });
});

console.log(`The server is running at port number::${port}`);
app.listen(port);

open('http://localhost:9000');
