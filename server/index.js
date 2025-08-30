import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
// import mongodbConnection from "./config/connection.js";
import authRoutes from "./routes/auth.js";
import getRecipeRoutes from "./routes/recipe.js";

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const envFile = '.env.production';
dotenv.config({ path: path.resolve(__dirname, `../${envFile}`) });

const port = process.env.PORT || 7000;
const app = express();
const server = http.createServer(app);

// Database Connection
// mongodbConnection();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Frontend Path
const frontendPath = path.join(__dirname, "dist/spa");
app.use(express.static(frontendPath));

app.use('/api/auth/', authRoutes);
app.use("/api/recipe", getRecipeRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Something went wrong');
    }
  });
});

// Start server
server.listen(port, () => {
  console.log(`MoodCookbook server running on port ${port}`);
});
