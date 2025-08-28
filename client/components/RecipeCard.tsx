import { useState } from "react";
import { Recipe } from "@shared/api";

interface RecipeCardProps {
  recipe: Recipe;
  onRetry: () => void;
}

export default function RecipeCard({ recipe, onRetry }: RecipeCardProps) {
  const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>(
    new Array(recipe.ingredients.length).fill(false),
  );
  const [showSteps, setShowSteps] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleIngredientCheck = (index: number) => {
    const newChecked = [...checkedIngredients];
    newChecked[index] = !newChecked[index];
    setCheckedIngredients(newChecked);
  };

  const handleCookThis = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  const checkedCount = checkedIngredients.filter(Boolean).length;
  const totalIngredients = recipe.ingredients.length;
  const progress = (checkedCount / totalIngredients) * 100;

  return (
    <div className="max-w-7xl mx-auto sm:px-6">
      {/* Hero Section */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6 sm:mb-8">
        <div className="relative">
          {/* Hero Image */}
          <div className="h-48 sm:h-64 md:h-80 lg:h-96 relative overflow-hidden">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

            {/* Recipe Title Overlay */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
              <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 leading-tight line-clamp-2">
                {recipe.name}
              </h2>

              {/* Recipe Stats */}
              <div className="flex items-center gap-4 sm:gap-6 text-white">
                <div className="flex items-center gap-1 sm:gap-2">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-xs sm:text-sm font-medium">
                    {recipe.readyInMinutes ?? 0} min
                  </span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  <span className="text-xs sm:text-sm font-medium">
                    {recipe.servings ?? 'Unknown'} servings
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex gap-2 sm:gap-3">
            <button
              onClick={onRetry}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all duration-200 hover:scale-110"
              title="Try another recipe"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
            <button
              onClick={handleCookThis}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 shadow-lg text-sm sm:text-base"
            >
              Start Cooking
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Shopping List */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                Shopping List
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                {checkedCount} of {totalIngredients} items collected
              </p>
            </div>

            {/* Progress Circle */}
            <div className="relative w-12 h-12 sm:w-16 sm:h-16">
              <svg
                className="w-12 h-12 sm:w-16 sm:h-16 transform -rotate-90"
                viewBox="0 0 36 36"
              >
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-gray-200 dark:text-gray-700"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray={`${progress}, 100`}
                  className="text-emerald-500 transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3 max-h-64 sm:max-h-80 overflow-y-auto">
            {recipe.ingredients.map((ingredient, index) => (
              <label
                key={index}
                className="group flex items-center gap-3 p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={checkedIngredients[index]}
                  onChange={() => handleIngredientCheck(index)}
                  className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 rounded border-2 border-gray-300 dark:border-gray-600 focus:ring-emerald-500 focus:ring-2"
                />
                <span
                  className={`flex-1 transition-all duration-300 text-sm sm:text-base ${
                    checkedIngredients[index]
                      ? "line-through text-gray-400 dark:text-gray-500"
                      : "text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {ingredient}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Cooking Steps */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                Cooking Steps
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                Follow these {recipe.steps.length} simple steps
              </p>
            </div>

            <button
              onClick={() => setShowSteps(!showSteps)}
              className={`p-2 rounded-full transition-all duration-200 ${
                showSteps
                  ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}
            >
              <svg
                className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${showSteps ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {showSteps && (
            <div className="space-y-3 sm:space-y-4 max-h-64 sm:max-h-80 overflow-y-auto">
              {recipe.steps.map((step, index) => (
                <div key={index} className="flex gap-3 sm:gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1 pt-0.5 sm:pt-1">
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-sm sm:text-base">
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-700/50 rounded-2xl text-center animate-fade-in">
          <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🎉</div>
          <h4 className="text-lg sm:text-xl font-bold text-emerald-800 dark:text-emerald-300 mb-1 sm:mb-2">
            Perfect Choice!
          </h4>
          <p className="text-emerald-700 dark:text-emerald-400 text-sm sm:text-base">
            You're all set to create something amazing. Happy cooking!
          </p>
        </div>
      )}
    </div>
  );
}