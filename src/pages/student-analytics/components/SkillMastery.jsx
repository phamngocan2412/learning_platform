import React from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import Icon from "../../../components/AppIcon";

const SkillMastery = ({ data }) => {
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  // Prepare data for radar chart
  const radarData = data.domains.map(domain => ({
    subject: domain.name,
    score: domain.score,
    fullMark: 100
  }));

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
      <div className="p-4 border-b border-gray-200">
        <h2 className="heading text-gray-900 flex items-center">
          <Icon name="Target" size={20} className="text-primary mr-2" />
          Skill Mastery
        </h2>
      </div>
      
      <div className="p-4">
        <p className="body-large text-gray-700 mb-4">
          Visualize your strengths and areas for growth across different skill domains
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Radar Chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6B7280', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Skills"
                  dataKey="score"
                  stroke="#4F46E5"
                  fill="#4F46E5"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Skill Details */}
          <div>
            <div className="grid grid-cols-1 gap-3">
              {data.domains.map((domain, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <p className="body font-medium text-gray-900">{domain.name}</p>
                    <div className="flex items-center">
                      <span className="badge-text text-gray-700 mr-2">{domain.score}/100</span>
                      <span className="badge-text text-success flex items-center">
                        <Icon name="TrendingUp" size={12} className="mr-0.5" />
                        +{domain.growth}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        domain.score >= 80 ? 'bg-success' :
                        domain.score >= 60 ? 'bg-primary': 'bg-warning'
                      }`} 
                      style={{ width: `${domain.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Growth Mindset Message */}
            <div className="mt-4 bg-achievement bg-opacity-5 rounded-lg p-3 border border-achievement border-opacity-20">
              <div className="flex items-start">
                <div className="rounded-full bg-achievement bg-opacity-10 p-1.5 mr-2">
                  <Icon name="TrendingUp" size={14} className="text-achievement" />
                </div>
                <p className="body text-gray-700">
                  Your skills are continuously developing. Focus on your growth trajectory rather than fixed abilities.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Achievements */}
        <div className="mt-6">
          <h3 className="subheading text-gray-900 mb-3">Recent Achievements</h3>
          <div className="space-y-3">
            {data.recentAchievements.map(achievement => (
              <div key={achievement.id} className="bg-gray-50 rounded-lg p-4 flex items-start">
                <div className="rounded-full bg-achievement bg-opacity-10 p-2 mr-3">
                  <Icon name="Award" size={18} className="text-achievement" />
                </div>
                <div>
                  <div className="flex items-center">
                    <p className="body-large font-medium text-gray-900 mr-2">{achievement.title}</p>
                    <span className="badge-text text-gray-500">{formatDate(achievement.date)}</span>
                  </div>
                  <p className="body text-gray-700 mt-1">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillMastery;