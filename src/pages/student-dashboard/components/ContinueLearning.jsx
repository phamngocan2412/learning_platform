import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const ContinueLearning = ({ course }) => {
  // Format last accessed date
  const formatLastAccessed = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    
    if (diffDays > 0) {
      return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 bg-primary bg-opacity-5 border-b border-primary border-opacity-20">
        <h2 className="heading text-gray-900 flex items-center">
          <Icon name="Repeat" size={20} className="text-primary mr-2" />
          Continue Learning
        </h2>
      </div>
      
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 mb-4 md:mb-0 md:mr-6">
            <div className="rounded-lg overflow-hidden h-48 md:h-36">
              <Image
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="md:w-2/3">
            <div className="flex items-start justify-between mb-2">
              <h3 className="heading text-gray-900">{course.title}</h3>
              <span className="badge-text text-gray-500">
                Last accessed {formatLastAccessed(course.lastAccessed)}
              </span>
            </div>
            
            <p className="body text-gray-700 mb-3">
              <Icon name="User" size={14} className="inline mr-1 text-gray-500" />
              {course.instructor}
            </p>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="body text-gray-700">Overall Progress</span>
                <span className="badge-text text-gray-700">{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-primary" 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <p className="body text-gray-700 mb-1">Next Lesson:</p>
              <p className="subheading text-gray-900">{course.nextLesson}</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Link 
                to={`/video-lesson-player?course=${course.id}`}
                className="button-text bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md flex items-center transition-colors"
              >
                <Icon name="Play" size={16} className="mr-2" />
                Resume Learning
              </Link>
              
              <Link 
                to={`/learning-path-navigator?course=${course.id}`}
                className="button-text bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md flex items-center transition-colors"
              >
                <Icon name="Map" size={16} className="mr-2" />
                View Path
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContinueLearning;