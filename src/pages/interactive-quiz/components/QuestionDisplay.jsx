import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import MultipleChoiceQuestion from "./question-types/MultipleChoiceQuestion";
import FillInBlankQuestion from "./question-types/FillInBlankQuestion";
import MatchingQuestion from "./question-types/MatchingQuestion";

const QuestionDisplay = ({ question, userAnswer, onAnswerSubmit, showFeedback }) => {
  const [answer, setAnswer] = useState(userAnswer || null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!answer) return;
    onAnswerSubmit(answer);
  };
  
  const renderQuestionType = () => {
    switch (question.type) {
      case "multiple-choice":
        return (
          <MultipleChoiceQuestion 
            question={question} 
            selectedOption={answer}
            onChange={setAnswer}
            disabled={showFeedback}
          />
        );
      case "fill-in-blank":
        return (
          <FillInBlankQuestion 
            question={question} 
            answer={answer}
            onChange={setAnswer}
            disabled={showFeedback}
          />
        );
      case "matching":
        return (
          <MatchingQuestion 
            question={question} 
            matches={answer || {}}
            onChange={setAnswer}
            disabled={showFeedback}
          />
        );
      default:
        return <p className="text-error">Unknown question type</p>;
    }
  };
  
  // Determine difficulty badge color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-success bg-opacity-10 text-success";
      case "medium":
        return "bg-warning bg-opacity-10 text-warning";
      case "hard":
        return "bg-error bg-opacity-10 text-error";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h2 className="heading text-gray-900 mb-2">
            {question.question}
          </h2>
        </div>
        <div className="ml-4 flex items-center">
          <span className={`badge-text px-2 py-1 rounded-full ${getDifficultyColor(question.difficulty)}`}>
            {question.difficulty}
          </span>
          <span className="ml-2 badge-text bg-primary bg-opacity-10 text-primary px-2 py-1 rounded-full">
            {question.points} pts
          </span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        {renderQuestionType()}
        
        {!showFeedback && (
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={!answer}
              className={`button-text px-4 py-2 rounded-md flex items-center transition-colors ${
                answer 
                  ? "bg-primary hover:bg-primary-dark text-white" :"bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              <Icon name="Check" size={16} className="mr-2" />
              Submit Answer
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default QuestionDisplay;