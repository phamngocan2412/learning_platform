import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Header from "../student-dashboard/components/Header";
import PathVisualization from "./components/PathVisualization";
import ModuleDetails from "./components/ModuleDetails";
import ProgressSidebar from "./components/ProgressSidebar";
import PathLegend from "./components/PathLegend";

const LearningPathNavigator = () => {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("course") || "1";
  const [selectedModule, setSelectedModule] = useState(null);
  const [userData, setUserData] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock user data
  const mockUserData = {
    name: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    stats: {
      achievements: 12,
      streakDays: 7,
      points: 2450,
      completedCourses: 3,
      inProgressCourses: 4
    }
  };

  // Mock course data
  const mockCourseData = {
    id: courseId,
    title: "Introduction to Web Development",
    description: "A comprehensive introduction to modern web development, covering HTML, CSS, JavaScript, and responsive design principles.",
    instructor: "Dr. Sarah Williams",
    thumbnail: "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    progress: 45,
    startDate: "2023-05-01T00:00:00",
    estimatedCompletion: "2023-08-30T00:00:00",
    skillsAcquired: ["HTML5", "CSS3", "JavaScript Basics", "Responsive Design"],
    skillsInProgress: ["DOM Manipulation", "CSS Flexbox", "CSS Grid"],
    skillsUpcoming: ["JavaScript ES6+", "Web APIs", "Frontend Frameworks"],
    learningPath: [
      {
        id: "module-1",
        title: "Web Development Fundamentals",
        type: "core",
        status: "completed",
        mastery: 95,
        description: "Introduction to the core concepts of web development and the internet.",
        estimatedHours: 4,
        activities: [
          {
            id: "activity-1-1",
            title: "How the Web Works",
            type: "video",
            status: "completed",
            duration: 25,
            path: "/video-lesson-player?lesson=1-1"
          },
          {
            id: "activity-1-2",
            title: "Web Development Tools",
            type: "reading",
            status: "completed",
            duration: 30,
            path: "/reading-material?id=1-2"
          },
          {
            id: "activity-1-3",
            title: "Setting Up Your Environment",
            type: "interactive",
            status: "completed",
            duration: 45,
            path: "/interactive-lesson?id=1-3"
          },
          {
            id: "activity-1-4",
            title: "Module Assessment",
            type: "quiz",
            status: "completed",
            score: 92,
            duration: 20,
            path: "/interactive-quiz?id=1-4"
          }
        ]
      },
      {
        id: "module-2",
        title: "HTML Essentials",
        type: "core",
        status: "completed",
        mastery: 90,
        description: "Learn the building blocks of web pages with HTML5.",
        estimatedHours: 6,
        activities: [
          {
            id: "activity-2-1",
            title: "HTML Document Structure",
            type: "video",
            status: "completed",
            duration: 35,
            path: "/video-lesson-player?lesson=2-1"
          },
          {
            id: "activity-2-2",
            title: "HTML Elements & Attributes",
            type: "video",
            status: "completed",
            duration: 40,
            path: "/video-lesson-player?lesson=2-2"
          },
          {
            id: "activity-2-3",
            title: "Semantic HTML",
            type: "reading",
            status: "completed",
            duration: 25,
            path: "/reading-material?id=2-3"
          },
          {
            id: "activity-2-4",
            title: "HTML Forms",
            type: "interactive",
            status: "completed",
            duration: 60,
            path: "/interactive-lesson?id=2-4"
          },
          {
            id: "activity-2-5",
            title: "HTML Assessment",
            type: "quiz",
            status: "completed",
            score: 88,
            duration: 30,
            path: "/interactive-quiz?id=2-5"
          }
        ]
      },
      {
        id: "module-3",
        title: "CSS Fundamentals",
        type: "core",
        status: "in-progress",
        mastery: 75,
        description: "Style your web pages with CSS and learn layout techniques.",
        estimatedHours: 8,
        activities: [
          {
            id: "activity-3-1",
            title: "CSS Selectors & Properties",
            type: "video",
            status: "completed",
            duration: 45,
            path: "/video-lesson-player?lesson=3-1"
          },
          {
            id: "activity-3-2",
            title: "CSS Box Model",
            type: "video",
            status: "completed",
            duration: 30,
            path: "/video-lesson-player?lesson=3-2"
          },
          {
            id: "activity-3-3",
            title: "CSS Layout Basics",
            type: "interactive",
            status: "completed",
            duration: 50,
            path: "/interactive-lesson?id=3-3"
          },
          {
            id: "activity-3-4",
            title: "CSS Flexbox",
            type: "video",
            status: "in-progress",
            duration: 55,
            path: "/video-lesson-player?lesson=3-4"
          },
          {
            id: "activity-3-5",
            title: "CSS Grid Systems",
            type: "interactive",
            status: "not-started",
            duration: 60,
            path: "/interactive-lesson?id=3-5"
          },
          {
            id: "activity-3-6",
            title: "CSS Assessment",
            type: "quiz",
            status: "not-started",
            duration: 30,
            path: "/interactive-quiz?id=3-6"
          }
        ]
      },
      {
        id: "module-3-alt",
        title: "Advanced CSS Techniques",
        type: "optional",
        status: "not-started",
        mastery: 0,
        description: "Dive deeper into advanced CSS concepts and animations.",
        estimatedHours: 5,
        prerequisite: "module-3",
        activities: [
          {
            id: "activity-3-alt-1",
            title: "CSS Animations",
            type: "video",
            status: "not-started",
            duration: 40,
            path: "/video-lesson-player?lesson=3-alt-1"
          },
          {
            id: "activity-3-alt-2",
            title: "CSS Variables",
            type: "reading",
            status: "not-started",
            duration: 25,
            path: "/reading-material?id=3-alt-2"
          },
          {
            id: "activity-3-alt-3",
            title: "CSS Preprocessors",
            type: "interactive",
            status: "not-started",
            duration: 60,
            path: "/interactive-lesson?id=3-alt-3"
          }
        ]
      },
      {
        id: "module-4",
        title: "JavaScript Basics",
        type: "core",
        status: "not-started",
        mastery: 0,
        description: "Learn the fundamentals of JavaScript programming.",
        estimatedHours: 10,
        prerequisite: "module-3",
        activities: [
          {
            id: "activity-4-1",
            title: "JavaScript Syntax",
            type: "video",
            status: "not-started",
            duration: 45,
            path: "/video-lesson-player?lesson=4-1"
          },
          {
            id: "activity-4-2",
            title: "Variables & Data Types",
            type: "interactive",
            status: "not-started",
            duration: 40,
            path: "/interactive-lesson?id=4-2"
          },
          {
            id: "activity-4-3",
            title: "Functions & Scope",
            type: "video",
            status: "not-started",
            duration: 50,
            path: "/video-lesson-player?lesson=4-3"
          },
          {
            id: "activity-4-4",
            title: "Control Flow",
            type: "reading",
            status: "not-started",
            duration: 30,
            path: "/reading-material?id=4-4"
          },
          {
            id: "activity-4-5",
            title: "JavaScript Assessment",
            type: "quiz",
            status: "not-started",
            duration: 35,
            path: "/interactive-quiz?id=4-5"
          }
        ]
      },
      {
        id: "module-4-remedial",
        title: "Programming Fundamentals",
        type: "remedial",
        status: "not-started",
        mastery: 0,
        description: "Review basic programming concepts for those new to coding.",
        estimatedHours: 4,
        prerequisite: "module-3",
        activities: [
          {
            id: "activity-4-remedial-1",
            title: "Introduction to Programming",
            type: "video",
            status: "not-started",
            duration: 30,
            path: "/video-lesson-player?lesson=4-remedial-1"
          },
          {
            id: "activity-4-remedial-2",
            title: "Basic Algorithms",
            type: "interactive",
            status: "not-started",
            duration: 45,
            path: "/interactive-lesson?id=4-remedial-2"
          },
          {
            id: "activity-4-remedial-3",
            title: "Problem-Solving Techniques",
            type: "reading",
            status: "not-started",
            duration: 25,
            path: "/reading-material?id=4-remedial-3"
          }
        ]
      },
      {
        id: "module-5",
        title: "DOM Manipulation",
        type: "core",
        status: "not-started",
        mastery: 0,
        description: "Learn to interact with web pages using JavaScript.",
        estimatedHours: 8,
        prerequisite: "module-4",
        activities: [
          {
            id: "activity-5-1",
            title: "DOM Introduction",
            type: "video",
            status: "not-started",
            duration: 35,
            path: "/video-lesson-player?lesson=5-1"
          },
          {
            id: "activity-5-2",
            title: "Selecting DOM Elements",
            type: "interactive",
            status: "not-started",
            duration: 40,
            path: "/interactive-lesson?id=5-2"
          },
          {
            id: "activity-5-3",
            title: "Modifying the DOM",
            type: "video",
            status: "not-started",
            duration: 45,
            path: "/video-lesson-player?lesson=5-3"
          },
          {
            id: "activity-5-4",
            title: "Event Handling",
            type: "interactive",
            status: "not-started",
            duration: 50,
            path: "/interactive-lesson?id=5-4"
          },
          {
            id: "activity-5-5",
            title: "DOM Project",
            type: "project",
            status: "not-started",
            duration: 120,
            path: "/project?id=5-5"
          }
        ]
      }
    ]
  };

  useEffect(() => {
    // Simulate API call to fetch user and course data
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, these would be API calls
        setUserData(mockUserData);
        setCourseData(mockCourseData);
        
        // Set the first in-progress module as selected by default
        const inProgressModule = mockCourseData.learningPath.find(
          module => module.status === "in-progress"
        );
        
        if (inProgressModule) {
          setSelectedModule(inProgressModule);
        } else {
          // If no in-progress module, select the first one
          setSelectedModule(mockCourseData.learningPath[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  const handleModuleSelect = (moduleId) => {
    const module = courseData.learningPath.find(m => m.id === moduleId);
    setSelectedModule(module);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader" size={48} className="animate-spin text-primary mx-auto mb-4" />
          <p className="body-large text-gray-700">Loading learning path...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        userData={userData} 
        searchQuery="" 
        setSearchQuery={() => {}} 
      />
      
      <main className="container mx-auto px-4 py-6 lg:px-8">
        {/* Course header */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <Link 
              to="/student-dashboard" 
              className="text-gray-500 hover:text-primary mr-2 flex items-center"
            >
              <Icon name="ChevronLeft" size={20} />
              <span className="body text-gray-700 ml-1">Back to Dashboard</span>
            </Link>
          </div>
          <h1 className="display-medium text-gray-900 mb-2">{courseData.title}</h1>
          <p className="body-large text-gray-700 mb-4">{courseData.description}</p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center">
              <Icon name="User" size={16} className="text-gray-500 mr-1" />
              <span className="body text-gray-700">{courseData.instructor}</span>
            </div>
            <div className="flex items-center">
              <Icon name="Clock" size={16} className="text-gray-500 mr-1" />
              <span className="body text-gray-700">
                {new Date(courseData.estimatedCompletion).toLocaleDateString()} (estimated completion)
              </span>
            </div>
            <div className="flex items-center">
              <Icon name="BarChart2" size={16} className="text-gray-500 mr-1" />
              <span className="body text-gray-700">{courseData.progress}% complete</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main content area */}
          <div className="lg:col-span-9">
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="heading text-gray-900">Learning Path</h2>
                <PathLegend />
              </div>
              
              <PathVisualization 
                learningPath={courseData.learningPath}
                selectedModuleId={selectedModule?.id}
                onModuleSelect={handleModuleSelect}
              />
            </div>
            
            {selectedModule && (
              <ModuleDetails 
                module={selectedModule}
                courseId={courseId}
              />
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <ProgressSidebar 
              courseData={courseData}
              userData={userData}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearningPathNavigator;