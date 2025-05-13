import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const PathVisualization = ({ learningPath, selectedModuleId, onModuleSelect }) => {
  // Group modules by type for better organization
  const coreModules = learningPath.filter(module => module.type === "core");
  const optionalModules = learningPath.filter(module => module.type === "optional");
  const remedialModules = learningPath.filter(module => module.type === "remedial");

  // Helper function to get status icon and color
  const getStatusIconAndColor = (status, mastery) => {
    switch (status) {
      case "completed":
        return {
          icon: "CheckCircle",
          color: "text-success",
          bgColor: "bg-success bg-opacity-10"
        };
      case "in-progress":
        return {
          icon: "Clock",
          color: "text-primary",
          bgColor: "bg-primary bg-opacity-10"
        };
      case "not-started":
        return {
          icon: "Circle",
          color: "text-gray-400",
          bgColor: "bg-gray-100"
        };
      default:
        return {
          icon: "HelpCircle",
          color: "text-gray-500",
          bgColor: "bg-gray-100"
        };
    }
  };

  // Helper function to get mastery color
  const getMasteryColor = (mastery) => {
    if (mastery >= 90) return "bg-success";
    if (mastery >= 70) return "bg-primary";
    if (mastery >= 40) return "bg-warning";
    if (mastery > 0) return "bg-error";
    return "bg-gray-200";
  };

  // Helper function to get module type icon and color
  const getModuleTypeIconAndColor = (type) => {
    switch (type) {
      case "core":
        return {
          icon: "BookOpen",
          color: "text-primary"
        };
      case "optional":
        return {
          icon: "Star",
          color: "text-achievement"
        };
      case "remedial":
        return {
          icon: "LifeBuoy",
          color: "text-warning"
        };
      default:
        return {
          icon: "File",
          color: "text-gray-500"
        };
    }
  };

  return (
    <div className="relative py-6 overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Main path (core modules) */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 transform -translate-y-1/2 z-0"></div>
          
          {/* Core modules */}
          <div className="flex justify-between relative z-10">
            {coreModules.map((module, index) => {
              const { icon, color, bgColor } = getStatusIconAndColor(module.status, module.mastery);
              const isSelected = module.id === selectedModuleId;
              
              return (
                <div key={module.id} className="flex flex-col items-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onModuleSelect(module.id)}
                    className={`relative w-16 h-16 rounded-full flex items-center justify-center mb-2 ${bgColor} ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                  >
                    <Icon name={icon} size={24} className={color} />
                    {module.mastery > 0 && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white flex items-center justify-center border-2 border-white">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: `conic-gradient(${getMasteryColor(module.mastery)} ${module.mastery}%, transparent 0)` }}>
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        </div>
                      </div>
                    )}
                  </motion.button>
                  
                  <div className="text-center">
                    <p className="body font-medium text-gray-900 mb-1">{module.title}</p>
                    <p className="caption text-gray-500">
                      {module.estimatedHours} hrs • {module.activities.length} activities
                    </p>
                  </div>
                  
                  {/* Optional and remedial branches */}
                  {(optionalModules.some(m => m.prerequisite === module.id) || 
                    remedialModules.some(m => m.prerequisite === module.id)) && (
                    <div className="mt-4 flex flex-col items-center">
                      <div className="h-8 w-px bg-gray-200"></div>
                      <div className="flex space-x-4 mt-2">
                        {optionalModules
                          .filter(m => m.prerequisite === module.id)
                          .map(optModule => {
                            const optStatus = getStatusIconAndColor(optModule.status);
                            const { icon: typeIcon, color: typeColor } = getModuleTypeIconAndColor(optModule.type);
                            const isOptSelected = optModule.id === selectedModuleId;
                            
                            return (
                              <div key={optModule.id} className="flex flex-col items-center">
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => onModuleSelect(optModule.id)}
                                  className={`relative w-12 h-12 rounded-full flex items-center justify-center mb-2 ${optStatus.bgColor} border border-dashed border-achievement ${isOptSelected ? 'ring-2 ring-achievement ring-offset-2' : ''}`}
                                >
                                  <Icon name={typeIcon} size={18} className={typeColor} />
                                </motion.button>
                                <p className="caption text-gray-700 text-center max-w-[100px]">{optModule.title}</p>
                              </div>
                            );
                          })}
                        
                        {remedialModules
                          .filter(m => m.prerequisite === module.id)
                          .map(remModule => {
                            const remStatus = getStatusIconAndColor(remModule.status);
                            const { icon: typeIcon, color: typeColor } = getModuleTypeIconAndColor(remModule.type);
                            const isRemSelected = remModule.id === selectedModuleId;
                            
                            return (
                              <div key={remModule.id} className="flex flex-col items-center">
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => onModuleSelect(remModule.id)}
                                  className={`relative w-12 h-12 rounded-full flex items-center justify-center mb-2 ${remStatus.bgColor} border border-dashed border-warning ${isRemSelected ? 'ring-2 ring-warning ring-offset-2' : ''}`}
                                >
                                  <Icon name={typeIcon} size={18} className={typeColor} />
                                </motion.button>
                                <p className="caption text-gray-700 text-center max-w-[100px]">{remModule.title}</p>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathVisualization;