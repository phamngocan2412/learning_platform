import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const ContentManagement = ({ content }) => {
  const [view, setView] = useState("list");
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  // Get icon based on content type
  const getContentIcon = (type) => {
    switch (type) {
      case 'lesson':
        return "BookOpen";
      case 'assignment':
        return "FileText";
      case 'quiz':
        return "CheckSquare";
      case 'discussion':
        return "MessageSquare";
      default:
        return "File";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="heading text-gray-900 flex items-center">
            <Icon name="Layers" size={20} className="text-primary mr-2" />
            Course Content
          </h2>
          <div className="flex items-center">
            <button
              className={`p-2 rounded-md mr-1 ${view === "list" ? "bg-gray-100" : "hover:bg-gray-100"}`}
              onClick={() => setView("list")}
              aria-label="List view"
            >
              <Icon name="List" size={18} className="text-gray-700" />
            </button>
            <button
              className={`p-2 rounded-md ${view === "grid" ? "bg-gray-100" : "hover:bg-gray-100"}`}
              onClick={() => setView("grid")}
              aria-label="Grid view"
            >
              <Icon name="Grid" size={18} className="text-gray-700" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        {view === "list" ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completion
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {content.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Icon 
                          name={getContentIcon(item.type)} 
                          size={18} 
                          className="text-gray-500 mr-2" 
                        />
                        <span className="body-large font-medium text-gray-900">{item.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="badge-text capitalize text-gray-700">{item.type}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.status === "published" ? "bg-success bg-opacity-10 text-success" : "bg-gray-100 text-gray-700"
                      }`}>
                        {item.status === "published" ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="body text-gray-700">{formatDate(item.lastUpdated)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="h-2 rounded-full bg-primary" 
                            style={{ width: `${item.completionRate}%` }}
                          ></div>
                        </div>
                        <span className="badge-text text-gray-700">{item.completionRate}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary hover:text-primary-dark mr-2">
                        <Icon name="Edit" size={16} />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <Icon name="MoreVertical" size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    <div className={`rounded-full p-2 mr-2 ${
                      item.type === "lesson" ? "bg-primary bg-opacity-10" :
                      item.type === "assignment"? "bg-warning bg-opacity-10" : "bg-info bg-opacity-10"
                    }`}>
                      <Icon 
                        name={getContentIcon(item.type)} 
                        size={16} 
                        className={
                          item.type === "lesson" ? "text-primary" :
                          item.type === "assignment"? "text-warning" : "text-info"
                        } 
                      />
                    </div>
                    <span className="badge-text capitalize text-gray-700">{item.type}</span>
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    item.status === "published" ? "bg-success bg-opacity-10 text-success" : "bg-gray-100 text-gray-700"
                  }`}>
                    {item.status === "published" ? "Published" : "Draft"}
                  </span>
                </div>
                
                <h3 className="subheading text-gray-900 mb-2">{item.title}</h3>
                
                <div className="flex justify-between items-center mb-3">
                  <span className="caption text-gray-500">Updated {formatDate(item.lastUpdated)}</span>
                  <span className="badge-text text-gray-700">{item.completionRate}% completed</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
                  <div 
                    className="h-1.5 rounded-full bg-primary" 
                    style={{ width: `${item.completionRate}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <button className="p-1.5 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100">
                    <Icon name="Eye" size={16} />
                  </button>
                  <button className="p-1.5 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100">
                    <Icon name="Edit" size={16} />
                  </button>
                  <button className="p-1.5 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100">
                    <Icon name="MoreVertical" size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-4 flex justify-between items-center">
          <button className="button-text text-primary hover:text-primary-dark flex items-center">
            <Icon name="Plus" size={16} className="mr-1" />
            Add New Content
          </button>
          <button className="button-text text-gray-700 hover:text-gray-900 flex items-center">
            View All Content
            <Icon name="ChevronRight" size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;