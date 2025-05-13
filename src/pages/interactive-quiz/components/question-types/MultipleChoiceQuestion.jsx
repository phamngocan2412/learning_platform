import React from "react";


const MultipleChoiceQuestion = ({ question, selectedOption, onChange, disabled }) => {
  return (
    <div className="mt-4">
      <div className="space-y-3">
        {question.options.map(option => (
          <div 
            key={option.id}
            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
              selectedOption === option.id
                ? "border-primary bg-primary bg-opacity-5" :"border-gray-200 hover:border-gray-300"
            } ${disabled ? "opacity-80" : ""}`}
            onClick={() => !disabled && onChange(option.id)}
          >
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
              selectedOption === option.id
                ? "border-primary" :"border-gray-400"
            }`}>
              {selectedOption === option.id && (
                <div className="w-3 h-3 rounded-full bg-primary"></div>
              )}
            </div>
            <span className="body-large text-gray-900">{option.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;