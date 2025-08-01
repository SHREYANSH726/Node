const express = require("express");
const router = express.Router();
const pizzaController = require("../pizzacontroller/pizzacontroller");

router.get("/", pizzaController.getAllPizzas);
router.post("/", pizzaController.createPizza);

module.exports = router;
