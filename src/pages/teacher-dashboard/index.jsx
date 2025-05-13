import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/AppIcon";

import Header from "./components/Header";
import PerformanceMetrics from "./components/PerformanceMetrics";
import StudentRoster from "./components/StudentRoster";
import PerformanceCharts from "./components/PerformanceCharts";
import ContentManagement from "./components/ContentManagement";
import UpcomingEvents from "./components/UpcomingEvents";
import RecentActivity from "./components/RecentActivity";

const TeacherDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("web-development-101");
  const [selectedTimeframe, setSelectedTimeframe] = useState("week");
  
  // Mock teacher data
  const teacherData = {
    name: "Dr. Sarah Williams",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    department: "Computer Science",
    courses: [
      { id: "web-development-101", name: "Introduction to Web Development" },
      { id: "data-science-fundamentals", name: "Data Science Fundamentals" },
      { id: "advanced-javascript", name: "Advanced JavaScript Concepts" }
    ]
  };

  // Mock performance metrics data
  const performanceMetrics = {
    courseEngagement: 78,
    completionRate: 65,
    averageScore: 82,
    activeStudents: 42,
    totalStudents: 48,
    discussionPosts: 156
  };

  // Mock student roster data
  const studentRoster = [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      progress: 92,
      lastActivity: "2023-06-19T14:30:00",
      averageScore: 94,
      status: "on-track"
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=256",
      progress: 78,
      lastActivity: "2023-06-18T10:15:00",
      averageScore: 86,
      status: "on-track"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      progress: 45,
      lastActivity: "2023-06-12T16:45:00",
      averageScore: 72,
      status: "at-risk"
    },
    {
      id: 4,
      name: "James Wilson",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=256",
      progress: 88,
      lastActivity: "2023-06-19T09:20:00",
      averageScore: 90,
      status: "on-track"
    },
    {
      id: 5,
      name: "Olivia Thompson",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      progress: 32,
      lastActivity: "2023-06-10T13:10:00",
      averageScore: 65,
      status: "at-risk"
    },
    {
      id: 6,
      name: "Robert Lee",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=256",
      progress: 65,
      lastActivity: "2023-06-17T11:30:00",
      averageScore: 78,
      status: "on-track"
    },
    {
      id: 7,
      name: "Sophia Martinez",
      avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      progress: 22,
      lastActivity: "2023-06-08T15:45:00",
      averageScore: 58,
      status: "at-risk"
    },
    {
      id: 8,
      name: "Daniel Brown",
      avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=256",
      progress: 95,
      lastActivity: "2023-06-19T10:30:00",
      averageScore: 96,
      status: "on-track"
    }
  ];

  // Mock course content data
  const courseContent = [
    {
      id: 1,
      title: "Introduction to HTML",
      type: "lesson",
      status: "published",
      lastUpdated: "2023-05-15T10:30:00",
      completionRate: 98
    },
    {
      id: 2,
      title: "CSS Fundamentals",
      type: "lesson",
      status: "published",
      lastUpdated: "2023-05-18T14:15:00",
      completionRate: 92
    },
    {
      id: 3,
      title: "JavaScript Basics",
      type: "lesson",
      status: "published",
      lastUpdated: "2023-05-22T09:45:00",
      completionRate: 85
    },
    {
      id: 4,
      title: "Responsive Design Principles",
      type: "lesson",
      status: "published",
      lastUpdated: "2023-05-25T16:20:00",
      completionRate: 78
    },
    {
      id: 5,
      title: "Web Development Project",
      type: "assignment",
      status: "published",
      lastUpdated: "2023-06-01T11:10:00",
      completionRate: 65,
      dueDate: "2023-06-25T23:59:59"
    },
    {
      id: 6,
      title: "CSS Frameworks",
      type: "lesson",
      status: "draft",
      lastUpdated: "2023-06-10T15:30:00",
      completionRate: 0
    }
  ];

  // Mock upcoming events data
  const upcomingEvents = [
    {
      id: 1,
      title: "JavaScript Frameworks Q&A",
      type: "live-session",
      date: "2023-06-24T18:00:00",
      duration: 60
    },
    {
      id: 2,
      title: "Web Development Project",
      type: "deadline",
      date: "2023-06-25T23:59:59"
    },
    {
      id: 3,
      title: "End of Module Assessment",
      type: "assessment",
      date: "2023-06-30T10:00:00",
      duration: 90
    },
    {
      id: 4,
      title: "Course Planning Meeting",
      type: "meeting",
      date: "2023-06-22T14:30:00",
      duration: 45
    }
  ];

  // Mock recent activity data
  const recentActivity = [
    {
      id: 1,
      type: "submission",
      student: "Alex Johnson",
      studentAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      content: "Submitted CSS Layout Assignment",
      timestamp: "2023-06-19T14:30:00",
      status: "needs-review"
    },
    {
      id: 2,
      type: "question",
      student: "Emma Rodriguez",
      studentAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      content: "Asked a question about JavaScript closures",
      timestamp: "2023-06-19T11:15:00",
      status: "unanswered"
    },
    {
      id: 3,
      type: "discussion",
      student: "Michael Chen",
      studentAvatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=256",
      content: "Posted in \'Responsive Design Challenges\' discussion",
      timestamp: "2023-06-18T16:45:00",
      status: "active"
    },
    {
      id: 4,
      type: "submission",
      student: "Olivia Thompson",
      studentAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      content: "Submitted JavaScript Basics Quiz",
      timestamp: "2023-06-18T10:30:00",
      status: "graded",
      grade: "72%"
    },
    {
      id: 5,
      type: "question",
      student: "Robert Lee",
      studentAvatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=256",
      content: "Asked about the upcoming project requirements",
      timestamp: "2023-06-17T15:20:00",
      status: "answered"
    }
  ];

  // Filter students based on search query
  const filteredStudents = studentRoster.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        teacherData={teacherData} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        selectedCourse={selectedCourse}
        setSelectedCourse={setSelectedCourse}
      />
      
      <main className="container mx-auto px-4 py-6 lg:px-8">
        <div className="mb-8">
          <h1 className="display-medium text-gray-900 mb-2">Teacher Dashboard</h1>
          <div className="flex flex-wrap items-center justify-between">
            <p className="body-large text-gray-700">
              Course: <span className="font-medium">{teacherData.courses.find(c => c.id === selectedCourse)?.name}</span>
            </p>
            
            <div className="flex items-center mt-2 sm:mt-0">
              <label htmlFor="timeframe" className="body text-gray-700 mr-2">Timeframe:</label>
              <select
                id="timeframe"
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="body border border-gray-300 rounded-md py-1 px-2 focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <PerformanceMetrics metrics={performanceMetrics} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Main content area */}
          <div className="lg:col-span-8">
            {/* Student Roster */}
            <StudentRoster students={filteredStudents} searchQuery={searchQuery} />

            {/* Performance Charts */}
            <PerformanceCharts />

            {/* Content Management */}
            <ContentManagement content={courseContent} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <h3 className="subheading text-gray-900 mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link 
                  to="/assessment-creator" 
                  className="flex flex-col items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <Icon name="FileText" size={24} className="text-primary mb-2" />
                  <span className="button-text text-gray-700 text-center">Create Assessment</span>
                </Link>
                <button 
                  className="flex flex-col items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <Icon name="Send" size={24} className="text-primary mb-2" />
                  <span className="button-text text-gray-700 text-center">Send Announcement</span>
                </button>
                <button 
                  className="flex flex-col items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <Icon name="Calendar" size={24} className="text-primary mb-2" />
                  <span className="button-text text-gray-700 text-center">Schedule Event</span>
                </button>
                <button 
                  className="flex flex-col items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <Icon name="FileEdit" size={24} className="text-primary mb-2" />
                  <span className="button-text text-gray-700 text-center">Add Content</span>
                </button>
              </div>
            </div>

            {/* Upcoming Events */}
            <UpcomingEvents events={upcomingEvents} />

            {/* Recent Activity */}
            <RecentActivity activities={recentActivity} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;