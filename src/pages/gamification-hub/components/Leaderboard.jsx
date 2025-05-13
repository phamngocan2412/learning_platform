import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const Leaderboard = ({ leaderboardData }) => {
  const [timeFilter, setTimeFilter] = useState("week");
  const [activityFilter, setActivityFilter] = useState("points");

  // Get icon for rank change
  const getRankChangeIcon = (change) => {
    switch (change) {
      case "up":
        return <Icon name="TrendingUp" size={16} className="text-success" />;
      case "down":
        return <Icon name="TrendingDown" size={16} className="text-error" />;
      default:
        return <Icon name="Minus" size={16} className="text-gray-400" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="heading text-gray-900 flex items-center">
          <Icon name="BarChart2" size={20} className="text-primary mr-2" />
          Leaderboard
        </h2>
      </div>
      
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="flex space-x-2">
            <button
              onClick={() => setTimeFilter("day")}
              className={`px-3 py-1 rounded-full text-sm ${
                timeFilter === "day" ?"bg-primary text-white" :"bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setTimeFilter("week")}
              className={`px-3 py-1 rounded-full text-sm ${
                timeFilter === "week" ?"bg-primary text-white" :"bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setTimeFilter("month")}
              className={`px-3 py-1 rounded-full text-sm ${
                timeFilter === "month" ?"bg-primary text-white" :"bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              This Month
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setActivityFilter("points")}
              className={`px-3 py-1 rounded-full text-sm ${
                activityFilter === "points" ?"bg-primary text-white" :"bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Points
            </button>
            <button
              onClick={() => setActivityFilter("participation")}
              className={`px-3 py-1 rounded-full text-sm ${
                activityFilter === "participation" ?"bg-primary text-white" :"bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Participation
            </button>
            <button
              onClick={() => setActivityFilter("streak")}
              className={`px-3 py-1 rounded-full text-sm ${
                activityFilter === "streak" ?"bg-primary text-white" :"bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Streak
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {activityFilter === "points" ? "Points" : 
                   activityFilter === "participation" ? "Activities" : "Streak Days"}
                </th>
                <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaderboardData.map((user) => (
                <tr 
                  key={user.id} 
                  className={user.isCurrentUser ? "bg-primary bg-opacity-5" : ""}
                >
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      user.rank === 1 ? "bg-warning bg-opacity-10" :
                      user.rank === 2 ? "bg-gray-200" :
                      user.rank === 3 ? "bg-achievement bg-opacity-10" : "bg-gray-100"
                    }`}>
                      <span className={`text-sm font-medium ${
                        user.rank === 1 ? "text-warning" :
                        user.rank === 2 ? "text-gray-600" :
                        user.rank === 3 ? "text-achievement" : "text-gray-500"
                      }`}>
                        {user.rank}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name} {user.isCurrentUser && <span className="text-xs text-primary">(You)</span>}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-right">
                    <span className="text-sm font-medium text-gray-900">
                      {user.points}
                    </span>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-right">
                    {getRankChangeIcon(user.change)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 text-center">
          <button className="button-text text-primary hover:text-primary-dark inline-flex items-center">
            View Full Leaderboard
            <Icon name="ChevronRight" size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;