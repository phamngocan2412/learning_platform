import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const LearningPreferences = () => {
  // State for form inputs
  const [studyGoal, setStudyGoal] = useState("complete");
  const [weeklyHours, setWeeklyHours] = useState("4-6");
  const [preferredTime, setPreferredTime] = useState("evening");
  const [learningStyle, setLearningStyle] = useState("visual");
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    browser: true,
    mobile: false,
    reminders: true,
    updates: true,
    discussions: false
  });
  const [challengeAreas, setChallengeAreas] = useState([]);

  // Handle challenge areas toggle
  const toggleChallengeArea = (area) => {
    if (challengeAreas.includes(area)) {
      setChallengeAreas(challengeAreas.filter(item => item !== area));
    } else {
      setChallengeAreas([...challengeAreas, area]);
    }
  };

  // Handle notification preference toggle
  const toggleNotification = (key) => {
    setNotificationPreferences({
      ...notificationPreferences,
      [key]: !notificationPreferences[key]
    });
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 bg-primary bg-opacity-5 border-b border-primary border-opacity-20">
        <h2 className="heading text-gray-900 flex items-center">
          <Icon name="Settings" size={20} className="text-primary mr-2" />
          Learning Preferences
        </h2>
      </div>
      
      <div className="p-4 md:p-6">
        <div className="mb-6">
          <h3 className="subheading text-gray-900 mb-2">Customize Your Learning Experience</h3>
          <p className="body text-gray-700">
            Setting your preferences helps us tailor the learning experience to your needs and schedule. You can always change these settings later.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Study Goals */}
          <div>
            <h4 className="body-large font-medium text-gray-900 mb-3">Study Goal</h4>
            <div className="space-y-2">
              <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="studyGoal"
                  value="complete"
                  checked={studyGoal === "complete"}
                  onChange={() => setStudyGoal("complete")}
                  className="h-4 w-4 text-primary focus:ring-primary focus:ring-2 focus:outline-none"
                />
                <div className="ml-3">
                  <span className="body font-medium text-gray-900">Complete the entire course</span>
                  <p className="caption text-gray-700">I want to learn all aspects of web development</p>
                </div>
              </label>
              
              <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="studyGoal"
                  value="specific"
                  checked={studyGoal === "specific"}
                  onChange={() => setStudyGoal("specific")}
                  className="h-4 w-4 text-primary focus:ring-primary focus:ring-2 focus:outline-none"
                />
                <div className="ml-3">
                  <span className="body font-medium text-gray-900">Focus on specific skills</span>
                  <p className="caption text-gray-700">I'm interested in particular topics only</p>
                </div>
              </label>
              
              <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="studyGoal"
                  value="project"
                  checked={studyGoal === "project"}
                  onChange={() => setStudyGoal("project")}
                  className="h-4 w-4 text-primary focus:ring-primary focus:ring-2 focus:outline-none"
                />
                <div className="ml-3">
                  <span className="body font-medium text-gray-900">Build a specific project</span>
                  <p className="caption text-gray-700">I have a project in mind I want to complete</p>
                </div>
              </label>
            </div>
          </div>
          
          {/* Weekly Commitment */}
          <div>
            <h4 className="body-large font-medium text-gray-900 mb-3">Weekly Time Commitment</h4>
            <div className="space-y-2">
              <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="weeklyHours"
                  value="1-3"
                  checked={weeklyHours === "1-3"}
                  onChange={() => setWeeklyHours("1-3")}
                  className="h-4 w-4 text-primary focus:ring-primary focus:ring-2 focus:outline-none"
                />
                <div className="ml-3">
                  <span className="body font-medium text-gray-900">1-3 hours per week</span>
                  <p className="caption text-gray-700">Casual pace</p>
                </div>
              </label>
              
              <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="weeklyHours"
                  value="4-6"
                  checked={weeklyHours === "4-6"}
                  onChange={() => setWeeklyHours("4-6")}
                  className="h-4 w-4 text-primary focus:ring-primary focus:ring-2 focus:outline-none"
                />
                <div className="ml-3">
                  <span className="body font-medium text-gray-900">4-6 hours per week</span>
                  <p className="caption text-gray-700">Recommended pace</p>
                </div>
              </label>
              
              <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="weeklyHours"
                  value="7+"
                  checked={weeklyHours === "7+"}
                  onChange={() => setWeeklyHours("7+")}
                  className="h-4 w-4 text-primary focus:ring-primary focus:ring-2 focus:outline-none"
                />
                <div className="ml-3">
                  <span className="body font-medium text-gray-900">7+ hours per week</span>
                  <p className="caption text-gray-700">Accelerated pace</p>
                </div>
              </label>
            </div>
          </div>
          
          {/* Preferred Study Time */}
          <div>
            <h4 className="body-large font-medium text-gray-900 mb-3">Preferred Study Time</h4>
            <select
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:ring-2 focus:outline-none"
            >
              <option value="morning">Morning (6am - 12pm)</option>
              <option value="afternoon">Afternoon (12pm - 5pm)</option>
              <option value="evening">Evening (5pm - 10pm)</option>
              <option value="night">Late Night (10pm - 6am)</option>
              <option value="weekend">Weekends Only</option>
              <option value="varied">Varied Times</option>
            </select>
          </div>
          
          {/* Learning Style */}
          <div>
            <h4 className="body-large font-medium text-gray-900 mb-3">Primary Learning Style</h4>
            <select
              value={learningStyle}
              onChange={(e) => setLearningStyle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:ring-2 focus:outline-none"
            >
              <option value="visual">Visual (videos, diagrams, infographics)</option>
              <option value="auditory">Auditory (lectures, discussions)</option>
              <option value="reading">Reading/Writing (articles, documentation)</option>
              <option value="kinesthetic">Hands-on (projects, exercises, coding)</option>
            </select>
          </div>
        </div>
        
        {/* Challenge Areas */}
        <div className="mt-6">
          <h4 className="body-large font-medium text-gray-900 mb-3">Areas You Find Challenging</h4>
          <p className="body text-gray-700 mb-3">
            Select any topics you've struggled with in the past or anticipate needing extra help with:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {["HTML syntax", "CSS layouts", "JavaScript logic", "Responsive design", "Browser compatibility", "Performance optimization"].map((area) => (
              <label key={area} className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={challengeAreas.includes(area)}
                  onChange={() => toggleChallengeArea(area)}
                  className="h-4 w-4 text-primary rounded focus:ring-primary focus:ring-2 focus:outline-none"
                />
                <span className="ml-3 body text-gray-900">{area}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Notification Preferences */}
        <div className="mt-6">
          <h4 className="body-large font-medium text-gray-900 mb-3">Notification Preferences</h4>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h5 className="body font-medium text-gray-900 mb-2">Notification Channels</h5>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationPreferences.email}
                  onChange={() => toggleNotification('email')}
                  className="h-4 w-4 text-primary rounded focus:ring-primary focus:ring-2 focus:outline-none"
                />
                <span className="ml-3 body text-gray-900">Email notifications</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationPreferences.browser}
                  onChange={() => toggleNotification('browser')}
                  className="h-4 w-4 text-primary rounded focus:ring-primary focus:ring-2 focus:outline-none"
                />
                <span className="ml-3 body text-gray-900">Browser notifications</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationPreferences.mobile}
                  onChange={() => toggleNotification('mobile')}
                  className="h-4 w-4 text-primary rounded focus:ring-primary focus:ring-2 focus:outline-none"
                />
                <span className="ml-3 body text-gray-900">Mobile app notifications</span>
              </label>
            </div>
            
            <h5 className="body font-medium text-gray-900 mt-4 mb-2">Notification Types</h5>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationPreferences.reminders}
                  onChange={() => toggleNotification('reminders')}
                  className="h-4 w-4 text-primary rounded focus:ring-primary focus:ring-2 focus:outline-none"
                />
                <span className="ml-3 body text-gray-900">Study reminders</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationPreferences.updates}
                  onChange={() => toggleNotification('updates')}
                  className="h-4 w-4 text-primary rounded focus:ring-primary focus:ring-2 focus:outline-none"
                />
                <span className="ml-3 body text-gray-900">Course updates</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationPreferences.discussions}
                  onChange={() => toggleNotification('discussions')}
                  className="h-4 w-4 text-primary rounded focus:ring-primary focus:ring-2 focus:outline-none"
                />
                <span className="ml-3 body text-gray-900">Discussion replies</span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-info bg-opacity-5 rounded-lg p-4">
          <div className="flex items-start">
            <Icon name="Info" size={20} className="text-info mt-1 mr-3" />
            <p className="body text-gray-700">
              Your preferences help us personalize your learning experience. You can change these settings at any time from your account preferences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPreferences;