import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const CourseIntroduction = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 bg-primary bg-opacity-5 border-b border-primary border-opacity-20">
        <h2 className="heading text-gray-900 flex items-center">
          <Icon name="BookOpen" size={20} className="text-primary mr-2" />
          Welcome to Your Learning Journey
        </h2>
      </div>
      
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 mb-4 md:mb-0 md:mr-6">
            <div className="rounded-lg overflow-hidden h-48 md:h-64">
              <Image
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="md:w-2/3">
            <h1 className="display-medium text-gray-900 mb-2">{course.title}</h1>
            <p className="body-large text-gray-700 mb-4">{course.subtitle}</p>
            
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="flex items-center">
                <Icon name="Clock" size={16} className="text-gray-500 mr-1" />
                <span className="body text-gray-700">{course.duration}</span>
              </div>
              <div className="flex items-center">
                <Icon name="BarChart2" size={16} className="text-gray-500 mr-1" />
                <span className="body text-gray-700">{course.level}</span>
              </div>
              <div className="flex items-center">
                <Icon name="Users" size={16} className="text-gray-500 mr-1" />
                <span className="body text-gray-700">{course.community.activeStudents} students</span>
              </div>
            </div>
            
            <div className="body text-gray-700 mb-6">
              {course.description}
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="subheading text-gray-900 mb-2">Prerequisites</h3>
              <ul className="space-y-2">
                {course.prerequisites.map((prerequisite, index) => (
                  <li key={index} className="flex items-start">
                    <Icon name="Check" size={16} className="text-success mt-1 mr-2" />
                    <span className="body text-gray-700">{prerequisite}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-6 border-t border-gray-200 pt-6">
          <h3 className="subheading text-gray-900 mb-4">Meet Your Instructor</h3>
          <div className="flex items-start">
            <div className="mr-4">
              <div className="h-16 w-16 rounded-full overflow-hidden">
                <Image
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div>
              <h4 className="body-large font-medium text-gray-900">{course.instructor.name}</h4>
              <p className="body text-gray-700 mb-2">{course.instructor.title}</p>
              <p className="body text-gray-700">{course.instructor.bio}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-primary bg-opacity-5 rounded-lg p-4">
          <div className="flex items-center">
            <Icon name="Info" size={20} className="text-primary mr-2" />
            <p className="body text-gray-700">
              This onboarding will guide you through everything you need to know to get started with this course. You'll learn about the course structure, set your learning preferences, and prepare for success.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseIntroduction;