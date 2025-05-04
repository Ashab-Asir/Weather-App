import HomePage from "./pages/HomePage";
import DarkModeToggle from "./components/DarkModeToggle";
import { useSelector } from "react-redux";
import { RootState } from "./store";

function App() {
  const isDarkMode = useSelector(
    (state: RootState) => state.weather.isDarkMode
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-800 to-gray-900"
          : "bg-gradient-to-br from-blue-50 to-blue-100"
      }`}
    >
      <DarkModeToggle />
      <HomePage />
    </div>
  );
}

export default App;
