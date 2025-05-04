import { AppDispatch } from "../store";
import {
  fetchWeatherStart,
  fetchWeatherSuccess,
  fetchWeatherFailure,
} from "../store/weatherSlice";

const API_KEY = "4cd742715b504c3df3278037b62712d6";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeatherData =
  (city: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchWeatherStart());

      const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch weather data");
      }

      dispatch(fetchWeatherSuccess(data));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      dispatch(fetchWeatherFailure(errorMessage));
    }
  };
