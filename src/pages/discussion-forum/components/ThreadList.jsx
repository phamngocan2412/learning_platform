import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const ThreadList = ({ threads, activeFilter, searchQuery }) => {
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
      }
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    } else {
      return new Intl.DateTimeFormat('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }).format(date);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {threads.length === 0 ? (
        <div className="p-8 text-center">
          <Icon name="Search" size={48} className="mx-auto mb-4 text-gray-400" />
          <h3 className="subheading text-gray-900 mb-2">No threads found</h3>
          {searchQuery ? (
            <p className="body text-gray-700">
              No discussions match your search for "{searchQuery}"
            </p>
          ) : (
            <p className="body text-gray-700">
              No discussions found in this category
            </p>
          )}
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {threads.map((thread) => (
            <li key={thread.id} className="p-4 hover:bg-gray-50 transition-colors">
              <Link to={`/discussion-forum?id=${thread.id}`} className="block">
                <div className="flex items-start">
                  <div className="mr-4">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src={thread.author.avatar}
                        alt={thread.author.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-1">
                      {thread.isPinned && (
                        <span className="mr-2 text-warning">
                          <Icon name="Pin" size={14} />
                        </span>
                      )}
                      <h3 className="subheading text-gray-900 mr-2 truncate">{thread.title}</h3>
                      {thread.isResolved && (
                        <span className="ml-auto flex-shrink-0 px-2 py-1 text-xs font-medium rounded-full bg-success text-white">
                          Resolved
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center text-gray-500 caption mb-2">
                      <span className="mr-2">{thread.author.name}</span>
                      <span className="mr-2">•</span>
                      <span>{formatDate(thread.lastActivity)}</span>
                      <span className="mx-2">•</span>
                      <span className="mr-2">{thread.course}</span>
                    </div>
                    
                    <p className="body text-gray-700 mb-3 line-clamp-2">
                      {thread.content.substring(0, 150)}...
                    </p>
                    
                    <div className="flex flex-wrap items-center">
                      {thread.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="mr-2 mb-2 px-2 py-1 bg-gray-100 text-gray-700 rounded-full caption"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center mt-3 text-gray-500 caption">
                      <div className="flex items-center mr-4">
                        <Icon name="Eye" size={14} className="mr-1" />
                        <span>{thread.views}</span>
                      </div>
                      <div className="flex items-center mr-4">
                        <Icon name="MessageSquare" size={14} className="mr-1" />
                        <span>{thread.replies}</span>
                      </div>
                      <div className="flex items-center">
                        <Icon name="ThumbsUp" size={14} className="mr-1" />
                        <span>{thread.likes}</span>
                      </div>
                      
                      {thread.hasInstructorReply && (
                        <div className="ml-auto flex items-center text-achievement">
                          <Icon name="Award" size={14} className="mr-1" />
                          <span>Instructor Reply</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ThreadList;