import React from "react";
import Icon from "../../../components/AppIcon";


const LearningObjectives = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 bg-primary bg-opacity-5 border-b border-primary border-opacity-20">
        <h2 className="heading text-gray-900 flex items-center">
          <Icon name="Target" size={20} className="text-primary mr-2" />
          Learning Objectives
        </h2>
      </div>
      
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/3 md:pr-6">
            <h3 className="subheading text-gray-900 mb-4">What You'll Learn</h3>
            <p className="body text-gray-700 mb-6">
              By the end of this course, you'll have gained the following skills and knowledge:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {course.objectives.map((objective, index) => (
                <div key={index} className="flex items-start bg-gray-50 p-3 rounded-md">
                  <div className="rounded-full bg-success bg-opacity-10 p-2 mr-3">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                  </div>
                  <p className="body text-gray-700">{objective}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-info bg-opacity-5 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <Icon name="Lightbulb" size={20} className="text-info mt-1 mr-3" />
                <div>
                  <h4 className="body-large font-medium text-gray-900 mb-1">Why These Objectives Matter</h4>
                  <p className="body text-gray-700">
                    These skills are in high demand in the job market and form the foundation of modern web development. Mastering these concepts will prepare you for more advanced topics and real-world projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/3 mt-6 md:mt-0">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="body-large font-medium text-gray-900 mb-3">Skills You'll Develop</h4>
              
              <div className="space-y-3">
                <div className="flex flex-col">
                  <div className="flex justify-between mb-1">
                    <span className="body text-gray-700">HTML & Structure</span>
                    <span className="badge-text text-gray-700">Beginner to Intermediate</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="h-2 rounded-full bg-primary" style={{ width: '80%' }}></div>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <div className="flex justify-between mb-1">
                    <span className="body text-gray-700">CSS & Styling</span>
                    <span className="badge-text text-gray-700">Beginner to Intermediate</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="h-2 rounded-full bg-primary" style={{ width: '75%' }}></div>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <div className="flex justify-between mb-1">
                    <span className="body text-gray-700">JavaScript</span>
                    <span className="badge-text text-gray-700">Beginner to Intermediate</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="h-2 rounded-full bg-primary" style={{ width: '70%' }}></div>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <div className="flex justify-between mb-1">
                    <span className="body text-gray-700">Responsive Design</span>
                    <span className="badge-text text-gray-700">Beginner to Intermediate</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="h-2 rounded-full bg-primary" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <div className="flex justify-between mb-1">
                    <span className="body text-gray-700">Web Accessibility</span>
                    <span className="badge-text text-gray-700">Beginner</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="h-2 rounded-full bg-primary" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center">
                  <Icon name="Award" size={18} className="text-achievement mr-2" />
                  <p className="body text-gray-700">
                    You'll earn a certificate upon completion
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningObjectives;