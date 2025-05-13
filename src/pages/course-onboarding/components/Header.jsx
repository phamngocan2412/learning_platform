import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const Header = ({ courseTitle }) => {
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

          {/* Course title */}
          <div className="hidden md:block">
            <h1 className="subheading text-gray-900">{courseTitle}</h1>
          </div>

          {/* Navigation and user menu */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/student-dashboard" 
              className="button-text text-gray-700 hover:text-primary flex items-center"
            >
              <Icon name="Home" size={20} className="mr-1" />
              <span className="hidden md:inline">Dashboard</span>
            </Link>
            <button className="p-2 text-gray-500 hover:text-primary rounded-full focus:outline-none focus:ring-2 focus:ring-primary">
              <Icon name="HelpCircle" size={22} />
              <span className="sr-only">Help</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile course title */}
      <div className="md:hidden bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 py-2">
          <h1 className="body-large font-medium text-gray-900">{courseTitle}</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;