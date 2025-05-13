import React from "react";
import Icon from "../../../components/AppIcon";

const CourseRoadmap = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 bg-primary bg-opacity-5 border-b border-primary border-opacity-20">
        <h2 className="heading text-gray-900 flex items-center">
          <Icon name="Map" size={20} className="text-primary mr-2" />
          Course Roadmap
        </h2>
      </div>
      
      <div className="p-4 md:p-6">
        <div className="mb-6">
          <h3 className="subheading text-gray-900 mb-2">Your Learning Path</h3>
          <p className="body text-gray-700">
            This roadmap outlines your journey through the course. Each module builds upon the previous one, gradually developing your skills and knowledge.
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          {/* Modules */}
          <div className="space-y-6">
            {course.modules.map((module, index) => (
              <div key={module.id} className="flex flex-col md:flex-row">
                {/* Module number (desktop) */}
                <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-primary bg-opacity-10 text-primary font-bold text-xl relative z-10">
                  {index + 1}
                </div>
                
                {/* Module content */}
                <div className={`flex-1 md:ml-6 ${index !== course.modules.length - 1 ? 'pb-6 md:pb-0' : ''}`}>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    {/* Module number (mobile) */}
                    <div className="md:hidden flex items-center mb-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary bg-opacity-10 text-primary font-bold text-sm mr-2">
                        {index + 1}
                      </div>
                      <span className="badge-text text-gray-500">Module {index + 1}</span>
                    </div>
                    
                    <h4 className="body-large font-medium text-gray-900 mb-2">{module.title}</h4>
                    
                    <div className="flex flex-wrap gap-3 mb-3">
                      <div className="flex items-center">
                        <Icon name="Clock" size={14} className="text-gray-500 mr-1" />
                        <span className="badge-text text-gray-700">{module.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Icon name="BookOpen" size={14} className="text-gray-500 mr-1" />
                        <span className="badge-text text-gray-700">{module.lessons} lessons</span>
                      </div>
                    </div>
                    
                    <p className="body text-gray-700">{module.description}</p>
                    
                    {/* Module highlights */}
                    {index === 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="flex items-center">
                          <Icon name="Star" size={16} className="text-warning mr-2" />
                          <p className="badge-text text-gray-700">Foundation module - essential for all future content</p>
                        </div>
                      </div>
                    )}
                    
                    {index === course.modules.length - 1 && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="flex items-center">
                          <Icon name="Award" size={16} className="text-achievement mr-2" />
                          <p className="badge-text text-gray-700">Capstone project - showcase your skills</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 bg-success bg-opacity-5 rounded-lg p-4">
          <div className="flex items-start">
            <Icon name="Calendar" size={20} className="text-success mt-1 mr-3" />
            <div>
              <h4 className="body-large font-medium text-gray-900 mb-1">Recommended Schedule</h4>
              <p className="body text-gray-700">
                To complete this course successfully, we recommend dedicating 6-8 hours per week. This allows time for watching lectures, completing exercises, and working on projects.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-warning bg-opacity-5 rounded-lg p-4">
          <div className="flex items-start">
            <Icon name="AlertTriangle" size={20} className="text-warning mt-1 mr-3" />
            <div>
              <h4 className="body-large font-medium text-gray-900 mb-1">Important Note</h4>
              <p className="body text-gray-700">
                While you can learn at your own pace, we recommend completing modules in order as each builds on skills from previous sections.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseRoadmap;