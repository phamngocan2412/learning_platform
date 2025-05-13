import React, { useState } from "react";
import Icon from "../../../../components/AppIcon";

const MatchingQuestion = ({ question, matches, onChange, disabled }) => {
  // Track the currently selected item for matching
  const [selectedItem, setSelectedItem] = useState(null);
  
  const handleItemClick = (itemId) => {
    if (disabled) return;
    setSelectedItem(itemId);
  };
  
  const handleMatchClick = (matchId) => {
    if (disabled || !selectedItem) return;
    
    // Update the matches
    const newMatches = { ...matches, [selectedItem]: matchId };
    onChange(newMatches);
    setSelectedItem(null);
  };
  
  // Check if an item has been matched
  const isItemMatched = (itemId) => {
    return Object.keys(matches).includes(itemId);
  };
  
  // Check if a match has been used
  const isMatchUsed = (matchId) => {
    return Object.values(matches).includes(matchId);
  };
  
  // Get the match for an item
  const getMatchForItem = (itemId) => {
    return matches[itemId];
  };
  
  // Get the item for a match
  const getItemForMatch = (matchId) => {
    return Object.keys(matches).find(key => matches[key] === matchId);
  };
  
  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column - Items */}
        <div>
          <h3 className="body-large font-medium text-gray-900 mb-3">Items</h3>
          <div className="space-y-3">
            {question.items.map(item => (
              <div 
                key={item.id}
                className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedItem === item.id
                    ? "border-primary bg-primary bg-opacity-5"
                    : isItemMatched(item.id)
                    ? "border-success bg-success bg-opacity-5" :"border-gray-200 hover:border-gray-300"
                } ${disabled ? "opacity-80" : ""}`}
                onClick={() => handleItemClick(item.id)}
              >
                <span className="body-large text-gray-900 flex-1">{item.text}</span>
                {isItemMatched(item.id) && (
                  <div className="flex items-center">
                    <Icon name="ArrowRight" size={16} className="text-success mx-2" />
                    <span className="badge-text bg-success bg-opacity-10 text-success px-2 py-1 rounded-full">
                      {getMatchForItem(item.id)}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Right column - Matches */}
        <div>
          <h3 className="body-large font-medium text-gray-900 mb-3">Descriptions</h3>
          <div className="space-y-3">
            {question.matches.map(match => (
              <div 
                key={match.id}
                className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedItem && !isMatchUsed(match.id)
                    ? "border-primary bg-primary bg-opacity-5"
                    : isMatchUsed(match.id)
                    ? "border-success bg-success bg-opacity-5" :"border-gray-200 hover:border-gray-300"
                } ${disabled ? "opacity-80" : ""}`}
                onClick={() => handleMatchClick(match.id)}
              >
                {isMatchUsed(match.id) && (
                  <div className="flex items-center mr-2">
                    <span className="badge-text bg-success bg-opacity-10 text-success px-2 py-1 rounded-full">
                      {getItemForMatch(match.id)}
                    </span>
                    <Icon name="ArrowRight" size={16} className="text-success mx-2" />
                  </div>
                )}
                <span className="body-large text-gray-900">{match.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="body text-gray-700">
          <Icon name="Info" size={16} className="inline-block mr-1 text-info" />
          {selectedItem 
            ? "Now select a matching description from the right column" :"Select an item from the left column, then match it with its description"}
        </p>
      </div>
    </div>
  );
};

export default MatchingQuestion;