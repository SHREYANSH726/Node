const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectToDB = require("./db");
const pizzaRoutes = require("./routes/pizzaRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/pizzas", pizzaRoutes);

app.listen(5000, async () => {
  await connectToDB();
  console.log("Server running at http://localhost:5000");
});
