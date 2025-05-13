import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const RecentActivity = ({ discussions }) => {
  // Sort discussions by last activity (most recent first)
  const sortedDiscussions = [...discussions].sort(
    (a, b) => new Date(b.lastActivity) - new Date(a.lastActivity)
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

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mt-6">
      <div className="p-4 border-b border-gray-200">
        <h3 className="subheading text-gray-900 flex items-center">
          <Icon name="MessageSquare" size={18} className="text-primary mr-2" />
          Recent Discussions
        </h3>
      </div>
      
      <div className="p-4">
        {sortedDiscussions.length === 0 ? (
          <div className="text-center py-6">
            <Icon name="MessageCircle" size={32} className="mx-auto mb-2 text-gray-400" />
            <p className="body text-gray-700">No recent discussions</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {sortedDiscussions.map((discussion) => (
              <li key={discussion.id} className="py-3">
                <Link 
                  to={`/discussion-forum?id=${discussion.id}`}
                  className="block hover:bg-gray-50 -mx-4 px-4 py-2 rounded-md transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <p className="body-large font-medium text-gray-900 truncate">
                        {discussion.title}
                      </p>
                      <p className="caption text-gray-700">
                        {discussion.course}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="badge-text text-gray-500">
                        {formatActivityDate(discussion.lastActivity)}
                      </span>
                      {discussion.unreadReplies > 0 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary text-white mt-1">
                          {discussion.unreadReplies} new
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
        
        <div className="mt-4 text-center">
          <Link 
            to="/discussion-forum" 
            className="button-text text-primary hover:text-primary-dark inline-flex items-center"
          >
            View All Discussions
            <Icon name="ChevronRight" size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;