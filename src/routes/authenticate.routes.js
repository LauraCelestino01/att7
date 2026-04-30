const { Router } = require("express");

const authenticateController = require("../controllers/authenticate.controller.js");


const routes = Router();

routes.post("/authenticate/", authenticateController.login );


module.exports = routes