import { useState } from "react";
import { Recipe } from "@shared/api";

interface RecipeCardProps {
  recipe: Recipe;
  onRetry: () => void;
}

export default function RecipeCard({ recipe, onRetry }: RecipeCardProps) {
  const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>(
    new Array(recipe.ingredients.length).fill(false)
  );
  const [showSteps, setShowSteps] = useState(false);
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      {/* Recipe Card */}
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-white/20 dark:border-gray-700/20 transition-colors duration-500">
        {/* Recipe Header with floating elements */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40"></div>
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-48 sm:h-64 md:h-80 object-cover"
          />

          {/* Floating recipe info */}
          <div className="absolute inset-0 flex items-end p-4 sm:p-6 md:p-8">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-white/30 dark:border-gray-700/30 max-w-full sm:max-w-2xl transition-colors duration-500">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-2 sm:w-3 h-2 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Perfect Match Recipe
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-1 sm:mb-2">
                {recipe.name}
              </h2>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                <span className="flex items-center gap-1">
                  <span>🕒</span>
                  <span className="hidden sm:inline">Ready in {Math.floor(Math.random() * 30) + 15} mins</span>
                  <span className="sm:hidden">{Math.floor(Math.random() * 30) + 15}m</span>
                </span>
                <span className="flex items-center gap-1">
                  <span>👥</span>
                  <span className="hidden sm:inline">Serves {Math.floor(Math.random() * 4) + 2}</span>
                  <span className="sm:hidden">{Math.floor(Math.random() * 4) + 2}</span>
                </span>
                <span className="flex items-center gap-1">
                  <span>⭐</span>
                  <span>4.{Math.floor(Math.random() * 9) + 1}/5</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-8 lg:p-10">
          {/* Ingredients Section with Progress */}
          <div className="mb-6 sm:mb-8 md:mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                <span className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white mr-2 sm:mr-3 text-sm sm:text-base">
                  🛒
                </span>
                Shopping List
              </h3>
              <div className="text-left sm:text-right">
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Progress</div>
                <div className="flex items-center gap-2">
                  <div className="w-20 sm:w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500 ease-out"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {checkedCount}/{totalIngredients}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid gap-2 sm:gap-3">
              {recipe.ingredients.map((ingredient, index) => (
                <label
                  key={index}
                  className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600"
                >
                  <div className="relative flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={checkedIngredients[index]}
                      onChange={() => handleIngredientCheck(index)}
                      className="w-5 sm:w-6 h-5 sm:h-6 text-green-600 rounded-md sm:rounded-lg focus:ring-green-500 focus:ring-2"
                    />
                    {checkedIngredients[index] && (
                      <div className="absolute inset-0 flex items-center justify-center text-green-600 pointer-events-none">
                        <svg className="w-3 sm:w-4 h-3 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <span
                    className={`text-sm sm:text-base md:text-lg transition-all duration-300 ${
                      checkedIngredients[index]
                        ? "line-through text-gray-400 dark:text-gray-500"
                        : "text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-gray-100"
                    }`}
                  >
                    {ingredient}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Cooking Steps Section */}
          <div className="mb-6 sm:mb-8 md:mb-10">
            <button
              onClick={() => setShowSteps(!showSteps)}
              className="flex items-center justify-between w-full text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6 hover:text-gray-700 dark:hover:text-gray-300 transition-colors group"
            >
              <span className="flex items-center">
                <span className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white mr-2 sm:mr-3 text-sm sm:text-base">
                  👨‍🍳
                </span>
                <span className="text-sm sm:text-xl md:text-2xl">Cooking Instructions</span>
              </span>
              <div className={`w-7 sm:w-8 h-7 sm:h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 ${showSteps ? 'rotate-180' : ''}`}>
                <svg className="w-3 sm:w-4 h-3 sm:h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {showSteps && (
              <div className="space-y-4 sm:space-y-6 animate-slide-in-from-top-2">
                {recipe.steps.map((step, index) => (
                  <div key={index} className="flex gap-3 sm:gap-4 md:gap-6 group">
                    <div className="flex-shrink-0">
                      <div className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-sm sm:text-base md:text-lg shadow-lg">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1 pt-1 sm:pt-2">
                      <p className="text-sm sm:text-base md:text-lg text-gray-800 dark:text-gray-200 leading-relaxed">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={handleCookThis}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span className="text-lg sm:text-xl">✅</span>
              <span className="text-sm sm:text-base md:text-lg">Let's Cook This!</span>
            </button>

            <button
              onClick={onRetry}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span className="text-lg sm:text-xl">🔄</span>
              <span className="text-sm sm:text-base md:text-lg">Try Another Recipe</span>
            </button>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-700/50 rounded-xl sm:rounded-2xl text-center animate-fade-in shadow-lg">
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🎉</div>
              <h4 className="text-lg sm:text-xl font-bold text-green-800 dark:text-green-300 mb-1 sm:mb-2">Fantastic Choice!</h4>
              <p className="text-sm sm:text-base text-green-700 dark:text-green-400">
                You're all set to create something amazing. Happy cooking, and enjoy every delicious bite!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
