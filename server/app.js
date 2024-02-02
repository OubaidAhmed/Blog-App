// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import blogRouter from "./routes/blog-routes.js";
// import router from "./routes/user-routes.js";
// import cors from "cors";

// dotenv.config();
// const app = express();

// // Use CORS globally
// app.use(cors());


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use("/api/user", router);
// app.use("/api/blog", blogRouter);

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// // Health check endpoint
// app.get("/health", (req, res) => {
//   res.status(200).json({ status: "OK", message: "Backend is healthy" });
// });


// // Global error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something went wrong!');
// });

// const PORT = process.env.PORT || 8000;

// mongoose
//   .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log(`Connected To Database`);
//     app.listen(PORT, () => {
//       console.log(`Listening at PORT ${PORT}`);
//     });
//   })
//   .catch((err) => console.log("MongoBD not connected"));


import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function handler(request, response) {
  // Replace this with your MongoDB connection logic
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected To Database");
  } catch (error) {
    console.error("MongoDB not connected:", error);
    return response.status(500).json({ error: "MongoDB not connected" });
  }

  // Your existing Express.js route logic can be adapted here
  if (request.url === "/health") {
    return response.status(200).json({ status: "OK", message: "Serverless function is healthy" });
  }

  if (!request.url) return response.status(400);

  const url = new URL(request.url, `http://${request.headers.host}`);
  const { searchParams } = url;
  const hasTitle = searchParams.has("title");
  const title = hasTitle ? searchParams.get("title")?.slice(0, 100) : "My default title";

  return response.status(200).json({ title });
}
