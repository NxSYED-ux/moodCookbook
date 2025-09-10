import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Recipe } from "@shared/api";
import RecipeCard from "../components/RecipeCard";
import Loader from "../components/Loader";
import ThemeToggle from "../components/ThemeToggle";
import QuickMoodSelector from "../components/QuickMoodSelector";

type ResultsState = "loading" | "recipe" | "error";

export default function Results() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [state, setState] = useState<ResultsState>("loading");
  const [currentMood, setCurrentMood] = useState<string>("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string>("");

  // Get initial data from location state or URL params
  useEffect(() => {
    const moodFromUrl = searchParams.get("mood");

    if (moodFromUrl) {
      setCurrentMood(moodFromUrl);
      fetchRecipe(moodFromUrl);
    } else {
      navigate("/", { replace: true });
    }
  }, [searchParams, navigate]);

  const fetchRecipe = async (mood: string) => {
    setState("loading");
    setError("");

    try {
      const requestBody = { mood };

      const res = await fetch("/api/recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) {
        try {
          const errorData = await res.json();
          console.error("Server error response:", errorData);
          throw new Error(
            `HTTP error! status: ${res.status}, message: ${errorData.error || "Unknown error"}`,
          );
        } catch (parseError) {
          console.error("Failed to parse error response:", parseError);
          throw new Error(`HTTP error! status: ${res.status}`);
        }
      }

      const data = await res.json();
      setRecipe(data);
      setState("recipe");

    } catch (error) {
      console.error("Error fetching recipe:", error);
      setError(
        `Failed to fetch recipe: ${error instanceof Error ? error.message : "Unknown error"}. Please try again!`,
      );
      setState("error");
    }
  };

  const handleSelectMood = (mood: string) => {
    setCurrentMood(mood);
    fetchRecipe(mood);
  };

  const handleRetry = () => {
    if (currentMood) {
      fetchRecipe(currentMood);
    }
  };

  const handleBackToMoods = () => {
    navigate("/");
  };

  if (state === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-blue-900/30 dark:to-indigo-900/50 relative overflow-hidden py-8 sm:py-12">

        {/* Enhanced animated background */}
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-br from-orange-400/40 to-pink-400/40 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute top-3/4 right-1/4 w-32 sm:w-48 h-32 sm:h-48 bg-gradient-to-br from-blue-400/40 to-purple-400/40 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/3 w-24 sm:w-36 h-24 sm:h-36 bg-gradient-to-br from-green-400/35 to-emerald-400/35 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <ThemeToggle className="absolute top-4 right-4 z-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          {/* Loading Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-xl border border-white/20 dark:border-gray-700/20 inline-block">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Finding your perfect{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 capitalize">
                  {currentMood}
                </span>{" "}
                recipe
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                Our AI chef is selecting the best match for your mood
              </p>
            </div>
          </div>

          <Loader />
        </div>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="grid place-items-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-blue-900/30 dark:to-indigo-900/50 relative overflow-hidden py-8 sm:py-12">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/3 left-1/3 w-40 sm:w-56 h-40 sm:h-56 bg-gradient-to-br from-red-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/3 right-1/3 w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-br from-yellow-400/25 to-red-400/25 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <ThemeToggle className="absolute top-4 right-4 z-20" />
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 border border-white/20 dark:border-gray-700/20">
            {/* Error Animation */}
            <div className="mb-6 sm:mb-8">
              <div className="text-5xl sm:text-6xl md:text-8xl mb-4 animate-bounce">😓</div>
              <div className="flex justify-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>

            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Oops! Kitchen Error
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6">
                {error}
              </p>
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-xl p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-red-700 dark:text-red-300">
                  Don't worry! Our AI chef is usually very reliable. This might
                  just be a temporary hiccup.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <button
                onClick={handleRetry}
                className="group relative overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 hover:from-orange-600 hover:via-red-600 hover:to-orange-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-xl text-sm sm:text-base"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="relative flex items-center justify-center gap-2">
                  <span className="text-lg">🔄</span>
                  <span>Try Again</span>
                </div>
              </button>

              <button
                onClick={handleBackToMoods}
                className="group relative overflow-hidden bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 hover:from-gray-600 hover:via-gray-700 hover:to-gray-800 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-xl text-sm sm:text-base"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="relative flex items-center justify-center gap-2">
                  <span className="text-lg">🏠</span>
                  <span>Change Mood</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (state === "recipe" && recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        {/*<ThemeToggle className="absolute top-4 right-4 z-20" />*/}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Modern Clean Header */}
          <div className="mb-8 sm:mb-12">

            {/* Title Section */}
            <div className="text-center mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                Perfect Match Found
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 tracking-tight">
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent capitalize">
                  {currentMood}
                </span>{" "}
                <span className="text-gray-700 dark:text-gray-300">Recipe</span>
              </h1>

              <p className="text-sm sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Carefully curated to match your current mood
              </p>
            </div>

            {/* Mood Selector */}
            <QuickMoodSelector
              currentMood={currentMood}
              onSelectMood={handleSelectMood}
            />
          </div>

          {/* Recipe Content */}
          <RecipeCard recipe={recipe} onRetry={handleRetry} />

          {/* Footer CTA */}
          <div className="text-center mt-12 sm:mt-16 mb-6 sm:mb-8">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                Loving this recipe?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
                Explore other moods for more personalized recipe discoveries
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1 sm:gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
                  Chef Curated
                </span>
                <span className="flex items-center gap-1 sm:gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full"></div>
                  AI Matched
                </span>
                <span className="flex items-center gap-1 sm:gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full"></div>
                  Mood Optimized
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}