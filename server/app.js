// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import blogRouter from "./routes/blog-routes.js";
// import router from "./routes/user-routes.js";
// import cors from "cors";
// import path from "path";
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// mongoose.set('strictQuery', false);

// mongoose
//     .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log(`Connected To Database`);

//         app.get("/", (req, res) => {
//             app.use(express.static(path.resolve(__dirname, "client", "build")));
//             res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//         });

//         app.use("/api/user", router);
//         app.use("/api/blog", blogRouter);

//         app.use(express.static(path.resolve(__dirname, "client", "build")));

//         app.use((err, req, res, next) => {
//             console.error(err.stack);
//             res.status(500).send('Something went wrong!');
//         });

//         const PORT = process.env.PORT || 3000;
//         app.listen(PORT, () => {
//             console.log(`Server is listening at PORT ${PORT}`);
//         });
//     })
//     .catch((err) => console.log("MongoDB not connected"));

// export default app;

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

mongoose.set('strictQuery', false);

mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Connected To Database`);
    })
    .catch((err) => console.log("MongoDB not connected"));

// Define routes
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

// Serve static files
app.use(express.static(path.resolve(__dirname, "client", "build")));

// Catch-all route for React frontend
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// 404 error handling middleware
app.use((req, res) => {
    res.status(404).send("Page not found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening at PORT ${PORT}`);
});

export default app;
