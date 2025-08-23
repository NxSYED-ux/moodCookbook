import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ThemeToggle from "../components/ThemeToggle";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-blue-900/30 dark:to-indigo-900/50 relative overflow-hidden py-8 transition-colors duration-500">
      {/* Subtle animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-br from-orange-400/20 to-pink-400/20 rounded-full blur-2xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <ThemeToggle className="absolute top-4 right-4 z-20" />

      <div className="relative z-10 max-w-md w-full mx-4 px-4 text-center">
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-xl p-6 sm:p-8 border border-white/20 dark:border-gray-700/20 transition-colors duration-500">
          {/* Compact 404 Animation */}
          <div className="mb-6">
            <div className="text-5xl sm:text-6xl font-bold mb-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">4</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">0</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">4</span>
            </div>

            {/* Compact floating elements */}
            <div className="relative mx-auto w-32 h-32 mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-inner">
                    <span className="text-2xl font-bold text-purple-700 dark:text-purple-400">?</span>
                  </div>
                </div>
              </div>

              <div className="absolute top-0 left-0 w-5 h-5 bg-yellow-100 dark:bg-yellow-900/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="absolute top-3 right-4 w-4 h-4 bg-blue-100 dark:bg-blue-900/40 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              <div className="absolute bottom-6 left-5 w-4 h-4 bg-pink-100 dark:bg-pink-900/40 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              Page Not Found
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Oops! The page you're looking for doesn't exist.
            </p>

            <div className="bg-gray-50 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-600/30 rounded-lg p-3 mt-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Attempted to access:</p>
              <code className="block p-2 bg-gray-100 dark:bg-gray-700/50 rounded-md text-gray-800 dark:text-gray-200 font-mono text-xs overflow-x-auto">
                {location.pathname}
              </code>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleGoHome}
              className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="relative flex items-center justify-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="text-sm">Home</span>
              </div>
            </button>

            <button
              onClick={handleGoBack}
              className="group relative overflow-hidden bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="relative flex items-center justify-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="text-sm">Go Back</span>
              </div>
            </button>
          </div>

          <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
            Need help? <a href="#" className="text-purple-600 dark:text-purple-400 hover:underline">Contact support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;