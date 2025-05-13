import React from "react";
import Icon from "../../../components/AppIcon";

const LevelProgress = ({ currentXp, nextLevelXp, level }) => {
  const progressPercentage = (currentXp / nextLevelXp) * 100;
  const xpRemaining = nextLevelXp - currentXp;

  return (
    <div className="mb-2">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center">
          <Icon name="Star" size={16} className="text-primary mr-1" />
          <span className="body text-gray-700">{currentXp} / {nextLevelXp} XP</span>
        </div>
        <span className="badge-text text-gray-700">
          {xpRemaining} XP to Level {level + 1}
        </span>
      </div>
      <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
        
        {/* Milestone markers */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between px-1 pointer-events-none">
          {[25, 50, 75].map(milestone => (
            <div 
              key={milestone}
              className={`h-3 w-0.5 ${progressPercentage >= milestone ? 'bg-white' : 'bg-gray-400'}`}
              style={{ left: `${milestone}%` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LevelProgress;