"use client";

import { useTheme } from "@/contexts/theme.context";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getCurrentIcon = () => {
    if (theme === "system") {
      // System icon
      return (
        <svg
          className="h-5 w-5 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      );
    } else if (resolvedTheme === "dark") {
      // Moon icon for dark theme
      return (
        <svg
          className="h-5 w-5 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      );
    } else {
      // Sun icon for light theme
      return (
        <svg
          className="h-5 w-5 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      );
    }
  };

  const getTooltipText = () => {
    if (theme === "system") {
      return "Switch to light theme";
    } else if (theme === "light") {
      return "Switch to dark theme";
    } else {
      return "Use system theme";
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="group relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white/80 text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-700"
      title={getTooltipText()}
      aria-label={getTooltipText()}
    >
      <div className="transition-all duration-300 ease-in-out">
        {getCurrentIcon()}
      </div>

      {/* Tooltip */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-gray-700">
        {getTooltipText()}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 transform border-4 border-transparent border-b-gray-900 dark:border-b-gray-700"></div>
      </div>
    </button>
  );
}
