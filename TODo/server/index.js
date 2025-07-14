const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 1212;

app.get("/product", (req, res) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) return res.status(500).send("Error reading file");
    const { product } = JSON.parse(data);
    res.send(product);
  });
});
app.post('/product', (req, res) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) return res.status(500).send("Server Error");

    const db = JSON.parse(data);
    const products = db.product;

    // Generate next ID
    const nextId = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const newProduct = {
      id: nextId,
      ...req.body
    };

    products.push(newProduct);

    fs.writeFile("./db.json", JSON.stringify({ product: products }, null, 2), (err) => {
      if (err) return res.status(500).send("Error writing to file");
      res.status(201).send(newProduct);
    });
  });
});


app.delete("/product/:id", (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) return res.status(500).send("Error reading file");

    const db = JSON.parse(data);
    const updatedProducts = db.product.filter(p => p.id !== id);

    db.product = updatedProducts;

    fs.writeFile("./db.json", JSON.stringify(db, null, 2), (err) => {
      if (err) return res.status(500).send("Error writing file");
      res.send({ message: "Product deleted" });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:1212`);
});
