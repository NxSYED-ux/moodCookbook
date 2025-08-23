import { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Recipe } from "@shared/api";
import RecipeCard from "../components/RecipeCard";
import Loader from "../components/Loader";
import ThemeToggle from "../components/ThemeToggle";
import QuickMoodSelector from "../components/QuickMoodSelector";

type ResultsState = "loading" | "recipe" | "error";

interface LocationState {
  mood?: string;
  recipe?: Recipe;
}

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [state, setState] = useState<ResultsState>("loading");
  const [currentMood, setCurrentMood] = useState<string>("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string>("");

  // Get initial data from location state or URL params
  useEffect(() => {
    const locationState = location.state as LocationState;
    const moodFromUrl = searchParams.get("mood");

    if (locationState?.recipe && locationState?.mood) {
      // Recipe data passed via navigation state
      setCurrentMood(locationState.mood);
      setRecipe(locationState.recipe);
      setState("recipe");
    } else if (moodFromUrl) {
      // Mood passed via URL parameter, fetch recipe
      setCurrentMood(moodFromUrl);
      fetchRecipe(moodFromUrl);
    } else {
      // No valid data, redirect to home
      navigate("/", { replace: true });
    }
  }, [location.state, searchParams, navigate]);

  const fetchRecipe = async (mood: string) => {
    setState("loading");
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

      // Update URL to include the mood parameter
      const newSearchParams = new URLSearchParams();
      newSearchParams.set("mood", mood);
      navigate(`/results?${newSearchParams.toString()}`, { replace: true });
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setError("Failed to fetch recipe. Please try again!");
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-blue-900/30 dark:to-indigo-900/50 relative overflow-hidden py-12 transition-colors duration-500">
        {/* Enhanced animated background */}
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-orange-400/40 to-pink-400/40 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-br from-blue-400/40 to-purple-400/40 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-gradient-to-br from-green-400/35 to-emerald-400/35 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <ThemeToggle />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          {/* Loading Header */}
          <div className="text-center mb-8">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20 inline-block">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Finding your perfect{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 capitalize">
                  {currentMood}
                </span>{" "}
                recipe
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
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
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
      <div className="grid place-items-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-blue-900/30 dark:to-indigo-900/50 relative overflow-hidden py-12 transition-colors duration-500">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/3 left-1/3 w-56 h-56 bg-gradient-to-br from-red-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-gradient-to-br from-yellow-400/25 to-red-400/25 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <ThemeToggle />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-12 border border-white/20 dark:border-gray-700/20 transition-colors duration-500">
            {/* Error Animation */}
            <div className="mb-8">
              <div className="text-6xl sm:text-8xl mb-4 animate-bounce">😓</div>
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

            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Oops! Kitchen Error
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6">
                {error}
              </p>
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-xl p-4">
                <p className="text-sm text-red-700 dark:text-red-300">
                  Don't worry! Our AI chef is usually very reliable. This might
                  just be a temporary hiccup.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={handleRetry}
                className="group relative overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 hover:from-orange-600 hover:via-red-600 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="relative flex items-center justify-center gap-2">
                  <span className="text-lg">🔄</span>
                  <span>Try Again</span>
                </div>
              </button>

              <button
                onClick={handleBackToMoods}
                className="group relative overflow-hidden bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 hover:from-gray-600 hover:via-gray-700 hover:to-gray-800 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-xl"
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-blue-900/30 dark:to-indigo-900/50 relative overflow-hidden transition-colors duration-500">
        {/* Enhanced animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-green-400/30 to-emerald-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-32 right-32 w-56 h-56 bg-gradient-to-br from-orange-400/30 to-red-400/30 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "4s" }}
          ></div>
          <div
            className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-400/25 to-indigo-400/25 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "6s" }}
          ></div>
        </div>

        <ThemeToggle />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Header Section - Full Width */}
          <div className="mb-8">
            {/* Combined Back Button and Perfect Recipe Match - Full Width */}
            <div className="w-full mb-6">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20 transition-colors duration-500">
                {/* Back Button */}
                <button
                  onClick={handleBackToMoods}
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm px-4 py-2 rounded-full transition-all duration-200 hover:bg-white/90 dark:hover:bg-gray-700/90 shadow-md mb-4"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  <span className="text-sm font-medium">All Moods</span>
                </button>

                {/* Perfect Recipe Match - Full Width */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                      Perfect Recipe Match
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Your{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 capitalize">
                      {currentMood}
                    </span>{" "}
                    mood recipe
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                    Carefully curated to match your current feelings
                  </p>
                </div>
              </div>
            </div>

            {/* Change Your Mood Section - Below Header */}
            <div className="w-full">
              <QuickMoodSelector
                currentMood={currentMood}
                onSelectMood={handleSelectMood}
              />
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
