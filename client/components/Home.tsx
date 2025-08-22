import { useNavigate } from "react-router-dom";
import MoodSelector from "./MoodSelector";
import ThemeToggle from "./ThemeToggle";

export default function Home() {
  const navigate = useNavigate();

  const handleSelectMood = (mood: string) => {
    // Navigate to results page with mood parameter
    navigate(`/results?mood=${encodeURIComponent(mood)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-blue-900/30 dark:to-indigo-900/50 relative overflow-hidden transition-colors duration-500">
      {/* Dynamic background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.1),transparent_70%)] dark:bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.2),transparent_70%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(255,154,0,0.1),transparent_70%)] dark:bg-[radial-gradient(circle_at_80%_20%,rgba(255,154,0,0.2),transparent_70%)]"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_40%_90%,rgba(34,197,94,0.1),transparent_70%)] dark:bg-[radial-gradient(circle_at_40%_90%,rgba(34,197,94,0.2),transparent_70%)]"></div>
      </div>
      <ThemeToggle />
      <MoodSelector onSelectMood={handleSelectMood} />
    </div>
  );
}
