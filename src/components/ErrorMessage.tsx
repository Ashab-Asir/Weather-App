import React from "react";
import { useDispatch } from "react-redux";
import { clearError } from "../store/weatherSlice";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4 rounded flex justify-between items-center">
      <p>{message}</p>
      <button
        onClick={() => dispatch(clearError())}
        className="text-red-700 hover:text-red-900 ml-4"
      >
        ✕
      </button>
    </div>
  );
};

export default ErrorMessage;
