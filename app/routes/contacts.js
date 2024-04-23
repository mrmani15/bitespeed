const { identifyController } = require("../controllers/identifyController");

module.exports = function (app) {
  let baseUrl = `/identify`;

  app.post(baseUrl, identifyController);
};
