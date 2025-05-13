import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const ResultsSummary = ({ results, onRetry }) => {
  const { 
    totalQuestions, 
    answeredQuestions, 
    correctAnswers, 
    incorrectAnswers,
    earnedPoints,
    totalPoints,
    percentageScore,
    passed
  } = results;
  
  // Recommended resources based on performance
  const recommendedResources = [
    {
      id: 1,
      title: "HTML Fundamentals Review",
      type: "video",
      duration: "15 min",
      path: "/video-lesson-player?lesson=html-fundamentals"
    },
    {
      id: 2,
      title: "CSS Properties Deep Dive",
      type: "article",
      duration: "10 min",
      path: "/learning-path-navigator?topic=css-properties"
    },
    {
      id: 3,
      title: "JavaScript Arrays Practice",
      type: "exercise",
      duration: "20 min",
      path: "/interactive-quiz?topic=js-arrays"
    }
  ];
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 bg-primary bg-opacity-5 border-b border-primary border-opacity-20">
          <h2 className="heading text-gray-900 flex items-center">
            <Icon 
              name={passed ? "Award" : "BarChart2"} 
              size={24} 
              className={passed ? "text-achievement mr-2" : "text-primary mr-2"} 
            />
            Quiz Results
          </h2>
        </div>
        
        <div className="p-6">
          {/* Score summary */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="text-center mb-4 md:mb-0">
              <div className="relative inline-block">
                <svg className="w-32 h-32">
                  <circle 
                    className="text-gray-200" 
                    strokeWidth="8" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r="58" 
                    cx="64" 
                    cy="64" 
                  />
                  <circle 
                    className={passed ? "text-success" : "text-warning"} 
                    strokeWidth="8" 
                    strokeDasharray={`${percentageScore * 3.64} 1000`} 
                    strokeLinecap="round" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r="58" 
                    cx="64" 
                    cy="64" 
                  />
                </svg>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <span className="display-medium text-gray-900">{percentageScore}%</span>
                </div>
              </div>
              <p className="body-large mt-2 font-medium text-gray-700">
                {passed ? "Passed!" : "Not Passed"}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 md:gap-8">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="display-small text-primary">{correctAnswers}</p>
                <p className="body text-gray-700">Correct</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="display-small text-error">{incorrectAnswers}</p>
                <p className="body text-gray-700">Incorrect</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="display-small text-gray-900">{earnedPoints}</p>
                <p className="body text-gray-700">Points Earned</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="display-small text-gray-900">{totalPoints}</p>
                <p className="body text-gray-700">Total Points</p>
              </div>
            </div>
          </div>
          
          {/* Recommended resources */}
          <div className="mb-8">
            <h3 className="subheading text-gray-900 mb-4">Recommended Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedResources.map(resource => (
                <Link 
                  key={resource.id}
                  to={resource.path}
                  className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start">
                    <div className="rounded-full p-2 mr-3 bg-primary bg-opacity-10">
                      <Icon 
                        name={
                          resource.type === 'video' ? 'Video' : 
                          resource.type === 'article'? 'FileText' : 'Layers'
                        } 
                        size={16} 
                        className="text-primary" 
                      />
                    </div>
                    <div>
                      <p className="body-large font-medium text-gray-900">{resource.title}</p>
                      <p className="caption text-gray-700">
                        {resource.type} • {resource.duration}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={onRetry}
              className="button-text bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md flex items-center justify-center transition-colors"
            >
              <Icon name="RefreshCw" size={16} className="mr-2" />
              Retry Quiz
            </button>
            
            <Link 
              to="/student-dashboard"
              className="button-text bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-md flex items-center justify-center transition-colors"
            >
              <Icon name="Home" size={16} className="mr-2" />
              Back to Dashboard
            </Link>
            
            <Link 
              to="/learning-path-navigator"
              className="button-text bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-md flex items-center justify-center transition-colors"
            >
              <Icon name="Map" size={16} className="mr-2" />
              Continue Learning
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsSummary;