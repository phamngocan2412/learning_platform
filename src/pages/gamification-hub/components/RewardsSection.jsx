import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const RewardsSection = ({ rewards, userPoints }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Get unique reward categories
  const categories = ["All", ...new Set(rewards.map(reward => reward.category))];
  
  // Filter rewards by category
  const filteredRewards = selectedCategory === "All" 
    ? rewards 
    : rewards.filter(reward => reward.category === selectedCategory);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="heading text-gray-900 flex items-center">
          <Icon name="Gift" size={20} className="text-primary mr-2" />
          Rewards Store
        </h2>
        <div className="flex items-center">
          <Icon name="Star" size={16} className="text-primary mr-1" />
          <span className="badge-text text-gray-700">
            Your Points: {userPoints}
          </span>
        </div>
      </div>
      
      <div className="p-4 bg-gray-50 border-b border-gray-200 overflow-x-auto">
        <div className="flex space-x-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedCategory === category
                  ? "bg-primary text-white" :"bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRewards.map((reward) => (
            <div 
              key={reward.id} 
              className={`bg-white border rounded-lg overflow-hidden transition-all duration-300 ${
                reward.isUnlocked || userPoints >= reward.pointsCost
                  ? "border-gray-200 hover:shadow" 
                  : "border-gray-200 opacity-75"
              }`}
            >
              <div className="h-40 overflow-hidden">
                <Image
                  src={reward.image}
                  alt={reward.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="subheading text-gray-900">{reward.title}</h3>
                  {reward.isUnlocked ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-success text-white">
                      Unlocked
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      <Icon name="Star" size={12} className="text-primary mr-1" />
                      {reward.pointsCost}
                    </span>
                  )}
                </div>
                <p className="body text-gray-700 mb-3">{reward.description}</p>
                <div className="flex justify-between items-center">
                  <span className="badge-text text-gray-500">
                    {reward.category}
                  </span>
                  {reward.isUnlocked ? (
                    <button className="button-text bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md flex items-center transition-colors">
                      <Icon name="Settings" size={14} className="mr-1" />
                      Configure
                    </button>
                  ) : userPoints >= reward.pointsCost ? (
                    <button className="button-text bg-primary hover:bg-primary-dark text-white px-3 py-1 rounded-md flex items-center transition-colors">
                      <Icon name="Unlock" size={14} className="mr-1" />
                      Unlock
                    </button>
                  ) : (
                    <button className="button-text bg-gray-100 text-gray-400 px-3 py-1 rounded-md flex items-center cursor-not-allowed">
                      <Icon name="Lock" size={14} className="mr-1" />
                      Locked
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RewardsSection;