import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import blogRouter from "./routes/blog-routes.js";
import router from "./routes/user-routes.js";
import cors from "cors";

dotenv.config();
const app = express();


app.use(cors({
  origin: 'https://my-blog-app-rust.vercel.app/',
  methods: ['GET', 'POST'],

}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", router);
app.use("/api/blog", blogRouter);

app.get('/', (req, res) => res.send('Hello World!'))

const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => app.listen(PORT))
  .then(() =>
    console.log(`Connected To Database and listening at PORT ${PORT}`)
  )
  .catch((err) => console.log(err));


// Import required modules
// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// // Load environment variables from a .env file
// dotenv.config();

// // Create an Express app
// const app = express();

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });


// app.get('/api/hello', (req, res) => res.send('Hello World!'))

// // Start the server
// const PORT = process.env.PORT || 8000;
// app.listen(8000, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
