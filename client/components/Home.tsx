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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-blue-900/30 dark:to-indigo-900/50 relative overflow-hidden">
      {/*<ThemeToggle />*/}
      <MoodSelector onSelectMood={handleSelectMood} />
    </div>
  );
}
