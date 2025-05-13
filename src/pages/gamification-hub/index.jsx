import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Image from "../../components/AppImage";
import Header from "../student-dashboard/components/Header";
import AchievementCard from "./components/AchievementCard";
import LevelProgress from "./components/LevelProgress";
import Leaderboard from "./components/Leaderboard";
import DailyChallenges from "./components/DailyChallenges";
import RewardsSection from "./components/RewardsSection";
import FriendActivity from "./components/FriendActivity";

const GamificationHub = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("achievements");
  
  // Mock user data
  const userData = {
    name: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    level: 14,
    xp: 2450,
    nextLevelXp: 3000,
    stats: {
      achievements: 12,
      streakDays: 7,
      points: 2450,
      completedCourses: 3,
      inProgressCourses: 4
    }
  };

  // Mock achievements data
  const achievements = [
    {
      id: 1,
      title: "Fast Learner",
      description: "Complete 5 lessons in a single day",
      category: "Academic Excellence",
      icon: "Zap",
      iconBg: "bg-achievement",
      progress: 100,
      isCompleted: true,
      dateEarned: "2023-05-15T14:30:00",
      xpEarned: 150
    },
    {
      id: 2,
      title: "Knowledge Seeker",
      description: "Complete your first course",
      category: "Academic Excellence",
      icon: "BookOpen",
      iconBg: "bg-primary",
      progress: 100,
      isCompleted: true,
      dateEarned: "2023-04-20T10:15:00",
      xpEarned: 300
    },
    {
      id: 3,
      title: "Consistent Learner",
      description: "Maintain a 7-day learning streak",
      category: "Consistency",
      icon: "Calendar",
      iconBg: "bg-engagement",
      progress: 100,
      isCompleted: true,
      dateEarned: "2023-06-18T16:45:00",
      xpEarned: 200
    },
    {
      id: 4,
      title: "Helpful Peer",
      description: "Answer 10 questions in discussion forums",
      category: "Collaboration",
      icon: "MessageCircle",
      iconBg: "bg-info",
      progress: 70,
      isCompleted: false,
      currentProgress: 7,
      totalNeeded: 10,
      xpReward: 250
    },
    {
      id: 5,
      title: "Perfect Score",
      description: "Get 100% on any quiz",
      category: "Academic Excellence",
      icon: "Award",
      iconBg: "bg-success",
      progress: 100,
      isCompleted: true,
      dateEarned: "2023-05-28T11:30:00",
      xpEarned: 200
    },
    {
      id: 6,
      title: "Early Bird",
      description: "Complete a lesson before 8 AM",
      category: "Consistency",
      icon: "Sunrise",
      iconBg: "bg-warning",
      progress: 0,
      isCompleted: false,
      xpReward: 100
    },
    {
      id: 7,
      title: "Night Owl",
      description: "Complete a lesson after 10 PM",
      category: "Consistency",
      icon: "Moon",
      iconBg: "bg-achievement",
      progress: 100,
      isCompleted: true,
      dateEarned: "2023-06-10T22:45:00",
      xpEarned: 100
    },
    {
      id: 8,
      title: "Discussion Starter",
      description: "Create 5 discussion topics",
      category: "Collaboration",
      icon: "MessageSquare",
      iconBg: "bg-info",
      progress: 40,
      isCompleted: false,
      currentProgress: 2,
      totalNeeded: 5,
      xpReward: 150
    },
    {
      id: 9,
      title: "Code Master",
      description: "Submit 10 perfect coding assignments",
      category: "Academic Excellence",
      icon: "Code",
      iconBg: "bg-primary",
      progress: 30,
      isCompleted: false,
      currentProgress: 3,
      totalNeeded: 10,
      xpReward: 300
    },
    {
      id: 10,
      title: "Feedback Champion",
      description: "Provide feedback on 5 peer assignments",
      category: "Collaboration",
      icon: "ThumbsUp",
      iconBg: "bg-engagement",
      progress: 60,
      isCompleted: false,
      currentProgress: 3,
      totalNeeded: 5,
      xpReward: 150
    }
  ];

  // Mock leaderboard data
  const leaderboardData = [
    {
      id: 1,
      name: "Emma Wilson",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&dpr=1",
      points: 3250,
      rank: 1,
      isCurrentUser: false,
      change: "up"
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&dpr=1",
      points: 2950,
      rank: 2,
      isCurrentUser: false,
      change: "same"
    },
    {
      id: 3,
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      points: 2450,
      rank: 3,
      isCurrentUser: true,
      change: "up"
    },
    {
      id: 4,
      name: "Sarah Martinez",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&dpr=1",
      points: 2300,
      rank: 4,
      isCurrentUser: false,
      change: "down"
    },
    {
      id: 5,
      name: "David Kim",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&dpr=1",
      points: 2100,
      rank: 5,
      isCurrentUser: false,
      change: "up"
    }
  ];

  // Mock daily challenges data
  const dailyChallenges = [
    {
      id: 1,
      title: "Complete a quiz",
      description: "Finish any quiz in your enrolled courses",
      xpReward: 50,
      isCompleted: false,
      icon: "CheckSquare"
    },
    {
      id: 2,
      title: "Watch 2 video lessons",
      description: "Complete any two video lessons",
      xpReward: 30,
      isCompleted: true,
      icon: "Play"
    },
    {
      id: 3,
      title: "Reply to a discussion",
      description: "Contribute to any active discussion thread",
      xpReward: 25,
      isCompleted: false,
      icon: "MessageCircle"
    }
  ];

  // Mock rewards data
  const rewards = [
    {
      id: 1,
      title: "Dark Mode Theme",
      description: "Unlock a sleek dark mode interface",
      pointsCost: 1000,
      isUnlocked: true,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      category: "Interface"
    },
    {
      id: 2,
      title: "Premium Avatar Pack",
      description: "Exclusive profile avatars",
      pointsCost: 1500,
      isUnlocked: true,
      image: "https://images.pexels.com/photos/1983037/pexels-photo-1983037.jpeg?auto=compress&cs=tinysrgb&w=300",
      category: "Customization"
    },
    {
      id: 3,
      title: "Certificate Frames",
      description: "Decorative frames for your certificates",
      pointsCost: 2000,
      isUnlocked: false,
      image: "https://images.pexels.com/photos/3768126/pexels-photo-3768126.jpeg?auto=compress&cs=tinysrgb&w=300",
      category: "Customization"
    },
    {
      id: 4,
      title: "Bonus Course Material",
      description: "Access to exclusive learning resources",
      pointsCost: 3000,
      isUnlocked: false,
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      category: "Content"
    }
  ];

  // Mock friend activity data
  const friendActivity = [
    {
      id: 1,
      name: "Emma Wilson",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&dpr=1",
      achievement: "Fast Learner",
      timestamp: "2023-06-19T14:30:00"
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&dpr=1",
      achievement: "Perfect Score",
      timestamp: "2023-06-18T10:15:00"
    },
    {
      id: 3,
      name: "Sarah Martinez",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&dpr=1",
      achievement: "Consistent Learner",
      timestamp: "2023-06-17T16:45:00"
    }
  ];

  // Filter achievements by category
  const achievementCategories = [...new Set(achievements.map(a => a.category))];
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const filteredAchievements = selectedCategory === "All" 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        userData={userData} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      
      <main className="container mx-auto px-4 py-6 lg:px-8">
        {/* User Profile and Level Banner */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="bg-primary bg-opacity-10 p-6 border-b border-primary border-opacity-20">
            <div className="flex flex-col md:flex-row items-center">
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-primary">
                    <Image
                      src={userData.avatar}
                      alt={userData.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-achievement text-white rounded-full h-8 w-8 flex items-center justify-center border-2 border-white">
                    <span className="text-xs font-bold">{userData.level}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="display-medium text-gray-900 mb-1">{userData.name}</h1>
                <p className="body-large text-gray-700 mb-2">Level {userData.level} Explorer</p>
                <LevelProgress 
                  currentXp={userData.xp} 
                  nextLevelXp={userData.nextLevelXp} 
                  level={userData.level} 
                />
              </div>
              
              <div className="mt-4 md:mt-0 flex flex-wrap justify-center md:justify-end gap-3">
                <Link 
                  to="/student-dashboard" 
                  className="button-text bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md flex items-center transition-colors"
                >
                  <Icon name="ArrowLeft" size={16} className="mr-2" />
                  Back to Dashboard
                </Link>
                <button 
                  className="button-text bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md flex items-center transition-colors"
                >
                  <Icon name="Share2" size={16} className="mr-2" />
                  Share Progress
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
          <div className="flex overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab("achievements")}
              className={`flex-1 py-3 px-4 text-center button-text transition-colors ${
                activeTab === "achievements" ?"text-primary border-b-2 border-primary" :"text-gray-700 hover:text-gray-900"
              }`}
            >
              <Icon 
                name="Award" 
                size={18} 
                className={`inline mr-2 ${activeTab === "achievements" ? "text-primary" : "text-gray-500"}`} 
              />
              Achievements
            </button>
            <button
              onClick={() => setActiveTab("leaderboard")}
              className={`flex-1 py-3 px-4 text-center button-text transition-colors ${
                activeTab === "leaderboard" ?"text-primary border-b-2 border-primary" :"text-gray-700 hover:text-gray-900"
              }`}
            >
              <Icon 
                name="BarChart2" 
                size={18} 
                className={`inline mr-2 ${activeTab === "leaderboard" ? "text-primary" : "text-gray-500"}`} 
              />
              Leaderboard
            </button>
            <button
              onClick={() => setActiveTab("challenges")}
              className={`flex-1 py-3 px-4 text-center button-text transition-colors ${
                activeTab === "challenges" ?"text-primary border-b-2 border-primary" :"text-gray-700 hover:text-gray-900"
              }`}
            >
              <Icon 
                name="Target" 
                size={18} 
                className={`inline mr-2 ${activeTab === "challenges" ? "text-primary" : "text-gray-500"}`} 
              />
              Daily Challenges
            </button>
            <button
              onClick={() => setActiveTab("rewards")}
              className={`flex-1 py-3 px-4 text-center button-text transition-colors ${
                activeTab === "rewards" ?"text-primary border-b-2 border-primary" :"text-gray-700 hover:text-gray-900"
              }`}
            >
              <Icon 
                name="Gift" 
                size={18} 
                className={`inline mr-2 ${activeTab === "rewards" ? "text-primary" : "text-gray-500"}`} 
              />
              Rewards
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main content area */}
          <div className="lg:col-span-8">
            {/* Achievements Tab */}
            {activeTab === "achievements" && (
              <div>
                <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="heading text-gray-900 flex items-center">
                      <Icon name="Award" size={20} className="text-primary mr-2" />
                      My Achievements
                    </h2>
                    <div className="flex items-center">
                      <span className="body text-gray-700 mr-2">
                        {achievements.filter(a => a.isCompleted).length} earned
                      </span>
                      <span className="mx-2 text-gray-300">|</span>
                      <span className="body text-gray-700">
                        {achievements.length - achievements.filter(a => a.isCompleted).length} locked
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 border-b border-gray-200 overflow-x-auto">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedCategory("All")}
                        className={`px-3 py-1 rounded-full text-sm ${
                          selectedCategory === "All" ?"bg-primary text-white" :"bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        All
                      </button>
                      {achievementCategories.map(category => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                            selectedCategory === category
                              ? "bg-primary text-white" :"bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredAchievements.map(achievement => (
                        <AchievementCard key={achievement.id} achievement={achievement} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Leaderboard Tab */}
            {activeTab === "leaderboard" && (
              <Leaderboard leaderboardData={leaderboardData} />
            )}

            {/* Daily Challenges Tab */}
            {activeTab === "challenges" && (
              <DailyChallenges challenges={dailyChallenges} />
            )}

            {/* Rewards Tab */}
            {activeTab === "rewards" && (
              <RewardsSection rewards={rewards} userPoints={userData.stats.points} />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            {/* Friend Activity Section */}
            <FriendActivity activities={friendActivity} />

            {/* Stats Summary */}
            <div className="bg-white rounded-lg shadow p-4 mt-6">
              <h3 className="subheading text-gray-900 mb-3">Your Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex items-center">
                    <Icon name="Award" size={18} className="text-achievement mr-2" />
                    <span className="body text-gray-700">Achievements</span>
                  </div>
                  <p className="display-small text-gray-900 mt-1">
                    {achievements.filter(a => a.isCompleted).length}/{achievements.length}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex items-center">
                    <Icon name="Zap" size={18} className="text-engagement mr-2" />
                    <span className="body text-gray-700">Streak</span>
                  </div>
                  <p className="display-small text-gray-900 mt-1">
                    {userData.stats.streakDays} days
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex items-center">
                    <Icon name="Star" size={18} className="text-primary mr-2" />
                    <span className="body text-gray-700">Points</span>
                  </div>
                  <p className="display-small text-gray-900 mt-1">
                    {userData.stats.points}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex items-center">
                    <Icon name="BarChart2" size={18} className="text-info mr-2" />
                    <span className="body text-gray-700">Rank</span>
                  </div>
                  <p className="display-small text-gray-900 mt-1">
                    #{leaderboardData.find(user => user.isCurrentUser)?.rank || "-"}
                  </p>
                </div>
              </div>
            </div>

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
                  to="/student-analytics" 
                  className="flex flex-col items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <Icon name="BarChart2" size={24} className="text-primary mb-2" />
                  <span className="button-text text-gray-700 text-center">Analytics</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GamificationHub;