let fs = require("fs");
let path = require("path");
let YAML = require("yaml");
let swaggerUi = require("swagger-ui-express");

let specPath = path.join(__dirname, "../../docs/openapi.yaml");

let swaggerSpec = YAML.parse(fs.readFileSync(specPath, "utf8"));

let swaggerUiOptions = {
  customSiteTitle: "TeamSync API Docs",
  swaggerOptions: {
    persistAuthorization: true,
    withCredentials: true, // send the accessToken cookie with "Try it out"
    displayRequestDuration: true,
    docExpansion: "none",
    tryItOutEnabled: true,
  },
};

module.exports = {
  swaggerUi,
  swaggerSpec,
  swaggerUiOptions,
};
