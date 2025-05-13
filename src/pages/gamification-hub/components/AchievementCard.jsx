import React from "react";
import Icon from "../../../components/AppIcon";

const AchievementCard = ({ achievement }) => {
  // Format date earned
  const formatDateEarned = (dateString) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className={`bg-white border rounded-lg overflow-hidden transition-all duration-300 ${
      achievement.isCompleted 
        ? "border-gray-200 hover:shadow" 
        : "border-gray-200 opacity-75 hover:opacity-100"
    }`}>
      <div className="p-4">
        <div className="flex items-start">
          <div className={`rounded-full p-3 mr-3 ${achievement.iconBg} bg-opacity-10`}>
            <Icon 
              name={achievement.icon} 
              size={20} 
              className={achievement.isCompleted ? `text-${achievement.iconBg.split('-')[1]}` : "text-gray-400"} 
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="subheading text-gray-900">{achievement.title}</h3>
              {achievement.isCompleted && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-success text-white">
                  <Icon name="Check" size={12} className="mr-1" />
                  Earned
                </span>
              )}
            </div>
            <p className="body text-gray-700 mb-2">{achievement.description}</p>
            
            <div className="mb-2">
              <div className="flex justify-between items-center mb-1">
                <span className="caption text-gray-500">
                  {achievement.category}
                </span>
                {achievement.isCompleted ? (
                  <span className="badge-text text-success">
                    +{achievement.xpEarned} XP
                  </span>
                ) : (
                  <span className="badge-text text-gray-500">
                    +{achievement.xpReward} XP
                  </span>
                )}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    achievement.isCompleted 
                      ? "bg-success" 
                      : achievement.progress >= 50 
                        ? "bg-warning" :"bg-gray-300"
                  }`} 
                  style={{ width: `${achievement.progress}%` }}
                ></div>
              </div>
            </div>
            
            {achievement.isCompleted ? (
              <p className="caption text-gray-500">
                Earned on {formatDateEarned(achievement.dateEarned)}
              </p>
            ) : (
              achievement.currentProgress && achievement.totalNeeded && (
                <p className="caption text-gray-500">
                  Progress: {achievement.currentProgress}/{achievement.totalNeeded}
                </p>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;