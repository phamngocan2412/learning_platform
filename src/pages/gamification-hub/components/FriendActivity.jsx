import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const FriendActivity = ({ activities }) => {
  // Format activity timestamp
  const formatActivityTime = (dateString) => {
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

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="subheading text-gray-900 flex items-center">
          <Icon name="Users" size={18} className="text-primary mr-2" />
          Friend Activity
        </h3>
      </div>
      
      <div className="p-4">
        {activities.length === 0 ? (
          <div className="text-center py-6">
            <Icon name="Users" size={32} className="mx-auto mb-2 text-gray-400" />
            <p className="body text-gray-700">No recent friend activity</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {activities.map((activity) => (
              <li key={activity.id} className="py-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src={activity.avatar}
                        alt={activity.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="body text-gray-900">
                      <span className="font-medium">{activity.name}</span> earned the{' '}
                      <span className="font-medium text-achievement">{activity.achievement}</span> achievement
                    </p>
                    <p className="caption text-gray-500">
                      {formatActivityTime(activity.timestamp)}
                    </p>
                  </div>
                  <button className="ml-2 p-1 text-gray-400 hover:text-primary rounded-full">
                    <Icon name="ThumbsUp" size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        
        <div className="mt-4 text-center">
          <Link 
            to="/social-connections" 
            className="button-text text-primary hover:text-primary-dark inline-flex items-center"
          >
            Find More Friends
            <Icon name="ChevronRight" size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FriendActivity;