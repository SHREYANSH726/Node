const express = require("express");
const connectToDB = require("./config/db");
const userRouter = require("./Routes/User.Routes");
const NotesRouter = require("./Routes/note.Routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");   // 👈 add this
require('dotenv').config()

const port = process.env.PORT || 8080;
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Enable CORS for your frontend
app.use(cors({
    origin: "http://localhost:5173", // React app port
    credentials: true                // allow cookies / auth headers
}));

// Routes
app.use("/api/user", userRouter);
app.use("/api/notes", NotesRouter);

// Start server
app.listen(port, async () => {
    try {
        await connectToDB();
        console.log(`✅ Server is running on port number ${port}`);
    } catch (err) {
        console.error("❌ Something went wrong in server", err);
    }
});