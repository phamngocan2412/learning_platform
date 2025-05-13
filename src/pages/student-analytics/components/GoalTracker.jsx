import React, { useState } from "react";

import Icon from "../../../components/AppIcon";

const GoalTracker = ({ goals }) => {
  const [activeTab, setActiveTab] = useState("active");
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };
  
  // Get icon based on goal type
  const getGoalIcon = (type) => {
    switch (type) {
      case 'course':
        return "BookOpen";
      case 'habit':
        return "Repeat";
      case 'skill':
        return "Target";
      case 'assignment':
        return "FileText";
      case 'engagement':
        return "Users";
      default:
        return "Flag";
    }
  };
  
  // Calculate days remaining until deadline
  const getDaysRemaining = (deadlineString) => {
    const today = new Date();
    const deadline = new Date(deadlineString);
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="subheading text-gray-900 flex items-center">
          <Icon name="Flag" size={18} className="text-primary mr-2" />
          Goal Tracker
        </h3>
      </div>
      
      <div className="p-4">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-4">
          <button
            className={`py-2 px-4 button-text ${
              activeTab === "active" ?"text-primary border-b-2 border-primary" :"text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("active")}
          >
            Active Goals
          </button>
          <button
            className={`py-2 px-4 button-text ${
              activeTab === "completed" 
                ? "text-primary border-b-2 border-primary" :"text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </button>
          <button
            className={`py-2 px-4 button-text ${
              activeTab === "suggested" ?"text-primary border-b-2 border-primary" :"text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("suggested")}
          >
            Suggested
          </button>
        </div>
        
        {/* Active Goals */}
        {activeTab === "active" && (
          <div className="space-y-4">
            {goals.active.length === 0 ? (
              <div className="text-center py-6">
                <Icon name="Flag" size={32} className="mx-auto mb-2 text-gray-400" />
                <p className="body text-gray-700">No active goals</p>
                <button className="mt-2 button-text text-primary hover:text-primary-dark">
                  Set a new goal
                </button>
              </div>
            ) : (
              goals.active.map(goal => {
                const daysRemaining = getDaysRemaining(goal.deadline);
                const isUrgent = daysRemaining <= 7;
                
                return (
                  <div key={goal.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className={`rounded-full p-2 mr-3 ${
                        goal.type === 'course' ? 'bg-primary bg-opacity-10' :
                        goal.type === 'habit' ? 'bg-engagement bg-opacity-10' :
                        goal.type === 'skill'? 'bg-achievement bg-opacity-10' : 'bg-info bg-opacity-10'
                      }`}>
                        <Icon 
                          name={getGoalIcon(goal.type)} 
                          size={16} 
                          className={
                            goal.type === 'course' ? 'text-primary' :
                            goal.type === 'habit' ? 'text-engagement' :
                            goal.type === 'skill'? 'text-achievement' : 'text-info'
                          } 
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <p className="body-large font-medium text-gray-900">{goal.title}</p>
                          {isUrgent ? (
                            <span className="badge-text text-error flex items-center">
                              <Icon name="Clock" size={12} className="mr-1" />
                              {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} left
                            </span>
                          ) : (
                            <span className="badge-text text-gray-500">
                              Due {formatDate(goal.deadline)}
                            </span>
                          )}
                        </div>
                        
                        <div className="mt-2">
                          <div className="flex justify-between items-center mb-1">
                            <span className="badge-text text-gray-700">Progress</span>
                            <span className="badge-text text-gray-700">{goal.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                goal.progress >= 75 ? 'bg-success' :
                                goal.progress >= 40 ? 'bg-primary': 'bg-warning'
                              }`} 
                              style={{ width: `${goal.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
        
        {/* Completed Goals */}
        {activeTab === "completed" && (
          <div className="space-y-4">
            {goals.completed.length === 0 ? (
              <div className="text-center py-6">
                <Icon name="CheckCircle" size={32} className="mx-auto mb-2 text-gray-400" />
                <p className="body text-gray-700">No completed goals yet</p>
              </div>
            ) : (
              goals.completed.map(goal => (
                <div key={goal.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="rounded-full bg-success bg-opacity-10 p-2 mr-3">
                      <Icon name="CheckCircle" size={16} className="text-success" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <p className="body-large font-medium text-gray-900">{goal.title}</p>
                        <span className="badge-text text-gray-500">
                          Completed {formatDate(goal.completedDate)}
                        </span>
                      </div>
                      <p className="badge-text text-gray-700 mt-1">
                        <Icon name={getGoalIcon(goal.type)} size={12} className="inline mr-1" />
                        {goal.type.charAt(0).toUpperCase() + goal.type.slice(1)} goal
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        
        {/* Suggested Goals */}
        {activeTab === "suggested" && (
          <div className="space-y-4">
            {goals.suggested.length === 0 ? (
              <div className="text-center py-6">
                <Icon name="Lightbulb" size={32} className="mx-auto mb-2 text-gray-400" />
                <p className="body text-gray-700">No goal suggestions available</p>
              </div>
            ) : (
              goals.suggested.map(goal => (
                <div key={goal.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className={`rounded-full p-2 mr-3 ${
                      goal.type === 'course' ? 'bg-primary bg-opacity-10' :
                      goal.type === 'habit' ? 'bg-engagement bg-opacity-10' :
                      goal.type === 'skill'? 'bg-achievement bg-opacity-10' : 'bg-info bg-opacity-10'
                    }`}>
                      <Icon 
                        name={getGoalIcon(goal.type)} 
                        size={16} 
                        className={
                          goal.type === 'course' ? 'text-primary' :
                          goal.type === 'habit' ? 'text-engagement' :
                          goal.type === 'skill'? 'text-achievement' : 'text-info'
                        } 
                      />
                    </div>
                    <div className="flex-1">
                      <p className="body-large font-medium text-gray-900">{goal.title}</p>
                      <p className="caption text-gray-700 mt-1">{goal.description}</p>
                      <button className="mt-2 button-text text-primary hover:text-primary-dark flex items-center">
                        <Icon name="Plus" size={14} className="mr-1" />
                        Add this goal
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        
        {/* Add New Goal Button */}
        <div className="mt-4">
          <button className="w-full py-2 px-4 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors button-text flex items-center justify-center">
            <Icon name="Plus" size={16} className="mr-2" />
            Create New Goal
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalTracker;