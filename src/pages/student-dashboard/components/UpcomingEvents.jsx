import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const UpcomingEvents = ({ events }) => {
  // Sort events by due date/start time
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.dueDate || a.startTime);
    const dateB = new Date(b.dueDate || b.startTime);
    return dateA - dateB;
  });

  // Format date for display
  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(date);
  };

  // Get icon based on event type
  const getEventIcon = (type) => {
    switch (type) {
      case 'assignment':
        return "FileText";
      case 'live':
        return "Video";
      case 'quiz':
        return "CheckSquare";
      default:
        return "Calendar";
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return "text-error";
      case 'medium':
        return "text-warning";
      case 'low':
        return "text-info";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="subheading text-gray-900 flex items-center">
          <Icon name="Calendar" size={18} className="text-primary mr-2" />
          Upcoming Events
        </h3>
      </div>
      
      <div className="p-4">
        {sortedEvents.length === 0 ? (
          <div className="text-center py-6">
            <Icon name="Check" size={32} className="mx-auto mb-2 text-success" />
            <p className="body text-gray-700">You're all caught up!</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {sortedEvents.map((event) => (
              <li key={event.id} className="py-3">
                <div className="flex items-start">
                  <div className={`rounded-full p-2 mr-3 ${
                    event.type === 'assignment' ? 'bg-error bg-opacity-10' :
                    event.type === 'live'? 'bg-info bg-opacity-10' : 'bg-warning bg-opacity-10'
                  }`}>
                    <Icon 
                      name={getEventIcon(event.type)} 
                      size={16} 
                      className={
                        event.type === 'assignment' ? 'text-error' :
                        event.type === 'live'? 'text-info' : 'text-warning'
                      } 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="body-large font-medium text-gray-900 truncate">
                      {event.title}
                    </p>
                    <p className="caption text-gray-700 mb-1">
                      {event.course}
                    </p>
                    <div className="flex items-center">
                      <Icon 
                        name="Clock" 
                        size={14} 
                        className={getPriorityColor(event.priority)} 
                      />
                      <span className="badge-text ml-1 text-gray-700">
                        {formatEventDate(event.dueDate || event.startTime)}
                      </span>
                      {event.type === 'live' && (
                        <span className="badge-text ml-2 text-gray-700">
                          ({event.duration} min)
                        </span>
                      )}
                    </div>
                  </div>
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
            View All Events
            <Icon name="ChevronRight" size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;