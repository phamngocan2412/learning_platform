import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const PerformanceCharts = () => {
  const [chartType, setChartType] = useState("modules");

  // Mock data for module performance chart
  const modulePerformanceData = [
    { name: "HTML Basics", avgScore: 88, completionRate: 95 },
    { name: "CSS Fundamentals", avgScore: 82, completionRate: 90 },
    { name: "JavaScript Intro", avgScore: 75, completionRate: 85 },
    { name: "Responsive Design", avgScore: 79, completionRate: 78 },
    { name: "Web APIs", avgScore: 68, completionRate: 65 }
  ];

  // Mock data for concept mastery chart
  const conceptMasteryData = [
    { name: "HTML Structure", avgScore: 92, attempts: 48 },
    { name: "CSS Selectors", avgScore: 85, attempts: 46 },
    { name: "CSS Layout", avgScore: 78, attempts: 45 },
    { name: "JS Variables", avgScore: 82, attempts: 47 },
    { name: "JS Functions", avgScore: 76, attempts: 44 },
    { name: "DOM Manipulation", avgScore: 70, attempts: 42 },
    { name: "Responsive Media", avgScore: 75, attempts: 40 }
  ];

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="heading text-gray-900 flex items-center">
            <Icon name="PieChart" size={20} className="text-primary mr-2" />
            Performance Analytics
          </h2>
          <div className="flex">
            <button
              className={`px-3 py-1 rounded-md text-sm font-medium mr-2 ${
                chartType === "modules" ?"bg-primary text-white" :"bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setChartType("modules")}
            >
              By Module
            </button>
            <button
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                chartType === "concepts" ?"bg-primary text-white" :"bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setChartType("concepts")}
            >
              By Concept
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "modules" ? (
              <BarChart
                data={modulePerformanceData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgScore" name="Average Score (%)" fill="#4F46E5" />
                <Bar dataKey="completionRate" name="Completion Rate (%)" fill="#10B981" />
              </BarChart>
            ) : (
              <BarChart
                data={conceptMasteryData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgScore" name="Average Score (%)" fill="#8B5CF6" />
                <Bar dataKey="attempts" name="Number of Attempts" fill="#3B82F6" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-3 flex items-center">
            <div className="rounded-full bg-primary bg-opacity-10 p-2 mr-3">
              <Icon name="TrendingUp" size={16} className="text-primary" />
            </div>
            <div>
              <p className="caption text-gray-700">Highest Performance</p>
              <p className="body-large font-medium text-gray-900">HTML Basics (88%)</p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3 flex items-center">
            <div className="rounded-full bg-warning bg-opacity-10 p-2 mr-3">
              <Icon name="TrendingDown" size={16} className="text-warning" />
            </div>
            <div>
              <p className="caption text-gray-700">Needs Improvement</p>
              <p className="body-large font-medium text-gray-900">Web APIs (68%)</p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3 flex items-center">
            <div className="rounded-full bg-info bg-opacity-10 p-2 mr-3">
              <Icon name="Users" size={16} className="text-info" />
            </div>
            <div>
              <p className="caption text-gray-700">Class Average</p>
              <p className="body-large font-medium text-gray-900">78.4%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceCharts;