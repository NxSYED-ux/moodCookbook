interface MoodSelectorProps {
  onSelectMood: (mood: string) => void;
}

const moods = [
  {
    emoji: "😴",
    text: "Lazy",
    value: "lazy",
    color: "from-indigo-500 via-blue-500 to-blue-600",
    description: "Quick & easy comfort foods",
    shadow: "shadow-blue-500/25"
  },
  {
    emoji: "❤️",
    text: "Romantic",
    value: "romantic",
    color: "from-pink-500 via-rose-500 to-red-500",
    description: "Intimate dishes for two",
    shadow: "shadow-pink-500/25"
  },
  {
    emoji: "😌",
    text: "Stressed",
    value: "stressed",
    color: "from-emerald-500 via-green-500 to-teal-500",
    description: "Soothing & calming meals",
    shadow: "shadow-green-500/25"
  },
  {
    emoji: "🤩",
    text: "Excited",
    value: "excited",
    color: "from-amber-500 via-orange-500 to-red-500",
    description: "Vibrant & energizing dishes",
    shadow: "shadow-orange-500/25"
  },
  {
    emoji: "🥳",
    text: "Party",
    value: "party",
    color: "from-purple-500 via-violet-500 to-purple-600",
    description: "Fun foods for gatherings",
    shadow: "shadow-purple-500/25"
  }
];

export default function MoodSelector({ onSelectMood }: MoodSelectorProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-1/4 w-28 h-28 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8 shadow-lg">
            <span className="text-2xl">🍳</span>
            <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
              AI-Powered Recipe Matching
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-6 tracking-tight">
            Mood Cookbook
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Your emotions are the secret ingredient. Tell us how you're feeling,
            and we'll craft the <span className="text-orange-500 font-semibold">perfect recipe</span> to match your vibe.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Curated by chefs</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>Mood-based algorithm</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>Instant recipes</span>
            </div>
          </div>
        </div>

        {/* Mood Selection */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            How are you feeling today?
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Choose your current mood and discover recipes that resonate with your emotions
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {moods.map((mood, index) => (
              <button
                key={mood.value}
                onClick={() => onSelectMood(mood.value)}
                className={`group relative overflow-hidden rounded-3xl p-8 text-white font-bold text-lg shadow-xl hover:shadow-2xl ${mood.shadow} transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 bg-gradient-to-br ${mood.color}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Glossy overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10"></div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

                <div className="relative z-10 text-center">
                  <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-500 drop-shadow-lg">
                    {mood.emoji}
                  </div>
                  <div className="text-xl font-bold mb-2 drop-shadow-sm">
                    {mood.text}
                  </div>
                  <div className="text-xs opacity-90 font-medium">
                    {mood.description}
                  </div>
                </div>

                {/* Animated sparkles */}
                <div className="absolute top-3 right-3 w-3 h-3 bg-white opacity-60 rounded-full group-hover:animate-ping"></div>
                <div className="absolute bottom-3 left-3 w-2 h-2 bg-white opacity-40 rounded-full group-hover:animate-ping" style={{ animationDelay: '0.2s' }}></div>
                <div className="absolute top-1/2 left-3 w-1 h-1 bg-white opacity-50 rounded-full group-hover:animate-ping" style={{ animationDelay: '0.4s' }}></div>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-gray-600 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
            <span className="animate-pulse">✨</span>
            <span className="text-sm font-medium">
              Each mood unlocks unique, expertly-curated recipes
            </span>
            <span className="animate-pulse">✨</span>
          </div>
        </div>
      </div>
    </div>
  );
}
