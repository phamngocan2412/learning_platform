import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const DiagnosticAssessment = ({ course }) => {
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  
  // Mock assessment questions
  const questions = [
    {
      id: 1,
      question: "Which HTML tag is used to create a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<url>"],
      correctAnswer: "<a>"
    },
    {
      id: 2,
      question: "Which CSS property is used to change the text color of an element?",
      options: ["font-color", "text-color", "color", "text-style"],
      correctAnswer: "color"
    },
    {
      id: 3,
      question: "Which of the following is NOT a JavaScript data type?",
      options: ["String", "Boolean", "Float", "Object"],
      correctAnswer: "Float"
    },
    {
      id: 4,
      question: "What does CSS stand for?",
      options: ["Creative Style Sheets", "Computer Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
      correctAnswer: "Cascading Style Sheets"
    },
    {
      id: 5,
      question: "Which property is used to create space between HTML elements?",
      options: ["spacing", "margin", "padding", "border"],
      correctAnswer: "margin"
    }
  ];
  
  // Handle starting the assessment
  const startAssessment = () => {
    setAssessmentStarted(true);
  };
  
  // Handle answer selection
  const selectAnswer = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
  };
  
  // Handle navigation between questions
  const goToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Complete assessment
      setAssessmentCompleted(true);
    }
  };
  
  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  // Calculate assessment results
  const calculateResults = () => {
    let correctCount = 0;
    
    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    return {
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      percentage: Math.round((correctCount / questions.length) * 100)
    };
  };
  
  // Render assessment intro
  const renderAssessmentIntro = () => {
    return (
      <div>
        <div className="mb-6">
          <h3 className="subheading text-gray-900 mb-2">Pre-Course Assessment</h3>
          <p className="body text-gray-700">
            This optional diagnostic assessment helps us understand your current knowledge level and customize your learning experience. It won't affect your course access or grades.
          </p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 mb-6">
          <h4 className="body-large font-medium text-gray-900 mb-3">What to Expect</h4>
          <ul className="space-y-3">
            <li className="flex items-start">
              <Icon name="CheckCircle" size={18} className="text-success mt-0.5 mr-2" />
              <p className="body text-gray-700">5 multiple-choice questions covering basic web development concepts</p>
            </li>
            <li className="flex items-start">
              <Icon name="CheckCircle" size={18} className="text-success mt-0.5 mr-2" />
              <p className="body text-gray-700">Takes approximately 5-10 minutes to complete</p>
            </li>
            <li className="flex items-start">
              <Icon name="CheckCircle" size={18} className="text-success mt-0.5 mr-2" />
              <p className="body text-gray-700">Immediate feedback on your knowledge level</p>
            </li>
            <li className="flex items-start">
              <Icon name="CheckCircle" size={18} className="text-success mt-0.5 mr-2" />
              <p className="body text-gray-700">Personalized learning recommendations based on results</p>
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-primary bg-opacity-5 rounded-lg p-4">
          <div className="mb-4 md:mb-0">
            <h4 className="body-large font-medium text-gray-900 mb-1">Ready to assess your knowledge?</h4>
            <p className="body text-gray-700">
              You can skip this step, but taking the assessment will help personalize your learning path.
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={startAssessment}
              className="button-text bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md flex items-center transition-colors"
            >
              Start Assessment
              <Icon name="ArrowRight" size={16} className="ml-2" />
            </button>
            <button
              className="button-text bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md transition-colors"
            >
              Skip for Now
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // Render question
  const renderQuestion = () => {
    const question = questions[currentQuestion];
    
    return (
      <div>
        <div className="mb-4 flex justify-between items-center">
          <h3 className="subheading text-gray-900">Pre-Course Assessment</h3>
          <span className="badge-text text-gray-700">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 mb-6">
          <h4 className="body-large font-medium text-gray-900 mb-4">{question.question}</h4>
          
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <label 
                key={index} 
                className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors ${
                  answers[question.id] === option 
                    ? 'bg-primary bg-opacity-10 border-primary' :'hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={() => selectAnswer(question.id, option)}
                  className="h-4 w-4 text-primary focus:ring-primary focus:ring-2 focus:outline-none"
                />
                <span className="ml-3 body text-gray-900">{option}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={goToPreviousQuestion}
            disabled={currentQuestion === 0}
            className={`button-text px-4 py-2 rounded-md flex items-center ${
              currentQuestion === 0 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' :'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Previous
          </button>
          
          <button
            onClick={goToNextQuestion}
            disabled={!answers[question.id]}
            className={`button-text px-4 py-2 rounded-md flex items-center ${
              !answers[question.id]
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' :'bg-primary hover:bg-primary-dark text-white'
            }`}
          >
            {currentQuestion < questions.length - 1 ? 'Next' : 'Complete'}
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </button>
        </div>
      </div>
    );
  };
  
  // Render assessment results
  const renderResults = () => {
    const results = calculateResults();
    
    // Determine recommendation based on score
    let recommendation;
    if (results.percentage >= 80) {
      recommendation = "You have a strong foundation in web development basics. You might find the early modules review-oriented, but they'll help solidify your knowledge before advancing to more complex topics.";
    } else if (results.percentage >= 50) {
      recommendation = "You have some familiarity with web development concepts. The course will help fill knowledge gaps and build a more comprehensive understanding.";
    } else {
      recommendation = "This course will provide you with the fundamentals you need. Take your time with the early modules to build a strong foundation.";
    }
    
    return (
      <div>
        <h3 className="subheading text-gray-900 mb-4">Assessment Results</h3>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 mb-6">
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-32 h-32 mb-4">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                  strokeDasharray="100, 100"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={results.percentage >= 80 ? "#10B981" : results.percentage >= 50 ? "#4F46E5" : "#F59E0B"}
                  strokeWidth="3"
                  strokeDasharray={`${results.percentage}, 100`}
                />
                <text x="18" y="20.5" className="text-3xl font-bold" textAnchor="middle" fill="#374151">
                  {results.percentage}%
                </text>
              </svg>
            </div>
            <p className="body-large font-medium text-gray-900">
              You scored {results.correctAnswers} out of {results.totalQuestions}
            </p>
          </div>
          
          <div className="mb-6">
            <h4 className="body-large font-medium text-gray-900 mb-2">Your Knowledge Level</h4>
            <p className="body text-gray-700 mb-4">
              {recommendation}
            </p>
            
            <div className="bg-info bg-opacity-5 rounded-lg p-3">
              <div className="flex items-start">
                <Icon name="Lightbulb" size={18} className="text-info mt-0.5 mr-2" />
                <p className="body text-gray-700">
                  Based on your results, we've customized your learning path to focus on areas where you can improve.
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="body-large font-medium text-gray-900 mb-2">Recommended Focus Areas</h4>
            <ul className="space-y-2">
              {results.percentage < 80 && (
                <li className="flex items-start">
                  <Icon name="AlertCircle" size={18} className="text-warning mt-0.5 mr-2" />
                  <p className="body text-gray-700">HTML fundamentals and structure</p>
                </li>
              )}
              {results.percentage < 60 && (
                <li className="flex items-start">
                  <Icon name="AlertCircle" size={18} className="text-warning mt-0.5 mr-2" />
                  <p className="body text-gray-700">CSS properties and styling concepts</p>
                </li>
              )}
              {results.percentage < 40 && (
                <li className="flex items-start">
                  <Icon name="AlertCircle" size={18} className="text-warning mt-0.5 mr-2" />
                  <p className="body text-gray-700">JavaScript basics and data types</p>
                </li>
              )}
              <li className="flex items-start">
                <Icon name="CheckCircle" size={18} className="text-success mt-0.5 mr-2" />
                <p className="body text-gray-700">
                  {results.percentage >= 80 
                    ? "Advanced responsive design techniques" :"Core web development principles"}
                </p>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-success bg-opacity-5 rounded-lg p-4">
          <div className="flex items-start">
            <Icon name="ThumbsUp" size={20} className="text-success mt-1 mr-3" />
            <div>
              <h4 className="body-large font-medium text-gray-900 mb-1">Great Start!</h4>
              <p className="body text-gray-700">
                Thank you for completing the assessment. Your course has been personalized based on your results. Continue to the next step to explore the learning community.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 bg-primary bg-opacity-5 border-b border-primary border-opacity-20">
        <h2 className="heading text-gray-900 flex items-center">
          <Icon name="FileText" size={20} className="text-primary mr-2" />
          Knowledge Assessment
        </h2>
      </div>
      
      <div className="p-4 md:p-6">
        {!assessmentStarted && renderAssessmentIntro()}
        {assessmentStarted && !assessmentCompleted && renderQuestion()}
        {assessmentCompleted && renderResults()}
      </div>
    </div>
  );
};

export default DiagnosticAssessment;