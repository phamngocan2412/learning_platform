import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const AssessmentSettings = ({ settings, setSettings }) => {
  const [activeSection, setActiveSection] = useState("general");

  const updateSettings = (section, field, value) => {
    if (section === "root") {
      setSettings({
        ...settings,
        [field]: value
      });
    } else {
      setSettings({
        ...settings,
        [section]: {
          ...settings[section],
          [field]: value
        }
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Settings Navigation */}
        <div className="md:col-span-3 border-r border-gray-200">
          <nav className="p-4">
            <ul className="space-y-1">
              <li>
                <button 
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                    activeSection === 'general' ? 'bg-primary bg-opacity-10 text-primary' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setActiveSection('general')}
                >
                  <Icon name="Settings" size={18} className="mr-2" />
                  <span className="body">General Settings</span>
                </button>
              </li>
              <li>
                <button 
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                    activeSection === 'timing' ? 'bg-primary bg-opacity-10 text-primary' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setActiveSection('timing')}
                >
                  <Icon name="Clock" size={18} className="mr-2" />
                  <span className="body">Timing & Attempts</span>
                </button>
              </li>
              <li>
                <button 
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                    activeSection === 'access' ? 'bg-primary bg-opacity-10 text-primary' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setActiveSection('access')}
                >
                  <Icon name="Lock" size={18} className="mr-2" />
                  <span className="body">Access Control</span>
                </button>
              </li>
              <li>
                <button 
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                    activeSection === 'adaptive' ? 'bg-primary bg-opacity-10 text-primary' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setActiveSection('adaptive')}
                >
                  <Icon name="Sliders" size={18} className="mr-2" />
                  <span className="body">Adaptive Settings</span>
                </button>
              </li>
              <li>
                <button 
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                    activeSection === 'grading' ? 'bg-primary bg-opacity-10 text-primary' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setActiveSection('grading')}
                >
                  <Icon name="Award" size={18} className="mr-2" />
                  <span className="body">Grading</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
        
        {/* Settings Content */}
        <div className="md:col-span-9 p-6">
          {activeSection === 'general' && (
            <div>
              <h2 className="heading text-gray-900 mb-4">General Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block body-large font-medium text-gray-900">Randomize Questions</label>
                    <p className="body text-gray-500">Present questions in a random order for each student</p>
                  </div>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      id="randomizeQuestions" 
                      checked={settings.randomizeQuestions}
                      onChange={(e) => updateSettings("root", "randomizeQuestions", e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`block h-6 rounded-full w-12 ${settings.randomizeQuestions ? 'bg-primary' : 'bg-gray-300'}`}></div>
                    <div className={`absolute left-1 top-1 bg-white border-2 rounded-full h-4 w-4 transition-transform ${settings.randomizeQuestions ? 'transform translate-x-6 border-primary' : 'border-gray-300'}`}></div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="showFeedback" className="block body-large font-medium text-gray-900">Show Feedback</label>
                  <p className="body text-gray-500 mb-2">When to display feedback to students</p>
                  <select
                    id="showFeedback"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    value={settings.showFeedback}
                    onChange={(e) => updateSettings("root", "showFeedback", e.target.value)}
                  >
                    <option value="immediately">Immediately after each question</option>
                    <option value="after_submission">After assessment submission</option>
                    <option value="after_due_date">After due date</option>
                    <option value="never">Never</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="gradingScheme" className="block body-large font-medium text-gray-900">Grading Scheme</label>
                  <p className="body text-gray-500 mb-2">How to calculate the final score</p>
                  <select
                    id="gradingScheme"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    value={settings.gradingScheme}
                    onChange={(e) => updateSettings("root", "gradingScheme", e.target.value)}
                  >
                    <option value="points">Points-based (sum of all points)</option>
                    <option value="percentage">Percentage (proportion of total points)</option>
                    <option value="custom">Custom grading scale</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          
          {activeSection === 'timing' && (
            <div>
              <h2 className="heading text-gray-900 mb-4">Timing & Attempts</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="timeLimit" className="block body-large font-medium text-gray-900">Time Limit (minutes)</label>
                  <p className="body text-gray-500 mb-2">Set to 0 for no time limit</p>
                  <input
                    id="timeLimit"
                    type="number"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    value={settings.timeLimit}
                    onChange={(e) => updateSettings("root", "timeLimit", parseInt(e.target.value) || 0)}
                  />
                </div>
                
                <div>
                  <label htmlFor="attempts" className="block body-large font-medium text-gray-900">Allowed Attempts</label>
                  <p className="body text-gray-500 mb-2">How many times a student can take this assessment</p>
                  <input
                    id="attempts"
                    type="number"
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    value={settings.attempts}
                    onChange={(e) => updateSettings("root", "attempts", parseInt(e.target.value) || 1)}
                  />
                </div>
                
                <div>
                  <label htmlFor="passingScore" className="block body-large font-medium text-gray-900">Passing Score (%)</label>
                  <p className="body text-gray-500 mb-2">Minimum percentage required to pass</p>
                  <input
                    id="passingScore"
                    type="number"
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    value={settings.passingScore}
                    onChange={(e) => updateSettings("root", "passingScore", parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
            </div>
          )}
          
          {activeSection === 'access' && (
            <div>
              <h2 className="heading text-gray-900 mb-4">Access Control</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startDate" className="block body-large font-medium text-gray-900">Available From</label>
                    <input
                      id="startDate"
                      type="datetime-local"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      value={settings.accessControl.startDate}
                      onChange={(e) => updateSettings("accessControl", "startDate", e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="endDate" className="block body-large font-medium text-gray-900">Available Until</label>
                    <input
                      id="endDate"
                      type="datetime-local"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      value={settings.accessControl.endDate}
                      onChange={(e) => updateSettings("accessControl", "endDate", e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block body-large font-medium text-gray-900">Require Password</label>
                    <p className="body text-gray-500">Students must enter a password to access this assessment</p>
                  </div>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      id="requirePassword" 
                      checked={settings.accessControl.requirePassword}
                      onChange={(e) => updateSettings("accessControl", "requirePassword", e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`block h-6 rounded-full w-12 ${settings.accessControl.requirePassword ? 'bg-primary' : 'bg-gray-300'}`}></div>
                    <div className={`absolute left-1 top-1 bg-white border-2 rounded-full h-4 w-4 transition-transform ${settings.accessControl.requirePassword ? 'transform translate-x-6 border-primary' : 'border-gray-300'}`}></div>
                  </div>
                </div>
                
                {settings.accessControl.requirePassword && (
                  <div>
                    <label htmlFor="password" className="block body-large font-medium text-gray-900">Password</label>
                    <input
                      id="password"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      value={settings.accessControl.password}
                      onChange={(e) => updateSettings("accessControl", "password", e.target.value)}
                      placeholder="Enter access password"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeSection === 'adaptive' && (
            <div>
              <h2 className="heading text-gray-900 mb-4">Adaptive Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block body-large font-medium text-gray-900">Enable Adaptive Assessment</label>
                    <p className="body text-gray-500">Adjust question difficulty based on student performance</p>
                  </div>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      id="enableAdaptive" 
                      checked={settings.adaptiveSettings.enabled}
                      onChange={(e) => updateSettings("adaptiveSettings", "enabled", e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`block h-6 rounded-full w-12 ${settings.adaptiveSettings.enabled ? 'bg-primary' : 'bg-gray-300'}`}></div>
                    <div className={`absolute left-1 top-1 bg-white border-2 rounded-full h-4 w-4 transition-transform ${settings.adaptiveSettings.enabled ? 'transform translate-x-6 border-primary' : 'border-gray-300'}`}></div>
                  </div>
                </div>
                
                {settings.adaptiveSettings.enabled && (
                  <>
                    <div>
                      <label htmlFor="difficultyAdjustment" className="block body-large font-medium text-gray-900">Difficulty Adjustment</label>
                      <p className="body text-gray-500 mb-2">How to adjust question difficulty</p>
                      <select
                        id="difficultyAdjustment"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        value={settings.adaptiveSettings.difficultyAdjustment}
                        onChange={(e) => updateSettings("adaptiveSettings", "difficultyAdjustment", e.target.value)}
                      >
                        <option value="performance">Based on performance</option>
                        <option value="confidence">Based on confidence ratings</option>
                        <option value="time">Based on response time</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="initialDifficulty" className="block body-large font-medium text-gray-900">Initial Difficulty</label>
                      <p className="body text-gray-500 mb-2">Starting difficulty level</p>
                      <select
                        id="initialDifficulty"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        value={settings.adaptiveSettings.initialDifficulty}
                        onChange={(e) => updateSettings("adaptiveSettings", "initialDifficulty", e.target.value)}
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          
          {activeSection === 'grading' && (
            <div>
              <h2 className="heading text-gray-900 mb-4">Grading Settings</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="body-large font-medium text-gray-900 mb-2">Grade Display</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="showPointsOnly"
                        name="gradeDisplay"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                        checked
                      />
                      <label htmlFor="showPointsOnly" className="ml-2 block body text-gray-700">
                        Show points only
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="showPercentage"
                        name="gradeDisplay"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <label htmlFor="showPercentage" className="ml-2 block body text-gray-700">
                        Show percentage
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="showLetterGrade"
                        name="gradeDisplay"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <label htmlFor="showLetterGrade" className="ml-2 block body text-gray-700">
                        Show letter grade
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="body-large font-medium text-gray-900 mb-2">Multiple Attempts Handling</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="highestScore"
                        name="attemptsHandling"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                        checked
                      />
                      <label htmlFor="highestScore" className="ml-2 block body text-gray-700">
                        Highest score
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="latestAttempt"
                        name="attemptsHandling"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <label htmlFor="latestAttempt" className="ml-2 block body text-gray-700">
                        Latest attempt
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="averageScore"
                        name="attemptsHandling"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <label htmlFor="averageScore" className="ml-2 block body text-gray-700">
                        Average score
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="allowPartialCredit"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    checked
                  />
                  <label htmlFor="allowPartialCredit" className="ml-2 block body text-gray-700">
                    Allow partial credit for questions
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentSettings;