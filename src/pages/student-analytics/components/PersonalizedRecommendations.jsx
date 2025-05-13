import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const PersonalizedRecommendations = ({ recommendations }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mt-6">
      <div className="p-4 border-b border-gray-200">
        <h3 className="subheading text-gray-900 flex items-center">
          <Icon name="Lightbulb" size={18} className="text-primary mr-2" />
          Personalized Recommendations
        </h3>
      </div>
      
      <div className="p-4">
        <p className="body text-gray-700 mb-4">
          Based on your learning patterns and performance data
        </p>
        
        {/* Study Habits Recommendations */}
        <div className="mb-4">
          <h4 className="body-large font-medium text-gray-900 mb-2 flex items-center">
            <Icon name="Clock" size={16} className="text-primary mr-2" />
            Study Habit Optimization
          </h4>
          <div className="space-y-3">
            {recommendations.studyHabits.map(recommendation => (
              <div key={recommendation.id} className="bg-gray-50 rounded-lg p-3">
                <p className="body font-medium text-gray-900 mb-1">{recommendation.title}</p>
                <p className="caption text-gray-700">{recommendation.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Content Recommendations */}
        <div className="mb-4">
          <h4 className="body-large font-medium text-gray-900 mb-2 flex items-center">
            <Icon name="BookOpen" size={16} className="text-primary mr-2" />
            Content to Review
          </h4>
          <div className="space-y-3">
            {recommendations.contentRecommendations.map(recommendation => (
              <div key={recommendation.id} className="bg-gray-50 rounded-lg p-3">
                <p className="body font-medium text-gray-900 mb-1">{recommendation.title}</p>
                <p className="caption text-gray-700 mb-1">{recommendation.description}</p>
                <p className="badge-text text-primary">{recommendation.course}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Skill Gap Recommendations */}
        <div>
          <h4 className="body-large font-medium text-gray-900 mb-2 flex items-center">
            <Icon name="Target" size={16} className="text-primary mr-2" />
            Skills to Develop
          </h4>
          <div className="space-y-3">
            {recommendations.skillGaps.map(recommendation => (
              <div key={recommendation.id} className="bg-gray-50 rounded-lg p-3">
                <p className="body font-medium text-gray-900 mb-1">{recommendation.title}</p>
                <p className="caption text-gray-700 mb-1">{recommendation.description}</p>
                <p className="badge-text text-primary">{recommendation.course}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* View All Link */}
        <div className="mt-4 text-center">
          <Link 
            to="/learning-path-navigator" 
            className="button-text text-primary hover:text-primary-dark inline-flex items-center"
          >
            View Detailed Learning Path
            <Icon name="ChevronRight" size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedRecommendations;