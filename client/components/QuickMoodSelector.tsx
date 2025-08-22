interface QuickMoodSelectorProps {
  currentMood: string;
  onSelectMood: (mood: string) => void;
  className?: string;
}

const moods = [
  {
    emoji: "😴",
    text: "Lazy",
    value: "lazy",
    color: "from-indigo-500 to-blue-600",
  },
  {
    emoji: "❤️",
    text: "Romantic",
    value: "romantic",
    color: "from-pink-500 to-red-500",
  },
  {
    emoji: "😌",
    text: "Stressed",
    value: "stressed",
    color: "from-emerald-500 to-teal-500",
  },
  {
    emoji: "🤩",
    text: "Excited",
    value: "excited",
    color: "from-amber-500 to-orange-500",
  },
  {
    emoji: "🥳",
    text: "Party",
    value: "party",
    color: "from-purple-500 to-violet-600",
  },
];

export default function QuickMoodSelector({
  currentMood,
  onSelectMood,
  className = "",
}: QuickMoodSelectorProps) {
  return (
    <div className={`${className}`}>
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-xl border border-white/20 dark:border-gray-700/20 transition-colors duration-500">
        <div className="text-center mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Change Your Mood
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Not feeling the same? Pick a different mood for new recipes
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => onSelectMood(mood.value)}
              className={`relative group flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 min-w-[70px] sm:min-w-[80px] ${
                currentMood === mood.value
                  ? `bg-gradient-to-br ${mood.color} text-white shadow-lg scale-105`
                  : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 hover:scale-105"
              }`}
            >
              {/* Selection indicator */}
              {currentMood === mood.value && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              )}

              <div className="text-xl sm:text-2xl mb-1 group-hover:scale-110 transition-transform duration-300">
                {mood.emoji}
              </div>
              <div className="text-xs sm:text-sm font-semibold">
                {mood.text}
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-xl sm:rounded-2xl transition-opacity duration-300"></div>
            </button>
          ))}
        </div>

        <div className="text-center mt-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            ✨ Each mood brings unique recipe suggestions
          </p>
        </div>
      </div>
    </div>
  );
}
