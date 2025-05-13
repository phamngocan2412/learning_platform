import React from "react";
import Icon from "../../../components/AppIcon";

const QuickStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white rounded-lg shadow p-4 flex items-center">
        <div className="rounded-full bg-achievement bg-opacity-10 p-3 mr-4">
          <Icon name="Award" size={24} className="text-achievement" />
        </div>
        <div>
          <p className="body text-gray-700">Achievements</p>
          <p className="display-small text-gray-900">{stats.achievements}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4 flex items-center">
        <div className="rounded-full bg-engagement bg-opacity-10 p-3 mr-4">
          <Icon name="Zap" size={24} className="text-engagement" />
        </div>
        <div>
          <p className="body text-gray-700">Day Streak</p>
          <p className="display-small text-gray-900">{stats.streakDays}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4 flex items-center">
        <div className="rounded-full bg-primary bg-opacity-10 p-3 mr-4">
          <Icon name="Star" size={24} className="text-primary" />
        </div>
        <div>
          <p className="body text-gray-700">Points Earned</p>
          <p className="display-small text-gray-900">{stats.points}</p>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;