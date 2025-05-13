import React from "react";
import Icon from "../../../components/AppIcon";

const DailyChallenges = ({ challenges }) => {
  // Get time until challenges refresh
  const getTimeUntilRefresh = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const diffMs = tomorrow - now;
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${diffHrs}h ${diffMins}m`;
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="heading text-gray-900 flex items-center">
          <Icon name="Target" size={20} className="text-primary mr-2" />
          Daily Challenges
        </h2>
        <div className="flex items-center">
          <Icon name="RefreshCw" size={16} className="text-gray-500 mr-1" />
          <span className="badge-text text-gray-700">
            Refreshes in {getTimeUntilRefresh()}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <div 
              key={challenge.id} 
              className={`p-4 rounded-lg border ${
                challenge.isCompleted 
                  ? "bg-success bg-opacity-5 border-success border-opacity-20" :"bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-start">
                <div className={`rounded-full p-2 mr-3 ${
                  challenge.isCompleted 
                    ? "bg-success bg-opacity-20" :"bg-white"
                }`}>
                  <Icon 
                    name={challenge.icon} 
                    size={18} 
                    className={challenge.isCompleted ? "text-success" : "text-primary"} 
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="subheading text-gray-900">{challenge.title}</h3>
                    <span className="badge-text text-primary">
                      +{challenge.xpReward} XP
                    </span>
                  </div>
                  <p className="body text-gray-700 mb-3">{challenge.description}</p>
                  
                  <div className="flex justify-end">
                    {challenge.isCompleted ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-success text-white">
                        <Icon name="Check" size={14} className="mr-1" />
                        Completed
                      </span>
                    ) : (
                      <button className="button-text bg-primary hover:bg-primary-dark text-white px-3 py-1 rounded-md flex items-center transition-colors">
                        Start Challenge
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-primary bg-opacity-5 rounded-lg border border-primary border-opacity-20">
          <div className="flex items-start">
            <div className="rounded-full bg-primary bg-opacity-10 p-2 mr-3">
              <Icon name="Gift" size={18} className="text-primary" />
            </div>
            <div>
              <h3 className="subheading text-gray-900 mb-1">Complete All Challenges</h3>
              <p className="body text-gray-700 mb-2">
                Finish all daily challenges to earn a bonus reward!
              </p>
              <div className="flex items-center">
                <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                  <div 
                    className="h-2 rounded-full bg-primary" 
                    style={{ width: `${(challenges.filter(c => c.isCompleted).length / challenges.length) * 100}%` }}
                  ></div>
                </div>
                <span className="badge-text text-gray-700">
                  {challenges.filter(c => c.isCompleted).length}/{challenges.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyChallenges;