import React from "react";

import Icon from "../../../components/AppIcon";

const UpcomingEvents = ({ events }) => {
  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
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
      case 'live-session':
        return "Video";
      case 'deadline':
        return "Clock";
      case 'assessment':
        return "FileText";
      case 'meeting':
        return "Users";
      default:
        return "Calendar";
    }
  };

  // Get background color based on event type
  const getEventColor = (type) => {
    switch (type) {
      case 'live-session':
        return "bg-info bg-opacity-10";
      case 'deadline':
        return "bg-warning bg-opacity-10";
      case 'assessment':
        return "bg-primary bg-opacity-10";
      case 'meeting':
        return "bg-achievement bg-opacity-10";
      default:
        return "bg-gray-100";
    }
  };

  // Get text color based on event type
  const getEventTextColor = (type) => {
    switch (type) {
      case 'live-session':
        return "text-info";
      case 'deadline':
        return "text-warning";
      case 'assessment':
        return "text-primary";
      case 'meeting':
        return "text-achievement";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
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
            <p className="body text-gray-700">No upcoming events</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {sortedEvents.map((event) => (
              <li key={event.id} className="py-3">
                <div className="flex items-start">
                  <div className={`rounded-full p-2 mr-3 ${getEventColor(event.type)}`}>
                    <Icon 
                      name={getEventIcon(event.type)} 
                      size={16} 
                      className={getEventTextColor(event.type)} 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="body-large font-medium text-gray-900 truncate">
                      {event.title}
                    </p>
                    <div className="flex items-center mt-1">
                      <Icon 
                        name="Clock" 
                        size={14} 
                        className="text-gray-500 mr-1" 
                      />
                      <span className="badge-text text-gray-700">
                        {formatEventDate(event.date)}
                      </span>
                      {event.duration && (
                        <span className="badge-text ml-2 text-gray-700">
                          ({event.duration} min)
                        </span>
                      )}
                    </div>
                  </div>
                  <button className="ml-2 p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                    <Icon name="MoreVertical" size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        
        <div className="mt-4 text-center">
          <button className="button-text text-primary hover:text-primary-dark inline-flex items-center">
            <Icon name="Plus" size={16} className="mr-1" />
            Add New Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;