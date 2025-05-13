import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const LessonOutline = ({ outline, courseId }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  // Calculate total duration
  const totalDuration = outline.reduce((total, lesson) => {
    const [minutes, seconds] = lesson.duration.split(':').map(Number);
    return total + (minutes * 60) + seconds;
  }, 0);
  
  // Format total duration
  const formatTotalDuration = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
      <div 
        className="p-4 border-b border-gray-200 flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="subheading text-gray-900 flex items-center">
          <Icon name="List" size={18} className="text-primary mr-2" />
          Lesson Outline
        </h3>
        <button className="text-gray-500 hover:text-gray-700">
          <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={18} />
        </button>
      </div>
      
      {isExpanded && (
        <div className="p-4">
          <div className="mb-3 flex justify-between items-center">
            <span className="body text-gray-700">{outline.length} lessons</span>
            <span className="badge-text text-gray-500">
              {formatTotalDuration(totalDuration)} total
            </span>
          </div>
          
          <div className="max-h-96 overflow-y-auto pr-2">
            {outline.map((lesson) => (
              <Link
                key={lesson.id}
                to={`/video-lesson-player?course=${courseId}&lesson=${lesson.id}`}
                className={`flex items-center p-3 mb-2 rounded-md transition-colors ${
                  lesson.current 
                    ? 'bg-primary bg-opacity-10 border-l-4 border-primary' :'hover:bg-gray-100'
                }`}
              >
                <div className="mr-3">
                  {lesson.completed ? (
                    <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center">
                      <Icon name="Check" size={14} className="text-white" />
                    </div>
                  ) : lesson.current ? (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Icon name="Play" size={14} className="text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                      <span className="text-xs text-gray-500">{lesson.id}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className={`body truncate ${
                    lesson.current ? 'font-medium text-gray-900' : 'text-gray-700'
                  }`}>
                    {lesson.title}
                  </p>
                  <p className="caption text-gray-500">{lesson.duration}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonOutline;