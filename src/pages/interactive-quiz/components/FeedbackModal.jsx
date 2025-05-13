import React from "react";
import Icon from "../../../components/AppIcon";

const FeedbackModal = ({ feedbackData, onClose }) => {
  const { isCorrect, explanation, correctAnswer } = feedbackData;
  
  return (
    <div className="mt-6 p-4 rounded-lg border-2 border-l-8 animate-fadeIn transition-all duration-300 ease-in-out" 
      style={{ 
        borderLeftColor: isCorrect ? 'var(--color-success)' : 'var(--color-error)',
        borderColor: isCorrect ? 'var(--color-success)' : 'var(--color-error)',
        backgroundColor: isCorrect ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.05)'
      }}
    >
      <div className="flex items-start">
        <div className={`rounded-full p-2 mr-3 ${
          isCorrect ? 'bg-success bg-opacity-10' : 'bg-error bg-opacity-10'
        }`}>
          <Icon 
            name={isCorrect ? "CheckCircle" : "XCircle"} 
            size={24} 
            className={isCorrect ? 'text-success' : 'text-error'} 
          />
        </div>
        <div className="flex-1">
          <h3 className="subheading text-gray-900 mb-1">
            {isCorrect ? "Correct!" : "Incorrect"}
          </h3>
          <p className="body text-gray-700 mb-3">
            {explanation}
          </p>
          {!isCorrect && typeof correctAnswer === 'string' && (
            <p className="body text-gray-900">
              <span className="font-medium">Correct answer:</span> {correctAnswer}
            </p>
          )}
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        <button
          onClick={onClose}
          className="button-text bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md flex items-center transition-colors"
        >
          Continue
          <Icon name="ArrowRight" size={16} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;