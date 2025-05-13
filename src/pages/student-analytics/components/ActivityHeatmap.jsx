import React from "react";
import Icon from "../../../components/AppIcon";

const ActivityHeatmap = ({ data, timeframe }) => {
  // Function to determine cell color based on activity level
  const getCellColor = (value) => {
    if (value === 0) return "bg-gray-100";
    if (value === 1) return "bg-primary bg-opacity-20";
    if (value === 2) return "bg-primary bg-opacity-40";
    if (value === 3) return "bg-primary bg-opacity-60";
    return "bg-primary bg-opacity-80";
  };

  // Generate hours array for the header
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 === 0 ? 12 : i % 12;
    const ampm = i < 12 ? 'AM' : 'PM';
    return `${hour}${ampm}`;
  });

  // Display only every 3 hours for better UI
  const displayHours = hours.filter((_, i) => i % 3 === 0);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
      <div className="p-4 border-b border-gray-200">
        <h2 className="heading text-gray-900 flex items-center">
          <Icon name="Clock" size={20} className="text-primary mr-2" />
          Activity Patterns
        </h2>
      </div>
      
      <div className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <p className="body-large text-gray-700">
            Discover your most productive study times based on your learning activity
          </p>
          
          <div className="flex items-center mt-2 md:mt-0">
            <div className="flex items-center space-x-1 mr-4">
              <div className="w-3 h-3 bg-gray-100 rounded"></div>
              <span className="badge-text text-gray-700">None</span>
            </div>
            <div className="flex items-center space-x-1 mr-4">
              <div className="w-3 h-3 bg-primary bg-opacity-20 rounded"></div>
              <span className="badge-text text-gray-700">Low</span>
            </div>
            <div className="flex items-center space-x-1 mr-4">
              <div className="w-3 h-3 bg-primary bg-opacity-40 rounded"></div>
              <span className="badge-text text-gray-700">Medium</span>
            </div>
            <div className="flex items-center space-x-1 mr-4">
              <div className="w-3 h-3 bg-primary bg-opacity-60 rounded"></div>
              <span className="badge-text text-gray-700">High</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-primary bg-opacity-80 rounded"></div>
              <span className="badge-text text-gray-700">Very High</span>
            </div>
          </div>
        </div>
        
        {/* Heatmap Visualization */}
        <div className="overflow-x-auto">
          <div className="min-w-max">
            {/* Hours header */}
            <div className="flex">
              <div className="w-20 flex-shrink-0"></div>
              <div className="flex-1 grid grid-cols-8">
                {displayHours.map((hour, i) => (
                  <div key={i} className="text-center">
                    <span className="badge-text text-gray-500">{hour}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Heatmap rows */}
            {data.weeklyPattern.map((dayData, dayIndex) => (
              <div key={dayIndex} className="flex mt-1">
                <div className="w-20 flex-shrink-0 flex items-center">
                  <span className="body text-gray-700">{dayData.day}</span>
                </div>
                <div className="flex-1 grid grid-cols-24 gap-1">
                  {Object.keys(dayData)
                    .filter(key => key.startsWith('hour'))
                    .map((hourKey, hourIndex) => (
                      <div 
                        key={hourKey} 
                        className={`h-8 rounded ${getCellColor(dayData[hourKey])}`}
                        title={`${dayData.day} at ${hourIndex}:00 - Activity level: ${dayData[hourKey]}`}
                      ></div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Productivity Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Icon name="Calendar" size={16} className="text-primary mr-2" />
              <p className="body text-gray-700">Most Productive Day</p>
            </div>
            <p className="subheading text-gray-900">{data.mostProductiveDay}</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Icon name="Clock" size={16} className="text-primary mr-2" />
              <p className="body text-gray-700">Peak Productivity Time</p>
            </div>
            <p className="subheading text-gray-900">{data.mostProductiveTime}</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Icon name="BookOpen" size={16} className="text-primary mr-2" />
              <p className="body text-gray-700">Total Study Hours</p>
            </div>
            <p className="subheading text-gray-900">{data.totalStudyHours[timeframe]} hrs</p>
          </div>
        </div>
        
        {/* Recommendations based on activity patterns */}
        <div className="mt-6 bg-primary bg-opacity-5 rounded-lg p-4 border border-primary border-opacity-20">
          <div className="flex items-start">
            <div className="rounded-full bg-primary bg-opacity-10 p-2 mr-3">
              <Icon name="Lightbulb" size={18} className="text-primary" />
            </div>
            <div>
              <p className="body-large font-medium text-gray-900 mb-1">Productivity Insight</p>
              <p className="body text-gray-700">
                Your data shows you're most productive on {data.mostProductiveDay}s between {data.mostProductiveTime}. 
                Consider scheduling challenging tasks during these peak productivity periods for optimal learning outcomes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityHeatmap;