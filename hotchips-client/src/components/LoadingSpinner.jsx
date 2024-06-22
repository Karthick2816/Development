import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <span className="loading loading-infinity loading-xs"></span>
      <span className="loading loading-infinity loading-sm"></span>
      <span className="loading loading-infinity loading-md"></span>
      <span className="loading loading-infinity loading-lg"></span>
    </div>
  );
};

export default LoadingSpinner;
