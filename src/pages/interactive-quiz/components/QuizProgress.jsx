import React from "react";
import Icon from "../../../components/AppIcon";

const QuizProgress = ({ currentQuestion, totalQuestions, flaggedQuestions }) => {
  // Calculate progress percentage
  const progressPercentage = (currentQuestion / totalQuestions) * 100;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <Icon name="HelpCircle" size={18} className="text-primary mr-2" />
          <span className="body-large font-medium text-gray-900">
            Question {currentQuestion} of {totalQuestions}
          </span>
        </div>
        
        {flaggedQuestions.length > 0 && (
          <div className="flex items-center">
            <Icon name="Flag" size={16} className="text-warning mr-1" />
            <span className="badge-text text-gray-700">
              {flaggedQuestions.length} flagged
            </span>
          </div>
        )}
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="h-2 rounded-full bg-primary" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default QuizProgress;