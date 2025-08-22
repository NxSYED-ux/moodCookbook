import { useState } from "react";
import { Recipe } from "@shared/api";
import MoodSelector from "./MoodSelector";
import RecipeCard from "./RecipeCard";
import Loader from "./Loader";

type AppState = "selecting" | "loading" | "recipe" | "error";

export default function Home() {
  const [state, setState] = useState<AppState>("selecting");
  const [currentMood, setCurrentMood] = useState<string>("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string>("");

  const fetchRecipe = async (mood: string) => {
    setState("loading");
    setCurrentMood(mood);
    setError("");

    try {
      const res = await fetch("/api/getRecipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setRecipe(data);
      setState("recipe");
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setError("Failed to fetch recipe. Please try again!");
      setState("error");
    }
  };

  const handleSelectMood = (mood: string) => {
    fetchRecipe(mood);
  };

  const handleRetry = () => {
    if (currentMood) {
      fetchRecipe(currentMood);
    }
  };

  const handleBackToMoods = () => {
    setState("selecting");
    setCurrentMood("");
    setRecipe(null);
    setError("");
  };

  if (state === "selecting") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 py-12">
        <MoodSelector onSelectMood={handleSelectMood} />
      </div>
    );
  }

  if (state === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <Loader />
          <div className="text-center mt-8">
            <button
              onClick={handleBackToMoods}
              className="text-gray-600 hover:text-gray-800 underline transition-colors"
            >
              ← Back to moods
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 py-12">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-6xl mb-4">😓</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleRetry}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Try Again
              </button>
              <button
                onClick={handleBackToMoods}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Back to Moods
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (state === "recipe" && recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <button
              onClick={handleBackToMoods}
              className="text-gray-600 hover:text-gray-800 underline transition-colors mb-4 inline-block"
            >
              ← Back to moods
            </button>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Perfect for your {currentMood} mood! 🎯
            </h1>
          </div>
          <RecipeCard recipe={recipe} onRetry={handleRetry} />
        </div>
      </div>
    );
  }

  return null;
}
