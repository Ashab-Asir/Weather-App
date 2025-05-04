import React from "react";
import { WeatherData } from "../types/weatherTypes";
import WeatherIcon from "./WeatherIcon";
interface WeatherCardProps {
  data: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  const date = new Date(data.dt * 1000).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const temp: number = Math.round(data.main.temp) - 273.15;
  const feels: number = Math.round(data.main.feels_like) - 273;
  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 w-full max-w-md mx-auto mt-8 transition-all duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {data.name}, {data.sys.country}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">{date}</p>
        </div>
        <WeatherIcon iconCode={data.weather[0].icon} />
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <span className="text-5xl font-bold text-gray-800 dark:text-white">
            {temp.toFixed(2)}°C
          </span>
          <span className="text-xl text-gray-600 dark:text-gray-300 capitalize">
            {data.weather[0].description}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-blue-100 dark:bg-gray-600 p-3 rounded-lg">
            <p className="text-gray-600 dark:text-gray-300">Feels Like</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">
              {feels}°C
            </p>
          </div>
          <div className="bg-blue-100 dark:bg-gray-600 p-3 rounded-lg">
            <p className="text-gray-600 dark:text-gray-300">Humidity</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">
              {data.main.humidity}%
            </p>
          </div>
          <div className="bg-blue-100 dark:bg-gray-600 p-3 rounded-lg">
            <p className="text-gray-600 dark:text-gray-300">Wind Speed</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">
              {data.wind.speed} m/s
            </p>
          </div>
          <div className="bg-blue-100 dark:bg-gray-600 p-3 rounded-lg">
            <p className="text-gray-600 dark:text-gray-300">Pressure</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">
              {data.main.pressure} hPa
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
