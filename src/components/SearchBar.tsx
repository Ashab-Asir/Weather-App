import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherData } from "../utils/api";
import { clearError } from "../store/weatherSlice";
import { RootState } from "../store";

const SearchBar: React.FC = () => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();
  const isDarkMode = useSelector(
    (state: RootState) => state.weather.isDarkMode
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      dispatch(fetchWeatherData(city) as any);
      setCity("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    dispatch(clearError());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div
        className={`flex items-center border-b-2 py-2 ${
          isDarkMode ? "border-blue-400" : "border-blue-500"
        }`}
      >
        <input
          className={`appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none ${
            isDarkMode ? "text-white placeholder-gray-300" : "text-gray-700"
          }`}
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleChange}
        />
        <button
          className={`flex-shrink-0 text-sm border-4 py-1 px-2 rounded ${
            isDarkMode
              ? "bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 text-white"
              : "bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-white"
          }`}
          type="submit"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
