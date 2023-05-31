const express = require("express");
const route = express.Router();
const { homeRouter, add_user, update_user } = require("../services/render");
const controller = require("../controller/controller");

route.get("/", homeRouter);

route.get("/add-user", add_user);

route.get("/update-user", update_user);

// API
route.post("/api/users", controller.create);
route.get("/api/users", controller.find);
route.put("/api/users/:id", controller.update);
route.delete("/api/users/:id", controller.delete);
module.exports = route;