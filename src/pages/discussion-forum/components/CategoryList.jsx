import React from "react";
import Icon from "../../../components/AppIcon";

const CategoryList = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
      <div className="p-4 border-b border-gray-200">
        <h3 className="subheading text-gray-900">Categories</h3>
      </div>
      
      <div className="p-2">
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => setActiveCategory(category.id)}
                className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between transition-colors ${
                  activeCategory === category.id
                    ? "bg-primary bg-opacity-10 text-primary" :"hover:bg-gray-100 text-gray-700"
                }`}
              >
                <div className="flex items-center">
                  <Icon 
                    name={category.icon} 
                    size={18} 
                    className={activeCategory === category.id ? "text-primary mr-2" : "text-gray-500 mr-2"} 
                  />
                  <span className="body">{category.name}</span>
                </div>
                <span className="badge-text bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryList;