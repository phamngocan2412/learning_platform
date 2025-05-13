import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const PathLegend = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-gray-700 hover:text-primary transition-colors"
      >
        <Icon name="HelpCircle" size={16} className="mr-1" />
        <span className="button-text">Legend</span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg z-20 p-4">
          <h4 className="body font-medium text-gray-900 mb-3">Path Legend</h4>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-success bg-opacity-10 flex items-center justify-center mr-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
              </div>
              <span className="body text-gray-700">Completed</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-2">
                <Icon name="Clock" size={16} className="text-primary" />
              </div>
              <span className="body text-gray-700">In Progress</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                <Icon name="Circle" size={16} className="text-gray-400" />
              </div>
              <span className="body text-gray-700">Not Started</span>
            </div>
            
            <div className="border-t border-gray-200 pt-2 mt-2"></div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2">
                <Icon name="BookOpen" size={16} className="text-primary" />
              </div>
              <span className="body text-gray-700">Core Module</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full border border-dashed border-achievement flex items-center justify-center mr-2">
                <Icon name="Star" size={16} className="text-achievement" />
              </div>
              <span className="body text-gray-700">Optional Deep Dive</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full border border-dashed border-warning flex items-center justify-center mr-2">
                <Icon name="LifeBuoy" size={16} className="text-warning" />
              </div>
              <span className="body text-gray-700">Remedial Content</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PathLegend;