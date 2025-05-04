import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setDarkMode } from "../store/weatherSlice";
import useLocalStorage from "../hooks/useLocalStorage";

const DarkModeToggle: React.FC = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(
    (state: RootState) => state.weather.isDarkMode
  );
  const [storedDarkMode, setStoredDarkMode] = useLocalStorage(
    "darkMode",
    isDarkMode
  );

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    dispatch(setDarkMode(newMode));
    setStoredDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
  };

  React.useEffect(() => {
    // Apply dark mode on initial load
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  React.useEffect(() => {
    // Initialize from localStorage
    if (storedDarkMode !== undefined) {
      dispatch(setDarkMode(storedDarkMode));
    }
  }, [dispatch, storedDarkMode]);

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? (
        <span className="text-xl">☀️</span>
      ) : (
        <span className="text-xl">🌙</span>
      )}
    </button>
  );
};

export default DarkModeToggle;
