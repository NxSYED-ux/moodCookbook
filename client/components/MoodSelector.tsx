interface MoodSelectorProps {
  onSelectMood: (mood: string) => void;
}

const moods = [
  { emoji: "😴", text: "Lazy", value: "lazy", color: "from-blue-400 to-blue-600" },
  { emoji: "❤️", text: "Romantic", value: "romantic", color: "from-pink-400 to-red-500" },
  { emoji: "😌", text: "Stressed", value: "stressed", color: "from-green-400 to-green-600" },
  { emoji: "🤩", text: "Excited", value: "excited", color: "from-yellow-400 to-orange-500" },
  { emoji: "🥳", text: "Party", value: "party", color: "from-purple-400 to-purple-600" }
];

export default function MoodSelector({ onSelectMood }: MoodSelectorProps) {
  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          Mood Cookbook
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Tell us how you're feeling, and we'll cook up the perfect recipe for your mood! 🍳
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {moods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => onSelectMood(mood.value)}
            className={`group relative overflow-hidden rounded-2xl p-8 text-white font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 bg-gradient-to-br ${mood.color}`}
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="relative z-10 text-center">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {mood.emoji}
              </div>
              <div className="text-lg font-semibold">
                {mood.text}
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-2 right-2 w-2 h-2 bg-white opacity-30 rounded-full"></div>
            <div className="absolute bottom-2 left-2 w-1 h-1 bg-white opacity-20 rounded-full"></div>
          </button>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <p className="text-gray-500 text-sm">
          Each mood has been carefully curated with recipes that match your vibe ✨
        </p>
      </div>
    </div>
  );
}
