import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const ProgressSidebar = ({ courseData, userData }) => {
  // Calculate progress statistics
  const totalActivities = courseData.learningPath.reduce(
    (total, module) => total + module.activities.length, 0
  );
  
  const completedActivities = courseData.learningPath.reduce(
    (total, module) => total + module.activities.filter(a => a.status === "completed").length, 0
  );
  
  const inProgressActivities = courseData.learningPath.reduce(
    (total, module) => total + module.activities.filter(a => a.status === "in-progress").length, 0
  );
  
  // Calculate skill statistics
  const totalSkills = [
    ...courseData.skillsAcquired,
    ...courseData.skillsInProgress,
    ...courseData.skillsUpcoming
  ].length;
  
  const skillsAcquiredPercentage = (courseData.skillsAcquired.length / totalSkills) * 100;
  const skillsInProgressPercentage = (courseData.skillsInProgress.length / totalSkills) * 100;
  
  return (
    <div className="space-y-6">
      {/* Overall Progress Card */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 bg-primary bg-opacity-5 border-b border-primary border-opacity-20">
          <h3 className="subheading text-gray-900 flex items-center">
            <Icon name="PieChart" size={18} className="text-primary mr-2" />
            Course Progress
          </h3>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="body text-gray-700">Overall Completion</span>
              <span className="badge-text text-gray-700">{courseData.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-primary" 
                style={{ width: `${courseData.progress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-gray-50 rounded-md p-3">
              <div className="flex items-center mb-1">
                <Icon name="CheckCircle" size={14} className="text-success mr-1" />
                <span className="caption text-gray-700">Completed</span>
              </div>
              <p className="subheading text-gray-900">{completedActivities}/{totalActivities}</p>
            </div>
            <div className="bg-gray-50 rounded-md p-3">
              <div className="flex items-center mb-1">
                <Icon name="Clock" size={14} className="text-primary mr-1" />
                <span className="caption text-gray-700">In Progress</span>
              </div>
              <p className="subheading text-gray-900">{inProgressActivities}/{totalActivities}</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div className="flex items-center">
              <Icon name="Calendar" size={14} className="mr-1" />
              <span className="caption">Started: {new Date(courseData.startDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <Icon name="Flag" size={14} className="mr-1" />
              <span className="caption">Est. completion: {new Date(courseData.estimatedCompletion).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Skills Development Card */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="subheading text-gray-900 flex items-center">
            <Icon name="Award" size={18} className="text-primary mr-2" />
            Skills Development
          </h3>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="body text-gray-700">Skills Mastered</span>
              <span className="badge-text text-gray-700">{courseData.skillsAcquired.length}/{totalSkills}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-success" 
                style={{ width: `${skillsAcquiredPercentage}%` }}
              ></div>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="body text-gray-700">Skills In Progress</span>
              <span className="badge-text text-gray-700">{courseData.skillsInProgress.length}/{totalSkills}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-warning" 
                style={{ width: `${skillsInProgressPercentage}%` }}
              ></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="body font-medium text-gray-900 mb-2">Acquired Skills</h4>
            <div className="flex flex-wrap gap-2">
              {courseData.skillsAcquired.map((skill, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success bg-opacity-10 text-success"
                >
                  <Icon name="Check" size={12} className="mr-1" />
                  {skill}
                </span>
              ))}
            </div>
            
            <h4 className="body font-medium text-gray-900 mb-2 mt-3">Skills In Progress</h4>
            <div className="flex flex-wrap gap-2">
              {courseData.skillsInProgress.map((skill, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warning bg-opacity-10 text-warning"
                >
                  <Icon name="Clock" size={12} className="mr-1" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions Card */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="subheading text-gray-900 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <Link 
            to="/student-dashboard" 
            className="flex flex-col items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Icon name="Home" size={24} className="text-primary mb-2" />
            <span className="button-text text-gray-700 text-center">Dashboard</span>
          </Link>
          <Link 
            to="/video-lesson-player" 
            className="flex flex-col items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Icon name="Play" size={24} className="text-primary mb-2" />
            <span className="button-text text-gray-700 text-center">Resume</span>
          </Link>
          <Link 
            to="/interactive-quiz" 
            className="flex flex-col items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Icon name="CheckSquare" size={24} className="text-primary mb-2" />
            <span className="button-text text-gray-700 text-center">Practice Quiz</span>
          </Link>
          <Link 
            to="/discussion-forum" 
            className="flex flex-col items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Icon name="MessageSquare" size={24} className="text-primary mb-2" />
            <span className="button-text text-gray-700 text-center">Discussions</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProgressSidebar;