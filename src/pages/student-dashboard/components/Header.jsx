import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const Header = ({ userData, searchQuery, setSearchQuery }) => {
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

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="Search" size={18} className="text-gray-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Search courses, instructors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Navigation and user menu */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-primary rounded-full focus:outline-none focus:ring-2 focus:ring-primary">
              <Icon name="Bell" size={22} />
              <span className="sr-only">Notifications</span>
            </button>
            <button className="p-2 text-gray-500 hover:text-primary rounded-full focus:outline-none focus:ring-2 focus:ring-primary">
              <Icon name="MessageCircle" size={22} />
              <span className="sr-only">Messages</span>
            </button>
            <div className="relative">
              <button className="flex items-center focus:outline-none focus:ring-2 focus:ring-primary rounded-full">
                <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-gray-200">
                  <Image
                    src={userData.avatar}
                    alt={userData.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="hidden md:block ml-2 text-sm font-medium text-gray-700">
                  {userData.name}
                </span>
                <Icon name="ChevronDown" size={16} className="ml-1 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Search" size={18} className="text-gray-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Search courses, instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;