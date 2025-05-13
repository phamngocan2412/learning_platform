import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const Header = ({ assessmentTitle, setAssessmentTitle, showPreview, setShowPreview }) => {
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

          {/* Assessment title */}
          <div className="flex-1 max-w-md mx-6">
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-gray-900 font-medium"
              value={assessmentTitle}
              onChange={(e) => setAssessmentTitle(e.target.value)}
              placeholder="Enter assessment title"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button 
              className={`p-2 rounded-md ${showPreview ? 'bg-primary bg-opacity-10 text-primary' : 'text-gray-500 hover:text-primary'}`}
              onClick={() => setShowPreview(!showPreview)}
              title={showPreview ? "Exit Preview" : "Preview Assessment"}
            >
              <Icon name={showPreview ? "Edit2" : "Eye"} size={22} />
              <span className="sr-only">{showPreview ? "Exit Preview" : "Preview"}</span>
            </button>
            <button className="p-2 text-gray-500 hover:text-primary rounded-md" title="Version History">
              <Icon name="Clock" size={22} />
              <span className="sr-only">History</span>
            </button>
            <button className="p-2 text-gray-500 hover:text-primary rounded-md" title="Collaboration">
              <Icon name="Users" size={22} />
              <span className="sr-only">Collaborate</span>
            </button>
            <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-gray-200">
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
                alt="User Avatar"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;