'use strict';

require('dotenv').config({ path: `./environments/.${process.env.MODE}.env` });

const express = require('express'),
  app = express(),
  open = require('open'),
  path = require('path');

const port = 9000;

app.use(express.json());
app.set('view options', { layout: false });
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/web'));
app.use(express.static(__dirname + '/web'));

const routes = require('./api/routes/appRoutes');
routes(app);

app.get('/', function (req, res) {
  res.render('index.ejs', {
    environmentsUrl: JSON.parse(process.env.REACT_APP_ENVIRONMENTS_URL || '[]'),
  });
});

app.use((req, res) => {
  res.status(404).send({
    url: req.originalUrl + ' not found',
  });
});

console.log(`The server is running at port number::${port}`);
app.listen(port);

open('http://localhost:9000');
