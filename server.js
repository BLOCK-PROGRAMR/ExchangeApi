// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const EXCHANGE_API_URL = "https://api.exchangerate-api.com/v4/latest/";

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Define Schema & Model
const conversionSchema = new mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    amount: { type: Number, required: true },
    convertedAmount: { type: Number, required: true },
    rate: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
});

const Conversion = mongoose.model("Conversion", conversionSchema);

// Middleware
app.use(express.json());
app.use(cors());

// Convert currency endpoint
app.post("/convert", async (req, res) => {
    try {
        const { from, to, amount } = req.body;
        if (!from || !to || !amount || amount <= 0) {
            return res.status(400).json({ error: "Invalid input" });
        }

        const response = await axios.get(`${EXCHANGE_API_URL}${from}`);
        const rate = response.data.rates[to];

        if (!rate) {
            return res.status(400).json({ error: "Invalid currency code" });
        }

        const convertedAmount = amount * rate;

        const conversion = new Conversion({ from, to, amount, convertedAmount, rate });
        await conversion.save();

        res.json({ from, to, amount, convertedAmount, rate });
    } catch (error) {
        console.error("❌ Conversion Error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
});

// Get past conversions endpoint
app.get("/history", async (req, res) => {
    try {
        const history = await Conversion.find().sort({ timestamp: -1 }).limit(10);
        res.json(history);
    } catch (error) {
        console.error("❌ History Fetch Error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
