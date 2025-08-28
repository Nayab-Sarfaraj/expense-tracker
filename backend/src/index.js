import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimiter from "./middleware/rateLimiter.js";
import initDB from "./utils/initializeDb.js";
import TransactionRouter from "./routes/transaction.route.js"
dotenv.config()
const app = express();
app.use(rateLimiter)
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    res.send("Expense Tracker API is running... 🚀");
});
app.use("/api/transactions", TransactionRouter)
const PORT = process.env.PORT || 5000;
initDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT} 📡`));
})

