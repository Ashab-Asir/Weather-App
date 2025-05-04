export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
  dt: number;
}

export interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
  searchHistory: string[];
  isDarkMode: boolean;
}