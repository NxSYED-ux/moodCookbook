import fetch from "node-fetch";
import he from "he";

export async function handleGetRecipe(req, res) {
  try {
    const { mood } = req.body;
    if (!mood) {
      return res.status(400).json({ error: "Mood is required" });
    }

    const triedNames = [];

    for (let i = 0; i < 3; i++) {
      const recipeName = await askGroqForRecipeName(mood, triedNames);
      triedNames.push(recipeName);

      const match = await searchForkify(recipeName);

      if (match) {
        const details = await getRecipeDetails(match.id);
        const recipeData = details.data.recipe;

        const recipe = {
          name: he.decode(recipeData.title),
          image: recipeData.image_url,
          ingredients: recipeData.ingredients.map(
            (ing) =>
              `${ing.quantity || ""} ${ing.unit || ""} ${ing.description}`.trim()
          ),
          steps: await askGroqForSteps(
            recipeData.title,
            recipeData.ingredients.map(
              (ing) =>
                `${ing.quantity || ""} ${ing.unit || ""} ${ing.description}`.trim()
            )
          ),
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

// ---------- Helper Functions ----------
async function askGroqForRecipeName(mood, exclude = []) {
  const GROQ_API_KEY = process.env.GROQ_API_KEY;
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

async function askGroqForSteps(title, ingredients) {
  const GROQ_API_KEY = process.env.GROQ_API_KEY;
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
          content:
            "You are a professional chef AI. Generate concise cooking instructions as clear step-by-step numbered steps. Return only the steps, no extra commentary.",
        },
        {
          role: "user",
          content: `Recipe: ${title}\nIngredients: ${ingredients.join(", ")}\n\nWrite cooking steps.`,
        },
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
    .map((s) => s.replace(/^\d+[\).\s-]*/, "").trim())
    .filter((s) => s.length > 0);
}

async function searchForkify(recipeName) {
  const url = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${encodeURIComponent(
    recipeName
  )}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Forkify search failed: ${res.statusText}`);

  const data = await res.json();
  return data.data?.recipes?.[0] || null;
}

async function getRecipeDetails(recipeId) {
  const url = `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Forkify detail fetch failed: ${res.statusText}`);
  return res.json();
}