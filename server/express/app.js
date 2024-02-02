import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import serverless from "serverless-http";
import bodyParser from "body-parser";
import blogRouter from "../routes/blog-routes.js";
import userRouter from "../routes/user-routes.js"; // Assuming you have a userRouter
import cors from "cors";
import { fileURLToPath } from 'url';


dotenv.config();
const app = express();

// Use CORS globally
app.use(cors());

const __filename = fileURLToPath(import.meta.url);  // Convert import.meta.url to a file path
const __dirname = path.dirname(__filename);

const mainRouter = express.Router();
mainRouter.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Hello from Express.js!</h1>');
    res.end();
});
mainRouter.get('/another', (req, res) => res.json({ route: req.originalUrl }));
mainRouter.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use('/.netlify/functions/app', mainRouter);
// app.use('/', (req, res) => res.sendFile(new URL('../index.html', import.meta.url).pathname));
app.use('/', (req, res) => res.sendFile(path.resolve(__dirname, '../index.html')));



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

export const handler = serverless(app); // Use the default export

const PORT = process.env.PORT || 8000;

mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Connected To Database`);
        app.listen(PORT, () => {
            console.log(`Listening at PORT ${PORT}`);
        });
    })
    .catch((err) => console.log("MongoDB not connected"));

app.listen(3000, () => console.log('Local app listening on port 3000!'));



// app.use("/api/user", router);
// app.use("/api/blog", blogRouter);






// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// // Move MongoDB connection outside the handler function
// const connectToDatabase = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 5000,
//     });
//     console.log("Connected To Database");
//   } catch (error) {
//     console.error("MongoDB not connected:", error);
//     throw error;
//   }
// };

// // Connect to MongoDB during server startup
// connectToDatabase();

// export default async function handler(request, response) {
//   try {
//     // Your existing code here

//     if (request.url === "/health") {
//       return response.status(200).json({ status: "OK", message: "Serverless function is healthy" });
//     }

//     if (!request.url) return response.status(400);

//     const url = new URL(request.url, `http://${request.headers.host}`);
//     const { searchParams } = url;
//     const hasTitle = searchParams.has("title");
//     const title = hasTitle ? searchParams.get("title")?.slice(0, 100) : "My default title";

//     return response.status(200).json({ title });
//   } catch (error) {
//     console.error("Error in the serverless function:", error);
//     return response.status(500).json({ error: "Something went wrong!" });
//   }
// }


// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import blogRouter from "./routes/blog-routes.js";
// import userRouter from "./routes/user-routes.js";

// dotenv.config();

// // Move MongoDB connection outside the handler function
// const connectToDatabase = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 5000,
//     });
//     console.log("Connected To Database");
//   } catch (error) {
//     console.error("MongoDB not connected:", error);
//     throw error;
//   }
// };

// // Connect to MongoDB during server startup
// connectToDatabase();

// export default async function handler(request, response) {
//   try {
//     const { pathname } = new URL(request.url, `http://${request.headers.host}`);

//     // Health check endpoint
//     if (pathname === "/api/app/health") {
//       return response.status(200).json({ status: "OK", message: "Serverless function is healthy" });
//     }

//     // Route handling for /api/user
//     if (pathname.startsWith("/api/user")) {
//       return userRouter(request, response);
//     }

//     // Route handling for /api/blog
//     if (pathname.startsWith("/api/blog")) {
//       return blogRouter(request, response);
//     }

//     // Default response for other routes
//     return response.status(404).json({ error: "Route not found" });

//   } catch (error) {
//     console.error("Error in the serverless function:", error);
//     return response.status(500).json({ error: "Something went wrong!" });
//   }
// }
