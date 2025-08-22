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

  const cookingTime = Math.floor(Math.random() * 30) + 15;
  const servings = Math.floor(Math.random() * 4) + 2;
  const rating = 4 + Math.floor(Math.random() * 9) / 10;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Main Recipe Container */}
      <div className="relative">
        {/* Decorative background elements */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-orange-200/30 to-red-200/30 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-xl"></div>

        {/* Recipe Card */}
        <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 dark:border-gray-700/40 overflow-hidden">
          {/* Desktop Two-Column Layout */}
          <div className="lg:grid lg:grid-cols-5 lg:gap-0">
            {/* Left Column - Hero Image & Title (3/5 width) */}
            <div className="lg:col-span-3 relative">
              {/* Image Container */}
              <div className="relative h-64 sm:h-80 lg:h-[600px] xl:h-[700px] overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-full object-cover"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20"></div>

                {/* Floating Recipe Info */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-10">
                  {/* Badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      <span className="text-white text-sm font-semibold tracking-wide">
                        Chef's Special
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-orange-200/30">
                      <span className="text-white text-sm">🔥</span>
                      <span className="text-white text-sm font-semibold">
                        Trending
                      </span>
                    </div>
                  </div>

                  {/* Recipe Title */}
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
                    {recipe.name}
                  </h1>

                  {/* Recipe Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                      <div className="text-center">
                        <div className="text-2xl mb-1">⏱️</div>
                        <div className="text-white text-sm font-semibold">
                          {cookingTime} min
                        </div>
                        <div className="text-white/70 text-xs">Cook Time</div>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                      <div className="text-center">
                        <div className="text-2xl mb-1">👥</div>
                        <div className="text-white text-sm font-semibold">
                          {servings} people
                        </div>
                        <div className="text-white/70 text-xs">Servings</div>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                      <div className="text-center">
                        <div className="text-2xl mb-1">⭐</div>
                        <div className="text-white text-sm font-semibold">
                          {rating.toFixed(1)}
                        </div>
                        <div className="text-white/70 text-xs">Rating</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleCookThis}
                      className="group relative flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-2xl"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div>
                      <div className="relative flex items-center justify-center gap-3">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-xl">👨‍🍳</span>
                        </div>
                        <div>
                          <div className="text-lg font-bold">Start Cooking</div>
                          <div className="text-xs opacity-90">
                            Let's make this!
                          </div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={onRetry}
                      className="group relative flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-white/30 hover:border-white/50"
                    >
                      <div className="relative flex items-center justify-center gap-3">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-xl">🔄</span>
                        </div>
                        <div>
                          <div className="text-lg font-bold">Try Another</div>
                          <div className="text-xs opacity-90">
                            New suggestion
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Ingredients & Instructions (2/5 width) */}
            <div className="lg:col-span-2 p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50">
              {/* Shopping List Section */}
              <div className="mb-10">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-white text-xl">🛒</span>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Shopping List
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Check off as you collect
                      </p>
                    </div>
                  </div>

                  {/* Progress Circle */}
                  <div className="relative w-16 h-16">
                    <svg
                      className="w-16 h-16 transform -rotate-90"
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
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                        {Math.round(progress)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ingredients List */}
                <div className="space-y-3 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                  {recipe.ingredients.map((ingredient, index) => (
                    <label
                      key={index}
                      className="group flex items-center gap-4 p-4 rounded-xl hover:bg-white/80 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={checkedIngredients[index]}
                          onChange={() => handleIngredientCheck(index)}
                          className="w-6 h-6 text-emerald-600 rounded-lg focus:ring-emerald-500 focus:ring-2 border-2 border-gray-300 dark:border-gray-600"
                        />
                        {checkedIngredients[index] && (
                          <div className="absolute inset-0 flex items-center justify-center text-emerald-600 pointer-events-none">
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <span
                        className={`flex-1 text-base transition-all duration-300 ${
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

              {/* Cooking Instructions Section */}
              <div>
                <button
                  onClick={() => setShowSteps(!showSteps)}
                  className="group flex items-center justify-between w-full mb-6 hover:bg-white/50 dark:hover:bg-gray-700/30 rounded-xl p-4 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-white text-xl">👨‍🍳</span>
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Cooking Steps
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Step-by-step instructions
                      </p>
                    </div>
                  </div>
                  <div
                    className={`w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 ${
                      showSteps ? "rotate-180" : ""
                    }`}
                  >
                    <svg
                      className="w-5 h-5 text-gray-600 dark:text-gray-300"
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
                  </div>
                </button>

                {showSteps && (
                  <div className="space-y-6 animate-slide-in-from-top-2 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                    {recipe.steps.map((step, index) => (
                      <div key={index} className="flex gap-4 group">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-xl flex items-center justify-center font-bold shadow-lg">
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1 pt-2">
                          <p className="text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                            {step}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Success Message */}
              {showSuccess && (
                <div className="mt-8 p-6 bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 border border-emerald-200 dark:border-emerald-700/50 rounded-2xl text-center animate-fade-in shadow-lg">
                  <div className="text-4xl mb-3">🎉</div>
                  <h4 className="text-xl font-bold text-emerald-800 dark:text-emerald-300 mb-2">
                    Perfect Choice!
                  </h4>
                  <p className="text-emerald-700 dark:text-emerald-400">
                    You're all set to create something amazing. Happy cooking!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
