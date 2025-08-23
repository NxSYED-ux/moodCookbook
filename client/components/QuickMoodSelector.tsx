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
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Change Your Mood
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Not feeling the same? Pick a different mood for new recipes
          </p>
        </div>

        <div className="grid grid-cols-5 gap-3 sm:gap-4">
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => onSelectMood(mood.value)}
              className={`group relative flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl transition-all duration-300 border-2 ${
                currentMood === mood.value
                  ? `bg-gradient-to-br ${mood.color} text-white border-transparent shadow-lg shadow-purple-500/25 scale-105`
                  : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300 hover:shadow-md hover:scale-105"
              }`}
            >
              {/* Selection indicator */}
              {currentMood === mood.value && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}

              <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {mood.emoji}
              </div>
              <div className="text-sm sm:text-base font-semibold text-center">
                {mood.text}
              </div>
            </button>
          ))}
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ✨ Each mood brings unique recipe suggestions
          </p>
        </div>
      </div>
    </div>
  );
}
