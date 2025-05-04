import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherData } from "../utils/api";
import { RootState } from "../store";
import { clearHistory, removeFromHistory } from "../store/weatherSlice";

const SearchHistory: React.FC = () => {
  const dispatch = useDispatch();
  const { searchHistory } = useSelector((state: RootState) => state.weather);

  const handleSearch = (city: string) => {
    dispatch(fetchWeatherData(city) as any);
  };

  const handleRemoveItem = (city: string) => {
    dispatch(removeFromHistory(city));
  };

  const handleClearHistory = () => {
    dispatch(clearHistory());
  };

  if (searchHistory.length === 0) return null;

  return (
    <div className="mt-6 w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Search History
        </h3>
        <button
          onClick={handleClearHistory}
          className="text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Clear All
        </button>
      </div>
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-4">
        <ul
          className={`space-y-2 ${
            searchHistory.length > 5 ? "max-h-64 overflow-y-auto pr-2" : ""
          }`}
        >
          {searchHistory.map((city, index) => (
            <li key={index} className="flex justify-between items-center">
              <button
                onClick={() => handleSearch(city)}
                className="flex-grow text-left px-2 py-1 hover:bg-blue-100 dark:hover:bg-gray-600 rounded transition-colors"
              >
                {city}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveItem(city);
                }}
                className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 ml-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label={`Remove ${city} from history`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchHistory;
