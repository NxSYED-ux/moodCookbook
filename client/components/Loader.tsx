export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] sm:min-h-[60vh] space-y-6 sm:space-y-8 px-4">
      <div className="relative">
        {/* Main cooking pot with enhanced design */}
        <div className="relative">
          <div className="w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-b from-gray-600 via-gray-700 to-gray-800 dark:from-gray-500 dark:via-gray-600 dark:to-gray-700 rounded-b-2xl sm:rounded-b-3xl relative shadow-2xl">
            {/* Pot rim */}
            <div className="absolute -top-1 left-0 right-0 h-2 bg-gradient-to-r from-gray-500 to-gray-600 rounded-t-lg shadow-inner"></div>

            {/* Enhanced steam animation */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="w-2 h-12 bg-gradient-to-t from-white/60 to-transparent rounded-full animate-pulse"></div>
            </div>
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 -ml-3">
              <div className="w-1.5 h-10 bg-gradient-to-t from-white/40 to-transparent rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
            </div>
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 ml-3">
              <div className="w-1.5 h-10 bg-gradient-to-t from-white/40 to-transparent rounded-full animate-pulse" style={{ animationDelay: '600ms' }}></div>
            </div>
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 -ml-1">
              <div className="w-1 h-8 bg-gradient-to-t from-white/30 to-transparent rounded-full animate-pulse" style={{ animationDelay: '900ms' }}></div>
            </div>

            {/* Animated cooking contents */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-6 bg-gradient-to-r from-orange-400/60 to-red-400/60 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Spinning spoon with enhanced design */}
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-2 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full animate-spin origin-center shadow-lg"></div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-4 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-full shadow-sm"></div>
            </div>

            {/* Pot handles with enhanced design */}
            <div className="absolute top-6 -left-3 w-4 h-3 bg-gradient-to-l from-gray-600 to-gray-700 rounded-l-full shadow-lg"></div>
            <div className="absolute top-6 -right-3 w-4 h-3 bg-gradient-to-r from-gray-600 to-gray-700 rounded-r-full shadow-lg"></div>

            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent rounded-b-3xl"></div>
          </div>

          {/* Floating ingredients */}
          <div className="absolute -top-8 -left-8 text-2xl animate-bounce" style={{ animationDelay: '2s' }}>🥕</div>
          <div className="absolute -top-6 -right-8 text-2xl animate-bounce" style={{ animationDelay: '2.5s' }}>🧅</div>
          <div className="absolute -bottom-2 -left-6 text-xl animate-bounce" style={{ animationDelay: '3s' }}>🌿</div>
          <div className="absolute -bottom-2 -right-6 text-xl animate-bounce" style={{ animationDelay: '3.5s' }}>🧄</div>
        </div>
      </div>

      <div className="text-center max-w-md">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Cooking up ideas<span className="animate-pulse">...</span>
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Our AI chef is carefully selecting the perfect recipe to match your mood
          </p>
          <div className="flex justify-center items-center space-x-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
