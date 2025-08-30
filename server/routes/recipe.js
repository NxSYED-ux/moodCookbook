import express from 'express';
import { handleGetRecipe } from "../controllers/recipeController.js";

const router = express.Router();

router.post('/', handleGetRecipe);

export default router;