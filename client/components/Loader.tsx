export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
      <div className="relative">
        {/* Cooking pot */}
        <div className="w-16 h-16 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-full relative">
          {/* Steam animation */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <div className="w-1 h-8 bg-white opacity-60 rounded-full animate-pulse"></div>
          </div>
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 -ml-2">
            <div className="w-1 h-6 bg-white opacity-40 rounded-full animate-pulse animation-delay-200"></div>
          </div>
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 ml-2">
            <div className="w-1 h-6 bg-white opacity-40 rounded-full animate-pulse animation-delay-400"></div>
          </div>
          
          {/* Spinning spoon */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
            <div className="w-8 h-1 bg-yellow-600 rounded-full animate-spin origin-center"></div>
          </div>
        </div>
        
        {/* Handles */}
        <div className="absolute top-4 -left-2 w-3 h-2 bg-gray-600 rounded-l-full"></div>
        <div className="absolute top-4 -right-2 w-3 h-2 bg-gray-600 rounded-r-full"></div>
      </div>
      
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Cooking up ideas...
        </h2>
        <p className="text-gray-600 animate-pulse">
          Finding the perfect recipe for your mood 👨‍🍳
        </p>
      </div>
    </div>
  );
}
