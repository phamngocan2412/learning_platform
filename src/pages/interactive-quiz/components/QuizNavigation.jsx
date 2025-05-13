import React from "react";
import Icon from "../../../components/AppIcon";

const QuizNavigation = ({ 
  currentQuestion, 
  totalQuestions, 
  onPrevious, 
  onNext, 
  onFlag,
  isFlagged,
  isAnswered,
  showFeedback
}) => {
  return (
    <div className="mt-6 flex justify-between items-center">
      <button
        onClick={onPrevious}
        disabled={currentQuestion === 1}
        className={`button-text px-4 py-2 rounded-md flex items-center transition-colors ${
          currentQuestion === 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed" :"bg-white border border-gray-300 hover:bg-gray-50 text-gray-700"
        }`}
      >
        <Icon name="ArrowLeft" size={16} className="mr-2" />
        Previous
      </button>
      
      <div className="flex space-x-2">
        <button
          onClick={onFlag}
          className={`p-2 rounded-md transition-colors ${
            isFlagged
              ? "bg-warning bg-opacity-10 text-warning" :"bg-white border border-gray-300 hover:bg-gray-50 text-gray-700"
          }`}
        >
          <Icon name="Flag" size={16} />
          <span className="sr-only">{isFlagged ? "Unflag Question" : "Flag Question"}</span>
        </button>
      </div>
      
      {showFeedback ? (
        <button
          onClick={onNext}
          className="button-text bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md flex items-center transition-colors"
        >
          {currentQuestion === totalQuestions ? (
            <>
              Finish Quiz
              <Icon name="CheckCircle" size={16} className="ml-2" />
            </>
          ) : (
            <>
              Next Question
              <Icon name="ArrowRight" size={16} className="ml-2" />
            </>
          )}
        </button>
      ) : (
        <button
          onClick={onNext}
          disabled={!isAnswered}
          className={`button-text px-4 py-2 rounded-md flex items-center transition-colors ${
            isAnswered
              ? "bg-primary hover:bg-primary-dark text-white" :"bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          Skip
          <Icon name="ArrowRight" size={16} className="ml-2" />
        </button>
      )}
    </div>
  );
};

export default QuizNavigation;