import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

import MultipleChoiceEditor from "./question-types/MultipleChoiceEditor";
import ShortAnswerEditor from "./question-types/ShortAnswerEditor";

const QuestionEditor = ({
  question,
  updateQuestion,
  deleteQuestion,
  questionIndex,
  totalQuestions, setActiveQuestion
}) => {
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  const handleTitleChange = (e) => {
    updateQuestion({
      ...question,
      title: e.target.value
    });
  };

  const handlePointsChange = (e) => {
    updateQuestion({
      ...question,
      points: parseInt(e.target.value) || 0
    });
  };

  const handleDifficultyChange = (e) => {
    updateQuestion({
      ...question,
      difficulty: e.target.value
    });
  };

  const handleFeedbackChange = (type, value) => {
    updateQuestion({
      ...question,
      feedback: {
        ...question.feedback,
        [type]: value
      }
    });
  };

  const renderQuestionTypeEditor = () => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <MultipleChoiceEditor
            question={question}
            updateQuestion={updateQuestion} />);


      case 'short-answer':
        return (
          <ShortAnswerEditor
            question={question}
            updateQuestion={updateQuestion} />);


      default:
        return (
          <div className="p-6 text-center bg-gray-50 rounded-lg">
            <Icon name="AlertCircle" size={32} className="mx-auto mb-2 text-warning" />
            <p className="body-large text-gray-700">Editor for {question.type} questions is under development</p>
            <p className="body text-gray-500 mt-2">Please check back later or choose another question type</p>
          </div>);

    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden h-full flex flex-col">
      <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <h2 className="subheading text-gray-900 flex items-center">
          <Icon name="Edit3" size={18} className="text-primary mr-2" />
          Question Editor
        </h2>
        <div className="flex items-center space-x-2">
          <span className="badge-text text-gray-700">
            Question {questionIndex + 1} of {totalQuestions}
          </span>
          <button
            className="p-1 text-gray-500 hover:text-primary rounded-md"
            disabled={questionIndex === 0}
            onClick={() => questionIndex > 0 && setActiveQuestion(questionIndex - 1)}>

            <Icon name="ChevronLeft" size={18} />
          </button>
          <button
            className="p-1 text-gray-500 hover:text-primary rounded-md"
            disabled={questionIndex === totalQuestions - 1}
            onClick={() => questionIndex < totalQuestions - 1 && setActiveQuestion(questionIndex + 1)}>

            <Icon name="ChevronRight" size={18} />
          </button>
        </div>
      </div>
      
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <div className="flex-1 mb-3 md:mb-0">
            <label htmlFor="questionTitle" className="block body text-gray-700 mb-1">Question Text</label>
            <input
              id="questionTitle"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              value={question.title}
              onChange={handleTitleChange}
              placeholder="Enter your question" />

          </div>
          
          <div className="flex space-x-3">
            <div>
              <label htmlFor="questionPoints" className="block body text-gray-700 mb-1">Points</label>
              <input
                id="questionPoints"
                type="number"
                min="0"
                className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                value={question.points}
                onChange={handlePointsChange} />

            </div>
            
            <div>
              <label htmlFor="questionDifficulty" className="block body text-gray-700 mb-1">Difficulty</label>
              <select
                id="questionDifficulty"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                value={question.difficulty}
                onChange={handleDifficultyChange}>

                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        {/* Question Type Specific Editor */}
        {renderQuestionTypeEditor()}
        
        {/* Advanced Options */}
        <div className="mt-6">
          <button
            className="flex items-center body text-gray-700 hover:text-gray-900"
            onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}>

            <Icon name={showAdvancedOptions ? "ChevronDown" : "ChevronRight"} size={18} className="mr-1" />
            Advanced Options
          </button>
          
          {showAdvancedOptions &&
          <div className="mt-3 p-4 bg-gray-50 rounded-lg">
              <div className="mb-4">
                <label htmlFor="correctFeedback" className="block body text-gray-700 mb-1">
                  Feedback for Correct Answer
                </label>
                <textarea
                id="correctFeedback"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                value={question.feedback.correct}
                onChange={(e) => handleFeedbackChange('correct', e.target.value)}
                rows="2">
              </textarea>
              </div>
              
              <div className="mb-4">
                <label htmlFor="incorrectFeedback" className="block body text-gray-700 mb-1">
                  Feedback for Incorrect Answer
                </label>
                <textarea
                id="incorrectFeedback"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                value={question.feedback.incorrect}
                onChange={(e) => handleFeedbackChange('incorrect', e.target.value)}
                rows="2">
              </textarea>
              </div>
              
              <div className="flex items-center">
                <input
                type="checkbox"
                id="partialCredit"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />

                <label htmlFor="partialCredit" className="ml-2 block body text-gray-700">
                  Allow partial credit
                </label>
              </div>
            </div>
          }
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200 flex justify-between">
        <button
          className="py-2 px-4 rounded-md button-text bg-white border border-error text-error hover:bg-error hover:bg-opacity-10"
          onClick={deleteQuestion}>

          <Icon name="Trash2" size={16} className="mr-2 inline" />
          Delete
        </button>
        
        <div className="flex space-x-2">
          <button className="py-2 px-4 rounded-md button-text bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
            <Icon name="Copy" size={16} className="mr-2 inline" />
            Duplicate
          </button>
          <button className="py-2 px-4 rounded-md button-text bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
            <Icon name="Image" size={16} className="mr-2 inline" />
            Add Media
          </button>
        </div>
      </div>
    </div>);

};

export default QuestionEditor;