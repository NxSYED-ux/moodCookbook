import { useState } from "react";
import { Recipe } from "@shared/api";
import MoodSelector from "./MoodSelector";
import RecipeCard from "./RecipeCard";
import Loader from "./Loader";
import ThemeToggle from "./ThemeToggle";

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-blue-900/30 dark:to-indigo-900/50 relative overflow-hidden transition-colors duration-500">
        {/* Dynamic background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.1),transparent_70%)] dark:bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.2),transparent_70%)]"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(255,154,0,0.1),transparent_70%)] dark:bg-[radial-gradient(circle_at_80%_20%,rgba(255,154,0,0.2),transparent_70%)]"></div>
          <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_40%_90%,rgba(34,197,94,0.1),transparent_70%)] dark:bg-[radial-gradient(circle_at_40%_90%,rgba(34,197,94,0.2),transparent_70%)]"></div>
        </div>
        <ThemeToggle />
        <MoodSelector onSelectMood={handleSelectMood} />
      </div>
    );
  }

  if (state === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-blue-900/30 dark:to-indigo-900/50 relative overflow-hidden py-12 transition-colors duration-500">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-orange-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <ThemeToggle />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <Loader />
          <div className="text-center mt-8">
            <button
              onClick={handleBackToMoods}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full transition-all duration-200 hover:bg-white dark:hover:bg-gray-700 shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to moods
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-blue-900/30 dark:to-indigo-900/50 relative overflow-hidden py-12 transition-colors duration-500">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/3 left-1/3 w-56 h-56 bg-gradient-to-br from-red-400/30 to-orange-400/30 rounded-full blur-3xl"></div>
        </div>

        <ThemeToggle />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20 dark:border-gray-700/20 transition-colors duration-500">
            <div className="text-8xl mb-6 animate-bounce">😓</div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">{error}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleRetry}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Try Again
              </button>
              <button
                onClick={handleBackToMoods}
                className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-blue-900/30 dark:to-indigo-900/50 relative overflow-hidden py-12 transition-colors duration-500">
        {/* Subtle animated background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-32 right-32 w-56 h-56 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <ThemeToggle />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <button
              onClick={handleBackToMoods}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-6 py-3 rounded-full transition-all duration-200 hover:bg-white dark:hover:bg-gray-700 shadow-lg mb-6"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-semibold">Back to moods</span>
            </button>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg inline-block transition-colors duration-500">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Perfect match for your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 capitalize">{currentMood}</span> mood!
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                This recipe has been specially selected to complement how you're feeling right now
              </p>
            </div>
          </div>
          <RecipeCard recipe={recipe} onRetry={handleRetry} />
        </div>
      </div>
    );
  }

  return null;
}
