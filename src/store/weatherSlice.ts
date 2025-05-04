import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WeatherData, WeatherState } from "../types/weatherTypes";

const loadDarkModePreference = (): boolean => {
  if (typeof window !== "undefined") {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  }
  return false;
};

const loadSearchHistory = (): string[] => {
  if (typeof window !== "undefined") {
    const history = localStorage.getItem("searchHistory");
    return history ? JSON.parse(history) : [];
  }
  return [];
};

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
  searchHistory: loadSearchHistory(),
  isDarkMode: loadDarkModePreference(),
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    fetchWeatherStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchWeatherSuccess(state, action: PayloadAction<WeatherData>) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;

      // Add to search history if not already there
      if (action.payload.name) {
        const newHistory = [
          action.payload.name,
          ...state.searchHistory.filter(
            (city) => city.toLowerCase() !== action.payload.name.toLowerCase()
          ),
        ].slice(0, 5);

        state.searchHistory = newHistory;
        localStorage.setItem("searchHistory", JSON.stringify(newHistory));
      }
    },
    fetchWeatherFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    clearHistory(state) {
      state.searchHistory = [];
      localStorage.removeItem("searchHistory");
    },
    removeFromHistory(state, action: PayloadAction<string>) {
      const newHistory = state.searchHistory.filter(
        (city) => city !== action.payload
      );
      state.searchHistory = newHistory;
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    },
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.isDarkMode = action.payload;
    },
  },
});

export const {
  fetchWeatherStart,
  fetchWeatherSuccess,
  fetchWeatherFailure,
  clearError,
  clearHistory,
  setDarkMode,
  removeFromHistory,
} = weatherSlice.actions;

export default weatherSlice.reducer;
