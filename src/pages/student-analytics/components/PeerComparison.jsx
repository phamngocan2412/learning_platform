import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Icon from "../../../components/AppIcon";

const PeerComparison = ({ data }) => {
  // Prepare data for the chart
  const chartData = [
    { 
      name: "Course Progress", 
      You: data.courseProgress.user, 
      "Class Average": data.courseProgress.classMean, 
      "Top 25%": data.courseProgress.top25Percent 
    },
    { 
      name: "Assignment Completion", 
      You: data.assignmentCompletion.user, 
      "Class Average": data.assignmentCompletion.classMean, 
      "Top 25%": data.assignmentCompletion.top25Percent 
    },
    { 
      name: "Quiz Scores", 
      You: data.quizScores.user, 
      "Class Average": data.quizScores.classMean, 
      "Top 25%": data.quizScores.top25Percent 
    },
    { 
      name: "Participation", 
      You: data.participationRate.user, 
      "Class Average": data.participationRate.classMean, 
      "Top 25%": data.participationRate.top25Percent 
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
      <div className="p-4 border-b border-gray-200">
        <h2 className="heading text-gray-900 flex items-center">
          <Icon name="Users" size={20} className="text-primary mr-2" />
          Peer Comparison
        </h2>
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="flex-1">
            <p className="body-large text-gray-700">
              See how your performance compares to your peers (anonymized data)
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-primary rounded-full mr-1"></div>
              <span className="badge-text text-gray-700">You</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-400 rounded-full mr-1"></div>
              <span className="badge-text text-gray-700">Class Average</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-achievement rounded-full mr-1"></div>
              <span className="badge-text text-gray-700">Top 25%</span>
            </div>
          </div>
        </div>
        
        {/* Comparison Chart */}
        <div className="h-80 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip 
                formatter={(value) => [`${value}%`, '']}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
              <Bar dataKey="You" fill="#4F46E5" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Class Average" fill="#9CA3AF" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Top 25%" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Growth Mindset Message */}
        <div className="mt-6 bg-info bg-opacity-5 rounded-lg p-4 border border-info border-opacity-20">
          <div className="flex items-start">
            <div className="rounded-full bg-info bg-opacity-10 p-2 mr-3 flex-shrink-0">
              <Icon name="Info" size={18} className="text-info" />
            </div>
            <div>
              <p className="body-large font-medium text-gray-900 mb-1">About Peer Comparisons</p>
              <p className="body text-gray-700">
                These comparisons are meant to provide context for your learning journey, not to create competition. 
                Everyone learns differently and at their own pace. Focus on your personal growth and use these 
                benchmarks as one of many tools to help guide your learning strategy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeerComparison;