import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/AppIcon";

import Header from "./components/Header";
import CourseIntroduction from "./components/CourseIntroduction";
import LearningObjectives from "./components/LearningObjectives";
import CourseRoadmap from "./components/CourseRoadmap";
import LearningPreferences from "./components/LearningPreferences";
import DiagnosticAssessment from "./components/DiagnosticAssessment";
import CommunityIntroduction from "./components/CommunityIntroduction";
import ResourcesSection from "./components/ResourcesSection";
import OnboardingProgress from "./components/OnboardingProgress";

const CourseOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;
  
  // Mock course data
  const courseData = {
    id: 1,
    title: "Introduction to Web Development",
    subtitle: "Learn the fundamentals of modern web development",
    description: `This comprehensive course will take you from a complete beginner to a confident web developer. You'll learn HTML, CSS, and JavaScript fundamentals, along with modern frameworks and best practices for building responsive, accessible websites.

    Through hands-on projects and real-world examples, you'll develop the skills needed to create professional web applications that work across all devices.`,
    thumbnail: "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: "12 weeks",
    level: "Beginner",
    prerequisites: ["Basic computer skills", "No prior coding experience required"],
    instructor: {
      name: "Dr. Sarah Williams",
      title: "Senior Web Developer & Educator",
      bio: "Dr. Williams has over 15 years of experience in web development and has taught thousands of students worldwide. She specializes in creating engaging learning experiences for beginners.",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    objectives: [
      "Understand core HTML, CSS, and JavaScript concepts",
      "Build responsive websites using modern techniques",
      "Implement interactive features with JavaScript",
      "Deploy and maintain web applications",
      "Apply accessibility best practices",
      "Optimize website performance"
    ],
    modules: [
      {
        id: 1,
        title: "Getting Started with HTML",
        duration: "2 weeks",
        lessons: 8,
        description: "Learn the building blocks of web pages and document structure."
      },
      {
        id: 2,
        title: "Styling with CSS",
        duration: "3 weeks",
        lessons: 12,
        description: "Master the art of styling web pages with modern CSS techniques."
      },
      {
        id: 3,
        title: "JavaScript Fundamentals",
        duration: "4 weeks",
        lessons: 16,
        description: "Add interactivity and dynamic behavior to your websites."
      },
      {
        id: 4,
        title: "Responsive Web Design",
        duration: "2 weeks",
        lessons: 8,
        description: "Create websites that work beautifully across all devices and screen sizes."
      },
      {
        id: 5,
        title: "Final Project",
        duration: "1 week",
        lessons: 4,
        description: "Apply everything you\'ve learned to build a complete website from scratch."
      }
    ],
    resources: [
      {
        id: 1,
        title: "Code Editor Setup Guide",
        type: "document",
        icon: "FileText"
      },
      {
        id: 2,
        title: "Web Development Glossary",
        type: "document",
        icon: "BookOpen"
      },
      {
        id: 3,
        title: "Browser Developer Tools Tutorial",
        type: "video",
        icon: "Video"
      },
      {
        id: 4,
        title: "HTML & CSS Cheat Sheets",
        type: "document",
        icon: "FileText"
      }
    ],
    community: {
      forums: 3,
      activeStudents: 1245,
      studyGroups: 8
    }
  };

  // Handle step navigation
  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <CourseIntroduction course={courseData} />;
      case 2:
        return <LearningObjectives course={courseData} />;
      case 3:
        return <CourseRoadmap course={courseData} />;
      case 4:
        return <LearningPreferences />;
      case 5:
        return <DiagnosticAssessment course={courseData} />;
      case 6:
        return <CommunityIntroduction course={courseData} />;
      case 7:
        return <ResourcesSection course={courseData} />;
      default:
        return <CourseIntroduction course={courseData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header courseTitle={courseData.title} />
      
      <main className="container mx-auto px-4 py-6 lg:px-8">
        {/* Progress indicator */}
        <OnboardingProgress currentStep={currentStep} totalSteps={totalSteps} />
        
        {/* Step content */}
        <div className="mt-6">
          {renderStepContent()}
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-between mt-8 mb-12">
          <button
            onClick={goToPreviousStep}
            disabled={currentStep === 1}
            className={`button-text px-6 py-3 rounded-md flex items-center ${
              currentStep === 1 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' :'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Previous
          </button>
          
          {currentStep < totalSteps ? (
            <button
              onClick={goToNextStep}
              className="button-text bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md flex items-center"
            >
              Next
              <Icon name="ArrowRight" size={16} className="ml-2" />
            </button>
          ) : (
            <Link
              to="/student-dashboard"
              className="button-text bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md flex items-center"
            >
              Start Learning
              <Icon name="Play" size={16} className="ml-2" />
            </Link>
          )}
        </div>
      </main>
    </div>
  );
};

export default CourseOnboarding;