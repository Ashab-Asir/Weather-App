import React from "react";

interface WeatherIconProps {
  iconCode: string;
  size?: "sm" | "md" | "lg";
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ iconCode, size = "md" }) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  return (
    <img
      src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
      alt="Weather icon"
      className={sizeClasses[size]}
    />
  );
};

export default WeatherIcon;
