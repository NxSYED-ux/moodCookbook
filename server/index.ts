import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleGetRecipe } from "./routes/getRecipe";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.post("/api/getRecipe", handleGetRecipe);

  return app;
}
