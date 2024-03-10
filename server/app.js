import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import blogRouter from "./routes/blog-routes.js";
import router from "./routes/user-routes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "client", "build")));
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// Add a wildcard (*) route handler for unmatched routes
// app.use((req, res, next) => {
//     res.status(404).send("Not Found");
// });

app.use("/api/user", router);
app.use("/api/blog", blogRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = 3000 || process.env.PORT;



mongoose.set('strictQuery', false);

mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Connected To Database`);
        app.listen(PORT, () => {
            console.log(`Server is listening at PORT ${PORT}`);
        });
    })
    .catch((err) => console.log("MongoDB not connected"));

export { app }; 