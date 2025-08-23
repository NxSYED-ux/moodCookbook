import fetch from "node-fetch";
import { Request, Response } from "express";
import { Recipe, GetRecipeRequest } from "@shared/api";

const GROQ_API_KEY = process.env.VITE_GROQ_API_KEY as string;

export async function handleGetRecipe(req: Request, res: Response): Promise<Response> {
  try {
    const { mood } = req.body as GetRecipeRequest;
    if (!mood) {
      return res.status(400).json({ error: "Mood is required" });
    }

    const triedNames: string[] = [];

    for (let i = 0; i < 3; i++) {
      const recipeName = await askGroqForRecipeName(mood, triedNames);
      triedNames.push(recipeName);

      const match = await searchForkify(recipeName);

      if (match) {
        const details = await getRecipeDetails(match.id);
        const recipeData = details.data.recipe;

        const recipe: Recipe = {
          name: recipeData.title,
          image: recipeData.image_url,
          ingredients: recipeData.ingredients.map(
            (ing: any) =>
              `${ing.quantity || ""} ${ing.unit || ""} ${ing.description}`.trim()
          ),
          steps: await askGroqForSteps(recipeData.title, recipeData.ingredients.map(
            (ing: any) =>
              `${ing.quantity || ""} ${ing.unit || ""} ${ing.description}`.trim()
          )),
          servings: recipeData.servings || "Unknown",
          readyInMinutes: recipeData.cooking_time || 0,
        };

        return res.json(recipe);
      }

      console.log(`Forkify had no match for: ${recipeName}`);
    }

    return res.status(404).json({ error: "No recipes found after 3 attempts" });
  } catch (error) {
    console.error("Error getting recipe:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Helper Functions
async function askGroqForRecipeName(mood: string, exclude: string[] = []): Promise<string> {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `You are a chef AI. Suggest real-world recipe names that likely exist in Forkify dataset.
                    Avoid fantasy names. Return ONLY the recipe name.`,
        },
        {
          role: "user",
          content: `Suggest a recipe for someone feeling "${mood}". 
                    Do not repeat these: ${exclude.join(", ")}`,
        },
      ],
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  if (!data?.choices?.[0]?.message?.content) {
    throw new Error("Groq did not return a recipe name");
  }
  return data.choices[0].message.content.trim();
}

async function askGroqForSteps(title: string, ingredients: string[]): Promise<string[]> {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "You are a professional chef AI. Generate concise cooking instructions as clear step-by-step numbered steps. Return only the steps, no extra commentary."
        },
        {
          role: "user",
          content: `Recipe: ${title}\nIngredients: ${ingredients.join(", ")}\n\nWrite cooking steps.`
        }
      ],
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  if (!data?.choices?.[0]?.message?.content) {
    throw new Error("Groq did not return steps");
  }

  return data.choices[0].message.content
    .split(/\n+/)
    .map((s: string) => s.replace(/^\d+[\).\s-]*/, "").trim())
    .filter((s: string) => s.length > 0);
}

async function searchForkify(recipeName: string): Promise<any | null> {
  const url = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${encodeURIComponent(
    recipeName
  )}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Forkify search failed: ${res.statusText}`);

  const data = await res.json();
  return data.data?.recipes?.[0] || null;
}

async function getRecipeDetails(recipeId: string): Promise<any> {
  const url = `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Forkify detail fetch failed: ${res.statusText}`);
  return res.json();
}