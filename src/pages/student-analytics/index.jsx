import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Header from "../student-dashboard/components/Header";
import PerformanceSummary from "./components/PerformanceSummary";
import ActivityHeatmap from "./components/ActivityHeatmap";
import SkillMastery from "./components/SkillMastery";
import PeerComparison from "./components/PeerComparison";
import PersonalizedRecommendations from "./components/PersonalizedRecommendations";
import GoalTracker from "./components/GoalTracker";

const StudentAnalytics = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTimeframe, setSelectedTimeframe] = useState("month");
  
  // Mock user data (same as dashboard for consistency)
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

  // Mock performance data
  const performanceData = {
    overallProgress: 68,
    averageScore: 82,
    activityConsistency: 76,
    studyTime: {
      thisWeek: 12.5,
      lastWeek: 10.2,
      change: 22.5
    },
    completionRate: {
      assignments: 92,
      quizzes: 85,
      readings: 78
    },
    recentAssessments: [
      { id: 1, title: "Data Visualization Quiz", score: 88, date: "2023-06-18T14:30:00" },
      { id: 2, title: "JavaScript Frameworks Assessment", score: 76, date: "2023-06-15T10:15:00" },
      { id: 3, title: "UX Design Principles Project", score: 92, date: "2023-06-10T16:45:00" }
    ]
  };

  // Mock activity data for heatmap
  const activityData = {
    weeklyPattern: [
      { day: "Monday", hour0: 2, hour1: 1, hour2: 0, hour3: 0, hour4: 0, hour5: 0, hour6: 0, hour7: 1, hour8: 2, hour9: 3, hour10: 2, hour11: 1, hour12: 0, hour13: 1, hour14: 2, hour15: 3, hour16: 4, hour17: 3, hour18: 2, hour19: 1, hour20: 2, hour21: 1, hour22: 0, hour23: 0 },
      { day: "Tuesday", hour0: 0, hour1: 0, hour2: 0, hour3: 0, hour4: 0, hour5: 0, hour6: 0, hour7: 0, hour8: 1, hour9: 2, hour10: 3, hour11: 2, hour12: 1, hour13: 2, hour14: 3, hour15: 4, hour16: 3, hour17: 2, hour18: 1, hour19: 0, hour20: 1, hour21: 0, hour22: 0, hour23: 0 },
      { day: "Wednesday", hour0: 0, hour1: 0, hour2: 0, hour3: 0, hour4: 0, hour5: 0, hour6: 0, hour7: 1, hour8: 2, hour9: 3, hour10: 4, hour11: 3, hour12: 2, hour13: 1, hour14: 2, hour15: 3, hour16: 2, hour17: 1, hour18: 0, hour19: 1, hour20: 0, hour21: 0, hour22: 0, hour23: 0 },
      { day: "Thursday", hour0: 0, hour1: 0, hour2: 0, hour3: 0, hour4: 0, hour5: 0, hour6: 0, hour7: 0, hour8: 1, hour9: 2, hour10: 1, hour11: 0, hour12: 1, hour13: 2, hour14: 3, hour15: 4, hour16: 3, hour17: 2, hour18: 1, hour19: 2, hour20: 1, hour21: 0, hour22: 0, hour23: 0 },
      { day: "Friday", hour0: 0, hour1: 0, hour2: 0, hour3: 0, hour4: 0, hour5: 0, hour6: 0, hour7: 1, hour8: 0, hour9: 1, hour10: 2, hour11: 1, hour12: 0, hour13: 1, hour14: 2, hour15: 1, hour16: 2, hour17: 3, hour18: 2, hour19: 1, hour20: 0, hour21: 1, hour22: 0, hour23: 0 },
      { day: "Saturday", hour0: 0, hour1: 0, hour2: 0, hour3: 0, hour4: 0, hour5: 0, hour6: 0, hour7: 0, hour8: 1, hour9: 2, hour10: 3, hour11: 4, hour12: 3, hour13: 2, hour14: 1, hour15: 0, hour16: 1, hour17: 0, hour18: 1, hour19: 2, hour20: 1, hour21: 0, hour22: 0, hour23: 0 },
      { day: "Sunday", hour0: 0, hour1: 0, hour2: 0, hour3: 0, hour4: 0, hour5: 0, hour6: 0, hour7: 0, hour8: 0, hour9: 1, hour10: 2, hour11: 3, hour12: 4, hour13: 3, hour14: 2, hour15: 1, hour16: 2, hour17: 3, hour18: 2, hour19: 1, hour20: 0, hour21: 0, hour22: 0, hour23: 0 }
    ],
    mostProductiveDay: "Wednesday",
    mostProductiveTime: "15:00 - 16:00",
    totalStudyHours: {
      week: 28.5,
      month: 112.3,
      overall: 342.8
    }
  };

  // Mock skill mastery data
  const skillMasteryData = {
    domains: [
      { name: "Web Development", score: 82, growth: 12 },
      { name: "Data Science", score: 65, growth: 8 },
      { name: "UX/UI Design", score: 78, growth: 15 },
      { name: "JavaScript", score: 70, growth: 10 },
      { name: "Python", score: 60, growth: 5 },
      { name: "Database Management", score: 55, growth: 7 }
    ],
    recentAchievements: [
      { id: 1, title: "CSS Master", description: "Completed all CSS advanced exercises with 90%+ score", date: "2023-06-15T14:30:00" },
      { id: 2, title: "Data Visualizer", description: "Created 5 different types of data visualizations", date: "2023-06-10T10:15:00" }
    ]
  };

  // Mock peer comparison data
  const peerComparisonData = {
    courseProgress: {
      user: 68,
      classMean: 62,
      top25Percent: 85
    },
    assignmentCompletion: {
      user: 92,
      classMean: 78,
      top25Percent: 96
    },
    quizScores: {
      user: 82,
      classMean: 76,
      top25Percent: 90
    },
    participationRate: {
      user: 76,
      classMean: 60,
      top25Percent: 85
    }
  };

  // Mock personalized recommendations
  const recommendationsData = {
    studyHabits: [
      { id: 1, title: "Study during your peak productivity hours", description: "Your data shows you\'re most productive between 3-4 PM. Try to schedule challenging tasks during this time." },
      { id: 2, title: "Take more breaks on Thursdays", description: "Your performance data shows a dip on Thursdays. Consider shorter, more frequent study sessions on this day." }
    ],
    contentRecommendations: [
      { id: 1, title: "Review JavaScript Promises", description: "Based on your recent quiz results, this concept needs reinforcement.", course: "Advanced JavaScript Concepts" },
      { id: 2, title: "Practice with Python Pandas", description: "This will help strengthen your data manipulation skills for upcoming assignments.", course: "Data Science Fundamentals" }
    ],
    skillGaps: [
      { id: 1, title: "Database Query Optimization", description: "This skill would complement your current learning path.", course: "Database Management" },
      { id: 2, title: "Mobile-First Design Principles", description: "This would enhance your UX/UI design capabilities.", course: "UX/UI Design Principles" }
    ]
  };

  // Mock goals data
  const goalsData = {
    active: [
      { id: 1, title: "Complete Data Science course", progress: 65, deadline: "2023-08-15T23:59:59", type: "course" },
      { id: 2, title: "Practice coding for 30 minutes daily", progress: 80, deadline: "2023-07-01T23:59:59", type: "habit" },
      { id: 3, title: "Improve JavaScript test scores by 15%", progress: 40, deadline: "2023-07-30T23:59:59", type: "skill" }
    ],
    completed: [
      { id: 4, title: "Submit UX Design project", completedDate: "2023-06-10T16:45:00", type: "assignment" },
      { id: 5, title: "Maintain 7-day study streak", completedDate: "2023-06-18T23:59:59", type: "habit" }
    ],
    suggested: [
      { id: 6, title: "Improve Database Management skills", description: "Based on your skill gap analysis", type: "skill" },
      { id: 7, title: "Participate in 3 discussion forums weekly", description: "To enhance collaborative learning", type: "engagement" }
    ]
  };

  // Timeframe options for filtering data
  const timeframeOptions = [
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "quarter", label: "This Quarter" },
    { value: "year", label: "This Year" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        userData={userData} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      
      <main className="container mx-auto px-4 py-6 lg:px-8">
        {/* Page Header with Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <div className="flex items-center mb-2">
              <Link to="/student-dashboard" className="text-gray-500 hover:text-primary">
                <Icon name="ChevronLeft" size={20} className="mr-1" />
                <span className="body-large">Back to Dashboard</span>
              </Link>
            </div>
            <h1 className="display-medium text-gray-900">Learning Analytics</h1>
            <p className="body-large text-gray-700 mt-1">Track your progress and optimize your learning journey</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center">
            <span className="body text-gray-700 mr-2">Timeframe:</span>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="border border-gray-300 rounded-md py-2 pl-3 pr-8 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            >
              {timeframeOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main content area */}
          <div className="lg:col-span-8">
            {/* Performance Summary Section */}
            <PerformanceSummary data={performanceData} timeframe={selectedTimeframe} />
            
            {/* Activity Heatmap Section */}
            <ActivityHeatmap data={activityData} timeframe={selectedTimeframe} />
            
            {/* Skill Mastery Section */}
            <SkillMastery data={skillMasteryData} />
            
            {/* Peer Comparison Section */}
            <PeerComparison data={peerComparisonData} />
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-4">
            {/* Goal Tracker Section */}
            <GoalTracker goals={goalsData} />
            
            {/* Personalized Recommendations Section */}
            <PersonalizedRecommendations recommendations={recommendationsData} />
            
            {/* Quick Navigation Links */}
            <div className="bg-white rounded-lg shadow p-4 mt-6">
              <h3 className="subheading text-gray-900 mb-3">Quick Links</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link 
                  to="/student-dashboard" 
                  className="flex flex-col items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <Icon name="Layout" size={24} className="text-primary mb-2" />
                  <span className="button-text text-gray-700 text-center">Dashboard</span>
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
                  to="/gamification-hub" 
                  className="flex flex-col items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <Icon name="Award" size={24} className="text-primary mb-2" />
                  <span className="button-text text-gray-700 text-center">Achievements</span>
                </Link>
                <Link 
                  to="/video-lesson-player" 
                  className="flex flex-col items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors col-span-2"
                >
                  <Icon name="Play" size={24} className="text-primary mb-2" />
                  <span className="button-text text-gray-700 text-center">Resume Learning</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentAnalytics;