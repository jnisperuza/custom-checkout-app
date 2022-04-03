'use strict';

const Deploy = require("../controllers/deployController");

module.exports = (app) => {
  app.route('/deploy').post(Deploy.create);
};
