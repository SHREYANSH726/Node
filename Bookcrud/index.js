const express = require("express");
const { connectToDb, Bookmodel } = require("./Book");

const app = express();
app.use(express.json());

// Test route
app.get("/test", (req, res) => {
    res.status(200).json({ message: "Test Module Run....." });
});

// Create book
app.post("/Added", async (req, res) => {
    const { title, description, price, stockQuantity, category, authors } = req.body;

    try {
        const result = await Bookmodel.create({
            title,
            description,
            price,
            stockQuantity,
            category,
            authors,
        });

        res.status(201).json({ message: "Book Added Successfully", book: result });
    } catch (error) {
        res.status(500).json({ message: "Error creating book", error });
    }
});

// Get all books
app.get("/Books", async (req, res) => {
    try {
        const books = await Bookmodel.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error });
    }
});

// Update book
app.patch("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, price, stockQuantity, category, authors } = req.body;

    try {
        const updatedBook = await Bookmodel.findByIdAndUpdate(
            id,
            { title, description, price, stockQuantity, category, authors },
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book updated successfully", book: updatedBook });
    } catch (error) {
        res.status(500).json({ message: "Error updating book", error });
    }
});

// Delete book
app.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBook = await Bookmodel.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting book", error });
    }
});

// Connect to DB and start server
connectToDb().then(() => {
    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });
});
