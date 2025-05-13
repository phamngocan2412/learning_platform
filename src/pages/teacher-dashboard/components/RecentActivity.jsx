import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const RecentActivity = ({ activities }) => {
  // Sort activities by timestamp (most recent first)
  const sortedActivities = [...activities].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  // Format date for display
  const formatActivityDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    
    if (diffDays > 0) {
      return `${diffDays}d ago`;
    } else if (diffHours > 0) {
      return `${diffHours}h ago`;
    } else {
      return 'Just now';
    }
  };

  // Get icon based on activity type
  const getActivityIcon = (type, status) => {
    switch (type) {
      case 'submission':
        return status === "needs-review" ? "FileText" : "CheckCircle";
      case 'question':
        return status === "unanswered" ? "HelpCircle" : "MessageCircle";
      case 'discussion':
        return "MessageSquare";
      default:
        return "Bell";
    }
  };

  // Get background color based on activity type and status
  const getActivityColor = (type, status) => {
    if (type === 'submission' && status === "needs-review") {
      return "bg-warning bg-opacity-10";
    } else if (type === 'question' && status === "unanswered") {
      return "bg-error bg-opacity-10";
    } else if (type === 'discussion') {
      return "bg-info bg-opacity-10";
    } else if (status === "graded") {
      return "bg-success bg-opacity-10";
    } else {
      return "bg-gray-100";
    }
  };

  // Get text color based on activity type and status
  const getActivityTextColor = (type, status) => {
    if (type === 'submission' && status === "needs-review") {
      return "text-warning";
    } else if (type === 'question' && status === "unanswered") {
      return "text-error";
    } else if (type === 'discussion') {
      return "text-info";
    } else if (status === "graded") {
      return "text-success";
    } else {
      return "text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="subheading text-gray-900 flex items-center">
          <Icon name="Activity" size={18} className="text-primary mr-2" />
          Recent Activity
        </h3>
      </div>
      
      <div className="p-4">
        {sortedActivities.length === 0 ? (
          <div className="text-center py-6">
            <Icon name="Clock" size={32} className="mx-auto mb-2 text-gray-400" />
            <p className="body text-gray-700">No recent activity</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {sortedActivities.map((activity) => (
              <li key={activity.id} className="py-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <Image
                          src={activity.studentAvatar}
                          alt={activity.student}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className={`absolute -bottom-1 -right-1 rounded-full p-1 ${getActivityColor(activity.type, activity.status)}`}>
                        <Icon 
                          name={getActivityIcon(activity.type, activity.status)} 
                          size={12} 
                          className={getActivityTextColor(activity.type, activity.status)} 
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="body font-medium text-gray-900">
                      {activity.student}
                    </p>
                    <p className="caption text-gray-700">
                      {activity.content}
                    </p>
                    <div className="flex items-center mt-1">
                      <span className="badge-text text-gray-500">
                        {formatActivityDate(activity.timestamp)}
                      </span>
                      {activity.status === "needs-review" && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-warning bg-opacity-10 text-warning">
                          Needs Review
                        </span>
                      )}
                      {activity.status === "unanswered" && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-error bg-opacity-10 text-error">
                          Unanswered
                        </span>
                      )}
                      {activity.status === "graded" && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-success bg-opacity-10 text-success">
                          {activity.grade}
                        </span>
                      )}
                    </div>
                  </div>
                  <button className="ml-2 p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                    <Icon name="ArrowRight" size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        
        <div className="mt-4 text-center">
          <Link 
            to="/student-analytics" 
            className="button-text text-primary hover:text-primary-dark inline-flex items-center"
          >
            View All Activity
            <Icon name="ChevronRight" size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;