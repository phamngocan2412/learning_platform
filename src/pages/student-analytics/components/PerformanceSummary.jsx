import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Icon from "../../../components/AppIcon";

const PerformanceSummary = ({ data, timeframe }) => {
  // Format assessment date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  // Prepare data for the chart
  const chartData = [
    { name: "Assignments", completion: data.completionRate.assignments },
    { name: "Quizzes", completion: data.completionRate.quizzes },
    { name: "Readings", completion: data.completionRate.readings }
  ];

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
      <div className="p-4 bg-primary bg-opacity-5 border-b border-primary border-opacity-20">
        <h2 className="heading text-gray-900 flex items-center">
          <Icon name="BarChart2" size={20} className="text-primary mr-2" />
          Performance Summary
        </h2>
      </div>
      
      <div className="p-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="body text-gray-700">Overall Progress</p>
              <div className="rounded-full bg-primary bg-opacity-10 p-1">
                <Icon name="TrendingUp" size={16} className="text-primary" />
              </div>
            </div>
            <p className="display-small text-gray-900">{data.overallProgress}%</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="h-2 rounded-full bg-primary" 
                style={{ width: `${data.overallProgress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="body text-gray-700">Average Score</p>
              <div className="rounded-full bg-achievement bg-opacity-10 p-1">
                <Icon name="Award" size={16} className="text-achievement" />
              </div>
            </div>
            <p className="display-small text-gray-900">{data.averageScore}/100</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="h-2 rounded-full bg-achievement" 
                style={{ width: `${data.averageScore}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="body text-gray-700">Activity Consistency</p>
              <div className="rounded-full bg-engagement bg-opacity-10 p-1">
                <Icon name="Activity" size={16} className="text-engagement" />
              </div>
            </div>
            <p className="display-small text-gray-900">{data.activityConsistency}%</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="h-2 rounded-full bg-engagement" 
                style={{ width: `${data.activityConsistency}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Study Time Stats */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="subheading text-gray-900">Study Time</p>
            <div className="flex items-center">
              <span className={`badge-text ${data.studyTime.change > 0 ? 'text-success' : 'text-error'} flex items-center`}>
                <Icon 
                  name={data.studyTime.change > 0 ? "TrendingUp" : "TrendingDown"} 
                  size={14} 
                  className="mr-1" 
                />
                {Math.abs(data.studyTime.change)}% from last {timeframe}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="body text-gray-700">This {timeframe}</p>
              <p className="display-small text-gray-900">{data.studyTime.thisWeek} hrs</p>
            </div>
            <div>
              <p className="body text-gray-700">Last {timeframe}</p>
              <p className="display-small text-gray-700">{data.studyTime.lastWeek} hrs</p>
            </div>
          </div>
        </div>
        
        {/* Completion Rate Chart */}
        <div className="mb-6">
          <p className="subheading text-gray-900 mb-4">Completion Rate by Content Type</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Completion Rate']}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}
                />
                <Bar dataKey="completion" fill="#4F46E5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Recent Assessments */}
        <div>
          <p className="subheading text-gray-900 mb-3">Recent Assessments</p>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assessment
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.recentAssessments.map((assessment) => (
                  <tr key={assessment.id}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="body text-gray-900">{assessment.title}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="body text-gray-500">{formatDate(assessment.date)}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        assessment.score >= 90 ? 'bg-success bg-opacity-10 text-success' :
                        assessment.score >= 75 ? 'bg-primary bg-opacity-10 text-primary': 'bg-warning bg-opacity-10 text-warning'
                      }`}>
                        {assessment.score}/100
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceSummary;