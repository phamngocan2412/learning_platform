import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const CourseCard = ({ course }) => {
  // Format deadline date
  const formatDeadline = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  // Determine progress color based on completion percentage
  const getProgressColor = (progress) => {
    if (progress >= 75) return "bg-success";
    if (progress >= 40) return "bg-primary";
    return "bg-warning";
  };

  // Calculate days remaining until deadline
  const getDaysRemaining = (deadlineString) => {
    const today = new Date();
    const deadline = new Date(deadlineString);
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysRemaining(course.deadline);
  const isUrgent = daysRemaining <= 7;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="relative h-40 overflow-hidden">
        <Image
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 right-0 m-2">
          <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium text-white ${
            course.category === "Programming" ? "bg-info" :
            course.category === "Data Science" ? "bg-achievement" :
            course.category === "Design"? "bg-engagement" : "bg-primary"
          }`}>
            {course.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="subheading text-gray-900 mb-1 line-clamp-1">{course.title}</h3>
        <p className="body text-gray-700 mb-3">
          <Icon name="User" size={14} className="inline mr-1 text-gray-500" />
          {course.instructor}
        </p>
        
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="body text-gray-700">Progress</span>
            <span className="badge-text text-gray-700">{course.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getProgressColor(course.progress)}`} 
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Icon name="BookOpen" size={16} className="text-gray-500 mr-1" />
            <span className="badge-text text-gray-700">
              {course.completedLessons}/{course.totalLessons} lessons
            </span>
          </div>
          {isUrgent && (
            <div className="flex items-center">
              <Icon name="Clock" size={16} className="text-error mr-1" />
              <span className="badge-text text-error">
                {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} left
              </span>
            </div>
          )}
          {!isUrgent && (
            <div className="badge-text text-gray-500">
              Due {formatDeadline(course.deadline)}
            </div>
          )}
        </div>
        
        <div className="flex justify-between">
          <Link 
            to={`/video-lesson-player?course=${course.id}`}
            className="button-text text-primary hover:text-primary-dark flex items-center"
          >
            <Icon name="PlayCircle" size={16} className="mr-1" />
            Continue
          </Link>
          <Link 
            to={`/learning-path-navigator?course=${course.id}`}
            className="button-text text-gray-700 hover:text-gray-900 flex items-center"
          >
            <Icon name="MoreHorizontal" size={16} className="mr-1" />
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;