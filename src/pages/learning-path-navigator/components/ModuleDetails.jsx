import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const ModuleDetails = ({ module, courseId }) => {
  // Helper function to get activity type icon
  const getActivityTypeIcon = (type) => {
    switch (type) {
      case "video":
        return "PlayCircle";
      case "reading":
        return "BookOpen";
      case "interactive":
        return "MousePointer";
      case "quiz":
        return "CheckSquare";
      case "project":
        return "Briefcase";
      default:
        return "File";
    }
  };

  // Helper function to get activity status icon and color
  const getActivityStatusIconAndColor = (status) => {
    switch (status) {
      case "completed":
        return {
          icon: "CheckCircle",
          color: "text-success",
          bgColor: "bg-success bg-opacity-10"
        };
      case "in-progress":
        return {
          icon: "Clock",
          color: "text-primary",
          bgColor: "bg-primary bg-opacity-10"
        };
      case "not-started":
        return {
          icon: "Circle",
          color: "text-gray-400",
          bgColor: "bg-gray-100"
        };
      default:
        return {
          icon: "HelpCircle",
          color: "text-gray-500",
          bgColor: "bg-gray-100"
        };
    }
  };

  // Helper function to get module type badge
  const getModuleTypeBadge = (type) => {
    switch (type) {
      case "core":
        return {
          text: "Core Module",
          color: "bg-primary text-white"
        };
      case "optional":
        return {
          text: "Optional Deep Dive",
          color: "bg-achievement text-white"
        };
      case "remedial":
        return {
          text: "Remedial Content",
          color: "bg-warning text-white"
        };
      default:
        return {
          text: "Module",
          color: "bg-gray-500 text-white"
        };
    }
  };

  const typeBadge = getModuleTypeBadge(module.type);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          <h2 className="heading text-gray-900">{module.title}</h2>
          <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${typeBadge.color}`}>
            {typeBadge.text}
          </span>
        </div>
        <div className="flex items-center">
          <span className="body text-gray-700 mr-2">Mastery:</span>
          <div className="w-24 bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                module.mastery >= 90 ? 'bg-success' :
                module.mastery >= 70 ? 'bg-primary' :
                module.mastery >= 40 ? 'bg-warning' :
                module.mastery > 0 ? 'bg-error' : 'bg-gray-200'
              }`} 
              style={{ width: `${module.mastery}%` }}
            ></div>
          </div>
          <span className="ml-2 badge-text text-gray-700">{module.mastery}%</span>
        </div>
      </div>
      
      <div className="p-4 md:p-6">
        <div className="mb-4">
          <p className="body-large text-gray-700 mb-2">{module.description}</p>
          <div className="flex items-center text-gray-500">
            <Icon name="Clock" size={16} className="mr-1" />
            <span className="body text-gray-700">Estimated time: {module.estimatedHours} hours</span>
          </div>
        </div>
        
        <h3 className="subheading text-gray-900 mb-3">Activities</h3>
        <ul className="divide-y divide-gray-200">
          {module.activities.map((activity) => {
            const typeIcon = getActivityTypeIcon(activity.type);
            const { icon: statusIcon, color: statusColor, bgColor: statusBgColor } = getActivityStatusIconAndColor(activity.status);
            
            return (
              <li key={activity.id} className="py-3">
                <div className="flex items-center">
                  <div className={`rounded-full p-2 mr-3 ${statusBgColor}`}>
                    <Icon name={statusIcon} size={16} className={statusColor} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="body-large font-medium text-gray-900">
                          {activity.title}
                        </p>
                        <div className="flex items-center mt-1">
                          <div className="flex items-center mr-3">
                            <Icon name={typeIcon} size={14} className="text-gray-500 mr-1" />
                            <span className="caption text-gray-700 capitalize">
                              {activity.type}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Icon name="Clock" size={14} className="text-gray-500 mr-1" />
                            <span className="caption text-gray-700">
                              {activity.duration} min
                            </span>
                          </div>
                          {activity.score && (
                            <div className="flex items-center ml-3">
                              <Icon name="Award" size={14} className="text-achievement mr-1" />
                              <span className="caption text-gray-700">
                                Score: {activity.score}%
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <Link
                        to={activity.path}
                        className={`button-text px-3 py-1 rounded-md flex items-center ${
                          activity.status === "completed" ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' :
                          activity.status === "in-progress" ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <Icon 
                          name={
                            activity.status === "completed" ? "RefreshCw" :
                            activity.status === "in-progress" ? "Play" : "ArrowRight"
                          } 
                          size={16} 
                          className="mr-1" 
                        />
                        {activity.status === "completed" ? "Review" :
                         activity.status === "in-progress" ? "Continue" : "Start"}
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ModuleDetails;