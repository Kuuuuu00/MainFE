import React from "react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="flex w-full h-1">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`flex-1 mx-0.5 rounded-full ${
            index < currentStep ? "bg-primary" : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
};

export default ProgressBar;
