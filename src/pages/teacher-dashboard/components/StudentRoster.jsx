import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const StudentRoster = ({ students, searchQuery }) => {
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  // Handle sort click
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Sort students based on current sort field and direction
  const sortedStudents = [...students].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    // Special case for lastActivity (date string)
    if (sortField === "lastActivity") {
      aValue = new Date(a.lastActivity).getTime();
      bValue = new Date(b.lastActivity).getTime();
    }
    
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Format date for display
  const formatLastActivity = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else {
      return `${diffDays} days ago`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="heading text-gray-900 flex items-center">
            <Icon name="Users" size={20} className="text-primary mr-2" />
            Student Roster
          </h2>
          <div className="hidden md:block relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Search" size={16} className="text-gray-500" />
            </div>
            <input
              type="text"
              className="pl-10 pr-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => {}}
              readOnly
            />
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        {sortedStudents.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Search" size={32} className="mx-auto mb-2 text-gray-400" />
            <p className="body-large text-gray-700 mb-2">No students found matching "{searchQuery}"</p>
            <p className="body text-gray-500">Try adjusting your search terms</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    Student
                    {sortField === "name" && (
                      <Icon 
                        name={sortDirection === "asc" ? "ChevronUp" : "ChevronDown"} 
                        size={16} 
                        className="ml-1" 
                      />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("progress")}
                >
                  <div className="flex items-center">
                    Progress
                    {sortField === "progress" && (
                      <Icon 
                        name={sortDirection === "asc" ? "ChevronUp" : "ChevronDown"} 
                        size={16} 
                        className="ml-1" 
                      />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("lastActivity")}
                >
                  <div className="flex items-center">
                    Last Activity
                    {sortField === "lastActivity" && (
                      <Icon 
                        name={sortDirection === "asc" ? "ChevronUp" : "ChevronDown"} 
                        size={16} 
                        className="ml-1" 
                      />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("averageScore")}
                >
                  <div className="flex items-center">
                    Avg. Score
                    {sortField === "averageScore" && (
                      <Icon 
                        name={sortDirection === "asc" ? "ChevronUp" : "ChevronDown"} 
                        size={16} 
                        className="ml-1" 
                      />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center">
                    Status
                    {sortField === "status" && (
                      <Icon 
                        name={sortDirection === "asc" ? "ChevronUp" : "ChevronDown"} 
                        size={16} 
                        className="ml-1" 
                      />
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <Image
                          src={student.avatar}
                          alt={student.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="body-large font-medium text-gray-900">{student.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full max-w-xs">
                        <div className="flex justify-between items-center mb-1">
                          <span className="badge-text text-gray-700">{student.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              student.progress >= 75 ? "bg-success" :
                              student.progress >= 40 ? "bg-warning": "bg-error"
                            }`} 
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="body text-gray-700">{formatLastActivity(student.lastActivity)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="body font-medium text-gray-900">{student.averageScore}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      student.status === "on-track" ? "bg-success bg-opacity-10 text-success" :
                      student.status === "at-risk"? "bg-error bg-opacity-10 text-error" : "bg-warning bg-opacity-10 text-warning"
                    }`}>
                      {student.status === "on-track" ? "On Track" :
                       student.status === "at-risk"? "At Risk" : "Needs Attention"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary hover:text-primary-dark mr-3">
                      <Icon name="MessageSquare" size={18} />
                    </button>
                    <button className="text-primary hover:text-primary-dark">
                      <Icon name="MoreVertical" size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StudentRoster;