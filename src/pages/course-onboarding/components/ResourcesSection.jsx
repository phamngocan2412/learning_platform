import React from "react";
import Icon from "../../../components/AppIcon";

const ResourcesSection = ({ course }) => {
  // Mock additional resources
  const additionalResources = [
    {
      id: 1,
      title: "Web Development Roadmap 2023",
      type: "document",
      icon: "Map",
      description: "A comprehensive guide to becoming a web developer"
    },
    {
      id: 2,
      title: "VS Code Setup for Web Developers",
      type: "video",
      icon: "Code",
      description: "Configure your development environment for maximum productivity"
    },
    {
      id: 3,
      title: "Common HTML & CSS Debugging Techniques",
      type: "document",
      icon: "Search",
      description: "Troubleshoot layout and styling issues effectively"
    }
  ];
  
  // Mock technical requirements
  const technicalRequirements = {
    hardware: [
      "Computer with minimum 4GB RAM (8GB recommended)",
      "Stable internet connection"
    ],
    software: [
      "Modern web browser (Chrome, Firefox, Edge, or Safari)",
      "Text editor or IDE (VS Code recommended)",
      "Git version control (optional but recommended)"
    ]
  };
  
  // Get icon for resource type
  const getResourceIcon = (iconName) => {
    return iconName || "FileText";
  };
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 bg-primary bg-opacity-5 border-b border-primary border-opacity-20">
        <h2 className="heading text-gray-900 flex items-center">
          <Icon name="BookOpen" size={20} className="text-primary mr-2" />
          Resources & Support
        </h2>
      </div>
      
      <div className="p-4 md:p-6">
        <div className="mb-6">
          <h3 className="subheading text-gray-900 mb-2">Learning Resources</h3>
          <p className="body text-gray-700">
            Access these resources to enhance your learning experience and get the most out of this course.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Course Materials */}
          <div>
            <h4 className="body-large font-medium text-gray-900 mb-3">Course Materials</h4>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <ul className="divide-y divide-gray-200">
                {course.resources.map(resource => (
                  <li key={resource.id} className="py-3 first:pt-0 last:pb-0">
                    <div className="flex items-center">
                      <div className="rounded-full bg-primary bg-opacity-10 p-2 mr-3">
                        <Icon name={resource.icon} size={16} className="text-primary" />
                      </div>
                      <div>
                        <h5 className="body font-medium text-gray-900">{resource.title}</h5>
                        <p className="caption text-gray-700">
                          {resource.type === "document" ? "PDF Document" : "Video Tutorial"}
                        </p>
                      </div>
                      <button className="ml-auto p-2 text-gray-500 hover:text-primary">
                        <Icon name="Download" size={16} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Additional Resources */}
          <div>
            <h4 className="body-large font-medium text-gray-900 mb-3">Additional Resources</h4>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <ul className="divide-y divide-gray-200">
                {additionalResources.map(resource => (
                  <li key={resource.id} className="py-3 first:pt-0 last:pb-0">
                    <div className="flex items-start">
                      <div className="rounded-full bg-info bg-opacity-10 p-2 mr-3 mt-0.5">
                        <Icon name={getResourceIcon(resource.icon)} size={16} className="text-info" />
                      </div>
                      <div>
                        <h5 className="body font-medium text-gray-900">{resource.title}</h5>
                        <p className="caption text-gray-700">{resource.description}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Technical Requirements */}
        <div className="mb-8">
          <h4 className="body-large font-medium text-gray-900 mb-3">Technical Requirements</h4>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="body font-medium text-gray-900 mb-2 flex items-center">
                  <Icon name="Monitor" size={16} className="text-gray-700 mr-2" />
                  Hardware Requirements
                </h5>
                <ul className="space-y-2">
                  {technicalRequirements.hardware.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <Icon name="Check" size={14} className="text-success mt-1 mr-2" />
                      <span className="caption text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="body font-medium text-gray-900 mb-2 flex items-center">
                  <Icon name="Package" size={16} className="text-gray-700 mr-2" />
                  Software Requirements
                </h5>
                <ul className="space-y-2">
                  {technicalRequirements.software.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <Icon name="Check" size={14} className="text-success mt-1 mr-2" />
                      <span className="caption text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Support Options */}
        <div className="mb-8">
          <h4 className="body-large font-medium text-gray-900 mb-3">Support Options</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="flex justify-center mb-2">
                <div className="rounded-full bg-primary bg-opacity-10 p-3">
                  <Icon name="MessageCircle" size={20} className="text-primary" />
                </div>
              </div>
              <h5 className="body font-medium text-gray-900 mb-1">Discussion Forums</h5>
              <p className="caption text-gray-700">
                Ask questions and get help from peers and instructors
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="flex justify-center mb-2">
                <div className="rounded-full bg-primary bg-opacity-10 p-3">
                  <Icon name="Mail" size={20} className="text-primary" />
                </div>
              </div>
              <h5 className="body font-medium text-gray-900 mb-1">Email Support</h5>
              <p className="caption text-gray-700">
                Contact the teaching team directly for complex issues
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="flex justify-center mb-2">
                <div className="rounded-full bg-primary bg-opacity-10 p-3">
                  <Icon name="Video" size={20} className="text-primary" />
                </div>
              </div>
              <h5 className="body font-medium text-gray-900 mb-1">Office Hours</h5>
              <p className="caption text-gray-700">
                Weekly live sessions with instructors for Q&A
              </p>
            </div>
          </div>
        </div>
        
        {/* Success Strategies */}
        <div className="bg-success bg-opacity-5 rounded-lg p-4">
          <div className="flex items-start">
            <Icon name="Award" size={20} className="text-success mt-1 mr-3" />
            <div>
              <h4 className="body-large font-medium text-gray-900 mb-2">Success Strategies</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Icon name="Check" size={16} className="text-success mt-0.5 mr-2" />
                  <p className="body text-gray-700">
                    <span className="font-medium">Consistent practice:</span> Aim for daily coding practice, even if just for 30 minutes
                  </p>
                </li>
                <li className="flex items-start">
                  <Icon name="Check" size={16} className="text-success mt-0.5 mr-2" />
                  <p className="body text-gray-700">
                    <span className="font-medium">Build projects:</span> Apply what you learn by building small projects alongside the course
                  </p>
                </li>
                <li className="flex items-start">
                  <Icon name="Check" size={16} className="text-success mt-0.5 mr-2" />
                  <p className="body text-gray-700">
                    <span className="font-medium">Engage with community:</span> Ask questions and help others to reinforce your learning
                  </p>
                </li>
                <li className="flex items-start">
                  <Icon name="Check" size={16} className="text-success mt-0.5 mr-2" />
                  <p className="body text-gray-700">
                    <span className="font-medium">Take breaks:</span> Step away when stuck; solutions often come during breaks
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <h3 className="subheading text-gray-900 mb-3">Ready to Begin Your Learning Journey?</h3>
          <p className="body text-gray-700 mb-6 max-w-2xl mx-auto">
            You've completed the onboarding process and are now ready to start learning. Click the button below to begin your first lesson.
          </p>
          <button className="button-text bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md inline-flex items-center transition-colors">
            <Icon name="Play" size={18} className="mr-2" />
            Start Your First Lesson
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourcesSection;