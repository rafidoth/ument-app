import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center space-x-2 h-32">
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
    </div>
  );
};

export default LoadingSpinner;
