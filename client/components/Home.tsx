import { useState } from "react";
import { Recipe } from "@shared/api";
import MoodSelector from "./MoodSelector";
import RecipeCard from "./RecipeCard";
import Loader from "./Loader";
import ThemeToggle from "./ThemeToggle";
import QuickMoodSelector from "./QuickMoodSelector";

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
        {/* Enhanced animated background */}
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-orange-400/40 to-pink-400/40 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-br from-blue-400/40 to-purple-400/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-gradient-to-br from-green-400/35 to-emerald-400/35 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <ThemeToggle />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          {/* Loading Header */}
          <div className="text-center mb-8">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20 inline-block">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Finding your perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 capitalize">{currentMood}</span> recipe
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI chef is selecting the best match for your mood
              </p>
            </div>
          </div>

          <Loader />

          <div className="text-center mt-8">
            <button
              onClick={handleBackToMoods}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm px-6 py-3 rounded-full transition-all duration-200 hover:bg-white/90 dark:hover:bg-gray-700/90 shadow-lg hover:shadow-xl"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-semibold">Change Mood</span>
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-blue-900/30 dark:to-indigo-900/50 relative overflow-hidden transition-colors duration-500">
        {/* Enhanced animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-green-400/30 to-emerald-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-32 right-32 w-56 h-56 bg-gradient-to-br from-orange-400/30 to-red-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-400/25 to-indigo-400/25 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '6s' }}></div>
        </div>

        <ThemeToggle />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Left: Title and Back Button */}
              <div className="text-center lg:text-left">
                <button
                  onClick={handleBackToMoods}
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm px-4 py-2 rounded-full transition-all duration-200 hover:bg-white/90 dark:hover:bg-gray-700/90 shadow-md mb-4 lg:mb-0"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="text-sm font-medium">All Moods</span>
                </button>

                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20 transition-colors duration-500 inline-block">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                      Perfect Recipe Match
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 capitalize">{currentMood}</span> mood recipe
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                    Carefully curated to match your current feelings
                  </p>
                </div>
              </div>

              {/* Right: Quick Mood Selector */}
              <div className="lg:max-w-md">
                <QuickMoodSelector
                  currentMood={currentMood}
                  onSelectMood={handleSelectMood}
                />
              </div>
            </div>
          </div>

          {/* Recipe Content */}
          <div className="grid gap-8 lg:gap-12">
            <RecipeCard recipe={recipe} onRetry={handleRetry} />

            {/* Additional Actions */}
            <div className="text-center">
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg inline-block">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Love this recipe?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Try exploring other moods for more amazing recipe discoveries
                </p>
                <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    Chef curated
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    AI matched
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                    Mood optimized
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
