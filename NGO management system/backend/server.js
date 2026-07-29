const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((error) => {
    console.log("MongoDB Connection Error:", error);
});


// Test Route
app.get("/", (req, res) => {
    res.send("NGO Backend Running");
});


// Load Auth Routes
const authRoutes = require("./routes/authRoutes");


// API Route
app.use("/api/auth", authRoutes);


// Start Server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});