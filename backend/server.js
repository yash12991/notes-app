import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";

dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI); // Add this line to check the MONGO_URI
console.log("PORT:", process.env.PORT); // Add this line to check the PORT

import route from "./routes/Route.js";
const app = express();
app.use(express.json());

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:3000',  'https://notes-app-syxd.onrender.com'],
        credentials: true,
    }
});



// app.use(cors({ origin: "http://localhost:3000" }));
const corsOptions = {
    origin: ['http://localhost:3000',  'https://notes-app-syxd.onrender.com'],
    credentials: true,
};
app.use(cors(corsOptions));


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => console.log("connected to mongodb"));

app.use("/api/notes", route);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
