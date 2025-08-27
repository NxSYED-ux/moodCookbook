import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { handleGetRecipe } from "./routes/getRecipe.js";

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from base folder
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Now read port from env
const port = process.env.PORT || 7000;

// Express app
const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.post("/api/getRecipe", handleGetRecipe);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Start server
server.listen(port, () => {
  console.log(`MoodCookbook server running on port ${port}`);
});
