import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const CommunityIntroduction = ({ course }) => {
  // Mock community data
  const communityMembers = [
    {
      id: 1,
      name: "Emily Chen",
      role: "Student",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
      message: "This course helped me land my first web development job!"
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "Student",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      message: "The community support made all the difference in my learning journey."
    },
    {
      id: 3,
      name: "Sophia Rodriguez",
      role: "Teaching Assistant",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      message: "I\'m here to help you succeed in this course. Don\'t hesitate to ask questions!"
    }
  ];
  
  // Mock discussion topics
  const discussionTopics = [
    {
      id: 1,
      title: "Tips for organizing your CSS code",
      replies: 24,
      lastActive: "2 hours ago"
    },
    {
      id: 2,
      title: "How to debug JavaScript effectively",
      replies: 18,
      lastActive: "1 day ago"
    },
    {
      id: 3,
      title: "Best practices for responsive design",
      replies: 32,
      lastActive: "3 hours ago"
    }
  ];
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 bg-primary bg-opacity-5 border-b border-primary border-opacity-20">
        <h2 className="heading text-gray-900 flex items-center">
          <Icon name="Users" size={20} className="text-primary mr-2" />
          Learning Community
        </h2>
      </div>
      
      <div className="p-4 md:p-6">
        <div className="mb-6">
          <h3 className="subheading text-gray-900 mb-2">Join a Supportive Community</h3>
          <p className="body text-gray-700">
            Learning is better together! Connect with fellow students, instructors, and teaching assistants to enhance your learning experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Community Stats */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="body-large font-medium text-gray-900 mb-4">Community at a Glance</h4>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="rounded-full bg-primary bg-opacity-10 p-3">
                    <Icon name="Users" size={20} className="text-primary" />
                  </div>
                </div>
                <p className="display-small text-gray-900">{course.community.activeStudents}</p>
                <p className="caption text-gray-700">Active Students</p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="rounded-full bg-info bg-opacity-10 p-3">
                    <Icon name="MessageSquare" size={20} className="text-info" />
                  </div>
                </div>
                <p className="display-small text-gray-900">{course.community.forums}</p>
                <p className="caption text-gray-700">Discussion Forums</p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="rounded-full bg-achievement bg-opacity-10 p-3">
                    <Icon name="Users" size={20} className="text-achievement" />
                  </div>
                </div>
                <p className="display-small text-gray-900">{course.community.studyGroups}</p>
                <p className="caption text-gray-700">Study Groups</p>
              </div>
            </div>
            
            <div className="bg-white rounded-md p-3 border border-gray-200">
              <h5 className="body font-medium text-gray-900 mb-2">Community Guidelines</h5>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Icon name="Check" size={16} className="text-success mt-1 mr-2" />
                  <p className="caption text-gray-700">Be respectful and supportive of all members</p>
                </li>
                <li className="flex items-start">
                  <Icon name="Check" size={16} className="text-success mt-1 mr-2" />
                  <p className="caption text-gray-700">Share knowledge and help others when you can</p>
                </li>
                <li className="flex items-start">
                  <Icon name="Check" size={16} className="text-success mt-1 mr-2" />
                  <p className="caption text-gray-700">Give credit when using others' code or solutions</p>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Community Members */}
          <div>
            <h4 className="body-large font-medium text-gray-900 mb-3">Meet the Community</h4>
            
            <div className="space-y-3">
              {communityMembers.map(member => (
                <div key={member.id} className="flex items-start bg-gray-50 rounded-lg p-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h5 className="body font-medium text-gray-900">{member.name}</h5>
                      <span className="ml-2 px-2 py-0.5 bg-gray-200 rounded-full text-xs text-gray-700">
                        {member.role}
                      </span>
                    </div>
                    <p className="caption text-gray-700 mt-1">"{member.message}"</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <button className="button-text text-primary hover:text-primary-dark inline-flex items-center">
                View More Community Members
                <Icon name="ChevronRight" size={16} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Discussion Forums */}
        <div className="mb-6">
          <h4 className="body-large font-medium text-gray-900 mb-3">Active Discussions</h4>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <ul className="divide-y divide-gray-200">
              {discussionTopics.map(topic => (
                <li key={topic.id} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex justify-between">
                    <div>
                      <h5 className="body font-medium text-gray-900 hover:text-primary cursor-pointer">
                        {topic.title}
                      </h5>
                      <p className="caption text-gray-700">
                        <Icon name="MessageCircle" size={12} className="inline mr-1" />
                        {topic.replies} replies
                      </p>
                    </div>
                    <span className="badge-text text-gray-500">
                      {topic.lastActive}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="mt-4 text-center">
              <button className="button-text text-primary hover:text-primary-dark inline-flex items-center">
                Browse All Discussions
                <Icon name="ChevronRight" size={16} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Study Groups */}
        <div className="mb-6">
          <h4 className="body-large font-medium text-gray-900 mb-3">Study Groups</h4>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="body text-gray-700 mb-3">
              Join a study group to collaborate with peers, work through challenges together, and stay motivated.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white rounded-md p-3 border border-gray-200">
                <h5 className="body font-medium text-gray-900">Beginner Web Developers</h5>
                <p className="caption text-gray-700 mb-2">For those new to HTML, CSS, and JavaScript</p>
                <div className="flex justify-between items-center">
                  <span className="badge-text text-gray-500">
                    <Icon name="Users" size={12} className="inline mr-1" />
                    28 members
                  </span>
                  <button className="caption text-primary hover:text-primary-dark">
                    Join Group
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-md p-3 border border-gray-200">
                <h5 className="body font-medium text-gray-900">Weekly Code Review</h5>
                <p className="caption text-gray-700 mb-2">Share projects and get feedback</p>
                <div className="flex justify-between items-center">
                  <span className="badge-text text-gray-500">
                    <Icon name="Users" size={12} className="inline mr-1" />
                    15 members
                  </span>
                  <button className="caption text-primary hover:text-primary-dark">
                    Join Group
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <button className="button-text text-primary hover:text-primary-dark inline-flex items-center">
                Browse All Study Groups
                <Icon name="ChevronRight" size={16} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-engagement bg-opacity-5 rounded-lg p-4">
          <div className="flex items-start">
            <Icon name="MessageCircle" size={20} className="text-engagement mt-1 mr-3" />
            <div>
              <h4 className="body-large font-medium text-gray-900 mb-1">Get Involved!</h4>
              <p className="body text-gray-700">
                Students who actively participate in the community are more likely to complete the course successfully. Introduce yourself in the welcome thread to get started!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityIntroduction;