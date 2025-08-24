import "dotenv/config";
import express from "express";
import cors from "cors";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { handleGetRecipe } from "./routes/getRecipe.js"; // note the .js extension

const port = process.env.PORT || 7070;

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express app
const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend build
const distPath = path.join(__dirname, "../spa");
app.use(express.static(distPath));

// API routes
app.post("/api/getRecipe", handleGetRecipe);

app.use((_, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});


// Start server
server.listen(port, () => {
  console.log(`🚀 MoodCookbook server running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});