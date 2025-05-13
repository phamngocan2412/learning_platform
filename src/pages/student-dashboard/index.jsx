import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/AppIcon";

import Header from "./components/Header";
import CourseCard from "./components/CourseCard";
import QuickStats from "./components/QuickStats";
import ContinueLearning from "./components/ContinueLearning";
import UpcomingEvents from "./components/UpcomingEvents";
import RecentActivity from "./components/RecentActivity";

const StudentDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock user data
  const userData = {
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

  // Mock enrolled courses data
  const enrolledCourses = [
    {
      id: 1,
      title: "Introduction to Web Development",
      category: "Programming",
      instructor: "Dr. Sarah Williams",
      thumbnail: "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      progress: 75,
      lastAccessed: "2023-06-15T14:30:00",
      deadline: "2023-07-30T23:59:59",
      nextLesson: "CSS Flexbox and Grid Systems",
      totalLessons: 24,
      completedLessons: 18
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      category: "Data Science",
      instructor: "Prof. Michael Chen",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      progress: 45,
      lastAccessed: "2023-06-18T10:15:00",
      deadline: "2023-08-15T23:59:59",
      nextLesson: "Statistical Analysis with Python",
      totalLessons: 32,
      completedLessons: 14
    },
    {
      id: 3,
      title: "UX/UI Design Principles",
      category: "Design",
      instructor: "Emma Rodriguez",
      thumbnail: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      progress: 90,
      lastAccessed: "2023-06-19T16:45:00",
      deadline: "2023-07-10T23:59:59",
      nextLesson: "User Testing Methodologies",
      totalLessons: 18,
      completedLessons: 16
    },
    {
      id: 4,
      title: "Advanced JavaScript Concepts",
      category: "Programming",
      instructor: "James Wilson",
      thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      progress: 30,
      lastAccessed: "2023-06-14T09:20:00",
      deadline: "2023-09-01T23:59:59",
      nextLesson: "Promises and Async/Await",
      totalLessons: 28,
      completedLessons: 8
    },
    {
      id: 5,
      title: "Digital Marketing Essentials",
      category: "Marketing",
      instructor: "Olivia Thompson",
      thumbnail: "https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      progress: 60,
      lastAccessed: "2023-06-17T13:10:00",
      deadline: "2023-08-05T23:59:59",
      nextLesson: "Social Media Campaign Strategy",
      totalLessons: 20,
      completedLessons: 12
    },
    {
      id: 6,
      title: "Machine Learning for Beginners",
      category: "Data Science",
      instructor: "Dr. Robert Lee",
      thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      progress: 15,
      lastAccessed: "2023-06-12T11:30:00",
      deadline: "2023-09-15T23:59:59",
      nextLesson: "Supervised Learning Algorithms",
      totalLessons: 30,
      completedLessons: 4
    }
  ];

  // Sort courses by last accessed (most recent first)
  const sortedCourses = [...enrolledCourses].sort((a, b) => 
    new Date(b.lastAccessed) - new Date(a.lastAccessed)
  );

  // Find the most recently accessed course for "Continue Learning" section
  const continuelearningCourse = sortedCourses[0];

  // Mock upcoming events data
  const upcomingEvents = [
    {
      id: 1,
      type: "assignment",
      title: "Data Visualization Project",
      course: "Data Science Fundamentals",
      dueDate: "2023-06-25T23:59:59",
      priority: "high"
    },
    {
      id: 2,
      type: "live",
      title: "JavaScript Frameworks Q&A",
      course: "Advanced JavaScript Concepts",
      startTime: "2023-06-24T18:00:00",
      duration: 60,
      priority: "medium"
    },
    {
      id: 3,
      type: "quiz",
      title: "UX Principles Assessment",
      course: "UX/UI Design Principles",
      dueDate: "2023-06-23T23:59:59",
      priority: "medium"
    },
    {
      id: 4,
      type: "assignment",
      title: "Marketing Campaign Analysis",
      course: "Digital Marketing Essentials",
      dueDate: "2023-06-30T23:59:59",
      priority: "low"
    }
  ];

  // Mock recent discussions data
  const recentDiscussions = [
    {
      id: 1,
      title: "Help with CSS Grid layout",
      course: "Introduction to Web Development",
      lastActivity: "2023-06-19T14:30:00",
      unreadReplies: 3
    },
    {
      id: 2,
      title: "Python pandas dataframe question",
      course: "Data Science Fundamentals",
      lastActivity: "2023-06-18T16:45:00",
      unreadReplies: 1
    },
    {
      id: 3,
      title: "User testing feedback discussion",
      course: "UX/UI Design Principles",
      lastActivity: "2023-06-17T09:20:00",
      unreadReplies: 0
    }
  ];

  // Filter courses based on search query
  const filteredCourses = sortedCourses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        userData={userData} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      
      <main className="container mx-auto px-4 py-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main content area */}
          <div className="lg:col-span-8">
            <div className="mb-8">
              <h1 className="display-medium text-gray-900 mb-2">Welcome back, {userData.name}!</h1>
              <p className="body-large text-gray-700">Ready to continue your learning journey?</p>
            </div>

            {/* Quick stats */}
            <QuickStats stats={userData.stats} />

            {/* Continue Learning Section */}
            {continuelearningCourse && (
              <ContinueLearning course={continuelearningCourse} />
            )}

            {/* My Courses Section */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="heading text-gray-900">My Courses</h2>
                <div className="flex items-center">
                  <span className="body text-gray-700 mr-2">
                    {userData.stats.inProgressCourses} in progress
                  </span>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="body text-gray-700">
                    {userData.stats.completedCourses} completed
                  </span>
                </div>
              </div>

              {filteredCourses.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <Icon name="Search" size={48} className="mx-auto mb-4 text-gray-400" />
                  <p className="body-large text-gray-700 mb-2">No courses found matching "{searchQuery}"</p>
                  <p className="body text-gray-500">Try adjusting your search terms</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredCourses.map(course => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            {/* Upcoming Events Section */}
            <UpcomingEvents events={upcomingEvents} />

            {/* Recent Activity Section */}
            <RecentActivity discussions={recentDiscussions} />

            {/* Quick Navigation Links */}
            <div className="bg-white rounded-lg shadow p-4 mt-6">
              <h3 className="subheading text-gray-900 mb-3">Quick Links</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link 
                  to="/video-lesson-player" 
                  className="flex flex-col items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <Icon name="Play" size={24} className="text-primary mb-2" />
                  <span className="button-text text-gray-700 text-center">Video Lessons</span>
                </Link>
                <Link 
                  to="/learning-path-navigator" 
                  className="flex flex-col items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <Icon name="Map" size={24} className="text-primary mb-2" />
                  <span className="button-text text-gray-700 text-center">Learning Paths</span>
                </Link>
                <Link 
                  to="/discussion-forum" 
                  className="flex flex-col items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <Icon name="MessageSquare" size={24} className="text-primary mb-2" />
                  <span className="button-text text-gray-700 text-center">Discussions</span>
                </Link>
                <Link 
                  to="/student-analytics" 
                  className="flex flex-col items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <Icon name="BarChart2" size={24} className="text-primary mb-2" />
                  <span className="button-text text-gray-700 text-center">Analytics</span>
                </Link>
                <Link 
                  to="/gamification-hub" 
                  className="flex flex-col items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors col-span-2"
                >
                  <Icon name="Award" size={24} className="text-primary mb-2" />
                  <span className="button-text text-gray-700 text-center">Achievements & Rewards</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;