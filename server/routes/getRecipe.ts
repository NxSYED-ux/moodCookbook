import { RequestHandler } from "express";
import { Recipe, GetRecipeRequest } from "@shared/api";

// Sample recipes for each mood
const recipes = {
  lazy: [
    {
      name: "5-Minute Microwave Mac & Cheese",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400",
      ingredients: [
        "1 cup elbow macaroni",
        "1/4 cup milk",
        "1/2 cup shredded cheese",
        "Salt and pepper to taste"
      ],
      steps: [
        "Put macaroni in microwave-safe bowl with water",
        "Microwave for 2-3 minutes until tender",
        "Drain water, add milk and cheese",
        "Microwave for 30 more seconds, stir and enjoy!"
      ]
    },
    {
      name: "No-Cook Avocado Toast",
      image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400",
      ingredients: [
        "2 slices bread",
        "1 ripe avocado",
        "Salt and pepper",
        "Lemon juice",
        "Optional: cherry tomatoes"
      ],
      steps: [
        "Toast the bread",
        "Mash avocado with salt, pepper, and lemon juice",
        "Spread on toast",
        "Add tomatoes if desired"
      ]
    }
  ],
  romantic: [
    {
      name: "Chocolate Strawberry Fondue",
      image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400",
      ingredients: [
        "8 oz dark chocolate",
        "1/2 cup heavy cream",
        "1 lb fresh strawberries",
        "Vanilla extract",
        "Champagne (optional)"
      ],
      steps: [
        "Melt chocolate with cream in double boiler",
        "Add vanilla extract",
        "Wash and dry strawberries",
        "Dip strawberries in chocolate",
        "Serve with champagne"
      ]
    },
    {
      name: "Candlelit Pasta Carbonara",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400",
      ingredients: [
        "8 oz spaghetti",
        "4 egg yolks",
        "1/2 cup parmesan cheese",
        "4 slices pancetta",
        "Black pepper",
        "Salt"
      ],
      steps: [
        "Cook pasta according to package directions",
        "Crisp pancetta in pan",
        "Whisk eggs and cheese together",
        "Toss hot pasta with egg mixture",
        "Add pancetta and serve immediately"
      ]
    }
  ],
  stressed: [
    {
      name: "Calming Chamomile Tea Cookies",
      image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400",
      ingredients: [
        "2 cups flour",
        "1/2 cup butter",
        "1/4 cup honey",
        "2 tbsp chamomile tea (ground)",
        "1 egg",
        "Vanilla extract"
      ],
      steps: [
        "Preheat oven to 350°F",
        "Mix dry ingredients",
        "Cream butter and honey",
        "Combine all ingredients",
        "Bake for 12-15 minutes until golden"
      ]
    },
    {
      name: "Comfort Chicken Soup",
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400",
      ingredients: [
        "2 cups chicken broth",
        "1 cup cooked chicken",
        "1/2 cup noodles",
        "1 carrot, diced",
        "1 celery stalk, diced",
        "Salt and herbs"
      ],
      steps: [
        "Heat broth in pot",
        "Add vegetables and simmer 10 minutes",
        "Add noodles and cook until tender",
        "Stir in chicken and season",
        "Serve hot with crackers"
      ]
    }
  ],
  excited: [
    {
      name: "Rainbow Veggie Buddha Bowl",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
      ingredients: [
        "1 cup quinoa",
        "Mixed colorful vegetables",
        "Chickpeas",
        "Avocado",
        "Tahini dressing",
        "Pumpkin seeds"
      ],
      steps: [
        "Cook quinoa according to package",
        "Roast vegetables at 400°F for 20 minutes",
        "Arrange quinoa, veggies, and chickpeas in bowl",
        "Top with avocado and seeds",
        "Drizzle with tahini dressing"
      ]
    },
    {
      name: "Energy-Boosting Smoothie Bowl",
      image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400",
      ingredients: [
        "1 frozen banana",
        "1/2 cup berries",
        "1/4 cup oats",
        "1 tbsp chia seeds",
        "Coconut flakes",
        "Honey"
      ],
      steps: [
        "Blend frozen fruits until thick",
        "Pour into bowl",
        "Top with oats, chia seeds, and coconut",
        "Drizzle with honey",
        "Take a photo before eating!"
      ]
    }
  ],
  party: [
    {
      name: "Loaded Nacho Platter",
      image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400",
      ingredients: [
        "Tortilla chips",
        "2 cups shredded cheese",
        "1 can black beans",
        "Jalapeños",
        "Sour cream",
        "Guacamole",
        "Salsa"
      ],
      steps: [
        "Preheat oven to 400°F",
        "Layer chips on large baking sheet",
        "Sprinkle cheese and beans over chips",
        "Bake 10-12 minutes until cheese melts",
        "Top with jalapeños, sour cream, and guacamole"
      ]
    },
    {
      name: "Mini Slider Station",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
      ingredients: [
        "12 mini burger buns",
        "1 lb ground beef",
        "Cheese slices",
        "Lettuce",
        "Tomatoes",
        "Condiments"
      ],
      steps: [
        "Form beef into 12 small patties",
        "Grill or pan-fry patties 3-4 minutes per side",
        "Toast buns lightly",
        "Set up assembly station with toppings",
        "Let guests build their own sliders"
      ]
    }
  ]
};

export const handleGetRecipe: RequestHandler = (req, res) => {
  try {
    const { mood } = req.body as GetRecipeRequest;
    
    if (!mood) {
      return res.status(400).json({ error: "Mood is required" });
    }

    const moodLower = mood.toLowerCase();
    const moodRecipes = recipes[moodLower as keyof typeof recipes];
    
    if (!moodRecipes) {
      return res.status(400).json({ error: "Invalid mood" });
    }

    // Return a random recipe for the selected mood
    const randomIndex = Math.floor(Math.random() * moodRecipes.length);
    const recipe: Recipe = moodRecipes[randomIndex];

    res.json(recipe);
  } catch (error) {
    console.error("Error getting recipe:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
