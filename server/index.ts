import "dotenv/config";
import express from "express";
import cors from "cors";
import http from "http";
import { handleGetRecipe } from "./routes/getRecipe";

const port = process.env.PORT || 7000;

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post("/api/getRecipe", handleGetRecipe);

server.listen(port, () => {
  console.log(`Listening on port number ${port}`);
});
