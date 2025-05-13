import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const Header = ({ title, courseName, timeRemaining, timerEnabled, toggleTimer }) => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Icon name="BookOpen" size={28} className="text-primary mr-2" />
              <span className="text-xl font-bold text-gray-900">LearnHub</span>
            </Link>
          </div>

          {/* Quiz title and course */}
          <div className="hidden md:flex flex-col items-center">
            <h1 className="subheading text-gray-900">{title}</h1>
            <p className="caption text-gray-700">{courseName}</p>
          </div>

          {/* Timer and exit button */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <button 
                onClick={toggleTimer}
                className="p-2 text-gray-500 hover:text-primary rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <Icon name={timerEnabled ? "Clock" : "ClockOff"} size={22} />
                <span className="sr-only">{timerEnabled ? "Disable Timer" : "Enable Timer"}</span>
              </button>
              {timerEnabled && (
                <span className="ml-2 badge-text font-medium text-gray-700">
                  {timeRemaining}
                </span>
              )}
            </div>
            <Link 
              to="/student-dashboard" 
              className="button-text bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md flex items-center transition-colors"
            >
              <Icon name="X" size={16} className="mr-2" />
              Exit Quiz
            </Link>
          </div>
        </div>

        {/* Mobile quiz title */}
        <div className="md:hidden mt-3 text-center">
          <h1 className="subheading text-gray-900">{title}</h1>
          <p className="caption text-gray-700">{courseName}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;