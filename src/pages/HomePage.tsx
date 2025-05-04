import React from "react";
import { useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import SearchHistory from "../components/SearchHistory";
import { RootState } from "../store";

const HomePage: React.FC = () => {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.weather
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1
        className={`text-3xl font-bold text-center mb-8 ${
          useSelector((state: RootState) => state.weather.isDarkMode)
            ? "text-white"
            : "text-gray-800"
        }`}
      >
        Weather App
      </h1>

      <SearchBar />

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {data && <WeatherCard data={data} />}

      <SearchHistory />
    </div>
  );
};

export default HomePage;
