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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", router);
app.use("/api/blog", blogRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT))
  .then(() => console.log(`Connected To Database and listening at PORT ${PORT}`))
  .catch((err) => console.error(err));
