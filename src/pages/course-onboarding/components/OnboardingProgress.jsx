import React from "react";
import Icon from "../../../components/AppIcon";

const OnboardingProgress = ({ currentStep, totalSteps }) => {
  // Generate step labels
  const stepLabels = [
    "Introduction",
    "Objectives",
    "Roadmap",
    "Preferences",
    "Assessment",
    "Community",
    "Resources"
  ];

  // Calculate progress percentage
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6">
      {/* Mobile progress indicator */}
      <div className="md:hidden">
        <div className="flex justify-between items-center mb-2">
          <span className="body-large font-medium text-gray-900">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="badge-text text-gray-700">
            {stepLabels[currentStep - 1]}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="h-2 rounded-full bg-primary" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Desktop progress indicator */}
      <div className="hidden md:block">
        <div className="flex justify-between mb-2">
          <span className="body-large font-medium text-gray-900">
            Course Onboarding Progress
          </span>
          <span className="badge-text text-gray-700">
            {currentStep}/{totalSteps} completed
          </span>
        </div>
        <div className="relative">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-gray-200">
            <div 
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between">
            {stepLabels.map((label, index) => {
              const stepNumber = index + 1;
              const isActive = stepNumber === currentStep;
              const isCompleted = stepNumber < currentStep;
              
              return (
                <div 
                  key={stepNumber} 
                  className="flex flex-col items-center"
                  style={{ width: `${100 / totalSteps}%` }}
                >
                  <div 
                    className={`w-8 h-8 flex items-center justify-center rounded-full mb-1 ${
                      isActive 
                        ? 'bg-primary text-white' 
                        : isCompleted 
                          ? 'bg-primary bg-opacity-10 text-primary' :'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {isCompleted ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <span className="text-xs font-medium">{stepNumber}</span>
                    )}
                  </div>
                  <span className={`caption text-center ${
                    isActive ? 'text-primary font-medium' : 'text-gray-500'
                  }`}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingProgress;