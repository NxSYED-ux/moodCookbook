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
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Recipe Header */}
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-3xl font-bold text-white drop-shadow-lg">
            {recipe.name}
          </h2>
        </div>
      </div>

      <div className="p-6">
        {/* Ingredients Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">🛒</span>
            Ingredients ({checkedIngredients.filter(Boolean).length}/{recipe.ingredients.length})
          </h3>
          <div className="space-y-3">
            {recipe.ingredients.map((ingredient, index) => (
              <label
                key={index}
                className="flex items-center space-x-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={checkedIngredients[index]}
                  onChange={() => handleIngredientCheck(index)}
                  className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                />
                <span
                  className={`transition-all duration-200 ${
                    checkedIngredients[index]
                      ? "line-through text-gray-400"
                      : "text-gray-700 group-hover:text-gray-900"
                  }`}
                >
                  {ingredient}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Steps Section */}
        <div className="mb-6">
          <button
            onClick={() => setShowSteps(!showSteps)}
            className="flex items-center justify-between w-full text-xl font-semibold text-gray-800 mb-4 hover:text-gray-600 transition-colors"
          >
            <span className="flex items-center">
              <span className="mr-2">👩‍🍳</span>
              Cooking Steps
            </span>
            <span className={`transform transition-transform duration-200 ${showSteps ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          
          {showSteps && (
            <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
              {recipe.steps.map((step, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleCookThis}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <span>✅</span>
            <span>Cook this</span>
          </button>
          
          <button
            onClick={onRetry}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <span>🔄</span>
            <span>Show me another one</span>
          </button>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg text-center animate-in fade-in duration-300">
            <span className="text-lg">🎉</span>
            <span className="ml-2 font-semibold">Happy cooking! Enjoy your meal!</span>
          </div>
        )}
      </div>
    </div>
  );
}
