import React from 'react';
import { Hearts } from 'react-loader-spinner';

function LoadingSpinner({ message }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Hearts
        type="Circles"
        color="#FACC15"
        height={50}
        width={200}
        className="m-5"
      />

      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
}

export default LoadingSpinner;
