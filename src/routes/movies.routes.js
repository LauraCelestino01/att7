const { Router } = require('express');

const moviesController = require("../controllers/movies.controller.js");
const { veryfyAuthenticate } = require("../middleware/verifyAuthentication.js");


const routes = Router();


routes.get("/movies", moviesController.list);
routes.get("/movies/:id", moviesController.read);
routes.post("/movies", veryfyAuthenticate, moviesController.create);
routes.put("/movies/:id", moviesController.update);
routes.delete("/movies/:id", moviesController.delet);


module.exports = routes