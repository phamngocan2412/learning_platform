import React from "react";
import Icon from "../../../components/AppIcon";

const PerformanceMetrics = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg shadow p-4 flex items-center">
        <div className="rounded-full bg-primary bg-opacity-10 p-3 mr-4">
          <Icon name="BarChart2" size={24} className="text-primary" />
        </div>
        <div>
          <p className="body text-gray-700">Course Engagement</p>
          <p className="display-small text-gray-900">{metrics.courseEngagement}%</p>
          <p className="caption text-gray-500">
            {metrics.activeStudents}/{metrics.totalStudents} active students
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4 flex items-center">
        <div className="rounded-full bg-success bg-opacity-10 p-3 mr-4">
          <Icon name="CheckCircle" size={24} className="text-success" />
        </div>
        <div>
          <p className="body text-gray-700">Completion Rate</p>
          <p className="display-small text-gray-900">{metrics.completionRate}%</p>
          <p className="caption text-gray-500">
            Course materials completion
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4 flex items-center">
        <div className="rounded-full bg-achievement bg-opacity-10 p-3 mr-4">
          <Icon name="Award" size={24} className="text-achievement" />
        </div>
        <div>
          <p className="body text-gray-700">Average Score</p>
          <p className="display-small text-gray-900">{metrics.averageScore}%</p>
          <p className="caption text-gray-500">
            Across all assessments
          </p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;