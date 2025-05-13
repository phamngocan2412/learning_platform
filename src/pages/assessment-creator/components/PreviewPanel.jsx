import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const PreviewPanel = ({ questions, activeQuestion, setActiveQuestion, setShowPreview }) => {
  const [viewMode, setViewMode] = useState("desktop");
  const [showAnswers, setShowAnswers] = useState(false);

  const renderQuestionPreview = (question) => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            <p className="body-large text-gray-900">{question.title}</p>
            <div className="space-y-2">
              {question.options.map((option) => (
                <div 
                  key={option.id} 
                  className={`flex items-center p-3 rounded-md border ${
                    showAnswers && option.isCorrect 
                      ? 'bg-success bg-opacity-10 border-success' :'border-gray-300 hover:border-primary'
                  }`}
                >
                  <div className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${
                    showAnswers && option.isCorrect 
                      ? 'border-success' :'border-gray-400'
                  }`}>
                    {showAnswers && option.isCorrect && (
                      <div className="h-3 w-3 rounded-full bg-success"></div>
                    )}
                  </div>
                  <span className="body text-gray-700">{option.text}</span>
                  {showAnswers && option.isCorrect && (
                    <Icon name="Check" size={16} className="ml-auto text-success" />
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case 'short-answer':
        return (
          <div className="space-y-3">
            <p className="body-large text-gray-900">{question.title}</p>
            <div className="border border-gray-300 rounded-md p-3 bg-gray-50">
              <input
                type="text"
                className="w-full bg-transparent border-none focus:outline-none focus:ring-0 body text-gray-700"
                placeholder="Type your answer here..."
                disabled
              />
            </div>
            {showAnswers && (
              <div className="p-3 bg-success bg-opacity-10 border border-success rounded-md">
                <p className="body text-success flex items-center">
                  <Icon name="Check" size={16} className="mr-2" />
                  Correct answer: {question.correctAnswer}
                </p>
              </div>
            )}
          </div>
        );
      default:
        return (
          <div className="space-y-3">
            <p className="body-large text-gray-900">{question.title}</p>
            <div className="p-4 bg-gray-100 rounded-md text-center">
              <p className="body text-gray-500">Preview not available for this question type</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <h2 className="subheading text-gray-900 flex items-center">
          <Icon name="Eye" size={18} className="text-primary mr-2" />
          Assessment Preview
        </h2>
        <div className="flex items-center space-x-3">
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button 
              className={`p-2 ${viewMode === 'mobile' ? 'bg-gray-200' : 'bg-white'}`}
              onClick={() => setViewMode('mobile')}
              title="Mobile View"
            >
              <Icon name="Smartphone" size={16} />
            </button>
            <button 
              className={`p-2 ${viewMode === 'tablet' ? 'bg-gray-200' : 'bg-white'}`}
              onClick={() => setViewMode('tablet')}
              title="Tablet View"
            >
              <Icon name="Tablet" size={16} />
            </button>
            <button 
              className={`p-2 ${viewMode === 'desktop' ? 'bg-gray-200' : 'bg-white'}`}
              onClick={() => setViewMode('desktop')}
              title="Desktop View"
            >
              <Icon name="Monitor" size={16} />
            </button>
          </div>
          <button 
            className="p-2 text-gray-700 hover:text-primary rounded-md"
            onClick={() => setShowAnswers(!showAnswers)}
            title={showAnswers ? "Hide Answers" : "Show Answers"}
          >
            <Icon name={showAnswers ? "EyeOff" : "Check"} size={18} />
          </button>
          <button 
            className="p-2 text-gray-700 hover:text-error rounded-md"
            onClick={() => setShowPreview(false)}
            title="Exit Preview"
          >
            <Icon name="X" size={18} />
          </button>
        </div>
      </div>
      
      <div className="p-6 flex justify-center">
        <div className={`bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden ${
          viewMode === 'mobile' ? 'w-80' : 
          viewMode === 'tablet' ? 'w-[600px]' : 
          'w-[900px]'
        }`}>
          {/* Assessment Header */}
          <div className="p-4 bg-primary bg-opacity-5 border-b border-primary border-opacity-20">
            <h3 className="heading text-gray-900">Assessment Preview</h3>
            <div className="flex justify-between items-center mt-2">
              <span className="body text-gray-700">
                {questions.length} questions • {questions.reduce((sum, q) => sum + q.points, 0)} points total
              </span>
              <span className="body text-gray-700">Time: 60 minutes</span>
            </div>
          </div>
          
          {/* Question Navigation */}
          <div className="p-4 border-b border-gray-200 flex flex-wrap gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index === activeQuestion 
                    ? 'bg-primary text-white' :'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveQuestion(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          
          {/* Question Content */}
          <div className="p-6">
            {questions[activeQuestion] && renderQuestionPreview(questions[activeQuestion])}
          </div>
          
          {/* Navigation Buttons */}
          <div className="p-4 border-t border-gray-200 flex justify-between">
            <button 
              className="px-4 py-2 rounded-md button-text bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={activeQuestion === 0}
              onClick={() => setActiveQuestion(activeQuestion - 1)}
            >
              <Icon name="ArrowLeft" size={16} className="mr-2 inline" />
              Previous
            </button>
            <button 
              className="px-4 py-2 rounded-md button-text bg-primary text-white hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={activeQuestion === questions.length - 1}
              onClick={() => setActiveQuestion(activeQuestion + 1)}
            >
              Next
              <Icon name="ArrowRight" size={16} className="ml-2 inline" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;