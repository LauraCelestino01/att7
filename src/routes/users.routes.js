const { Router } = require("express");

const usersController = require("../controllers/users.controller.js");


const routes = Router();


routes.get("/users", usersController.list);
routes.get("/users/:id", usersController.getById);
routes.post("/users", usersController.create);
routes.put("/users/:id", usersController.update);
routes.delete("/users/:id", usersController.remove);


module.exports = routes