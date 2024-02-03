import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import blogRouter from "./routes/blog-routes.js";
import router from "./routes/user-routes.js";
import cors from "cors";

dotenv.config();
const app = express();

// Use CORS globally
app.use(cors());

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes for user and blog
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 8000;

mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Connected To Database`);
        mongoose.set('strictQuery', true);
        app.listen(PORT, () => {
            console.log(`Server is listening at PORT ${PORT}`);
        });
    })
    .catch((err) => console.log("MongoDB not connected"));

// Example of adding a test route using app.get
app.get("/test", (req, res) => {
    res.send("Testing route is working!");
});

// Example of adding a test middleware using app.use
app.use("/testmiddleware", (req, res, next) => {
    console.log("Testing middleware");
    next();
});

app.listen(3000, () => console.log('Local app listening on port 3000!'));
