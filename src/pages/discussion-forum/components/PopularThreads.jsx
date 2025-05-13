import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const PopularThreads = ({ threads }) => {
  // Get top 5 threads by views
  const popularThreads = [...threads]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="subheading text-gray-900 flex items-center">
          <Icon name="TrendingUp" size={18} className="text-primary mr-2" />
          Popular Threads
        </h3>
      </div>
      
      <div className="p-2">
        <ul className="divide-y divide-gray-100">
          {popularThreads.map((thread) => (
            <li key={thread.id} className="py-2">
              <Link 
                to={`/discussion-forum?id=${thread.id}`}
                className="block px-3 py-2 hover:bg-gray-50 rounded-md transition-colors"
              >
                <p className="body font-medium text-gray-900 line-clamp-1">{thread.title}</p>
                <div className="flex items-center mt-1 text-gray-500 caption">
                  <Icon name="Eye" size={14} className="mr-1" />
                  <span className="mr-3">{thread.views}</span>
                  <Icon name="MessageSquare" size={14} className="mr-1" />
                  <span>{thread.replies}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PopularThreads;