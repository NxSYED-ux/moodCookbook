import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import he from "he";

// ---------- Groq (LangChain client) ----------
function createGroq() {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("Missing GROQ_API_KEY in environment");
  }
  
  return new ChatOpenAI({
    model: "llama-3.1-8b-instant",
    apiKey: process.env.GROQ_API_KEY,
    configuration: {
      baseURL: "https://api.groq.com/openai/v1",
    },
    temperature: 1,
  });
}

// ---------- Main Handler ----------
export async function handleGetRecipe(req, res) {
  try {
    const { mood } = req.body;
    if (!mood) {
      return res.status(400).json({ error: "Mood is required" });
    }
    
    const recipe = await askGroqForFullRecipe(mood);
    return res.json(recipe);
  } catch (error) {
    console.error("Error getting recipe:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// ---------- Helper (all-in-one recipe generation) ----------
async function askGroqForFullRecipe(mood) {
  const llm = createGroq();
  
  const response = await llm.invoke([
    new SystemMessage(
      `You are a professional chef AI be creative.
      Based on the user's mood, suggest ONE Halal recipe.
      Respond ONLY in JSON with the following fields:
      {
        "name": "Recipe name",
        "image": "A realistic image URL (e.g. from Unsplash, Pexels, or generated)",
        "ingredients": ["list of ingredients with quantities"],
        "steps": ["clear step-by-step cooking instructions"],
        "servings": "number of servings (estimate)",
        "readyInMinutes": "time in minutes (estimate)"
      }`
    ),
    new HumanMessage(`The user is feeling "${mood}". Suggest a recipe.`),
  ]);
  
  const content = response.content;
  if (typeof content !== "string" || !content.trim()) {
    throw new Error("Groq did not return recipe data");
  }
  
  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error("Groq did not return valid JSON");
  }
  
  return {
    name: he.decode(parsed.name || "Untitled"),
    image: parsed.image || "",
    ingredients: parsed.ingredients || [],
    steps: parsed.steps || [],
    servings: parsed.servings || "Unknown",
    readyInMinutes: parsed.readyInMinutes || 0,
  };
}
