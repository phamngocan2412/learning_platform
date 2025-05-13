import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import CommentForm from "./CommentForm";

const ThreadDetail = ({ thread, comments, userData }) => {
  const [showReplyForm, setShowReplyForm] = useState(null);
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric',
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(date);
  };

  // Organize comments into a tree structure
  const commentTree = comments.reduce((acc, comment) => {
    if (!comment.parentId) {
      acc.push({
        ...comment,
        replies: []
      });
    } else {
      const parent = acc.find(c => c.id === comment.parentId);
      if (parent) {
        parent.replies.push(comment);
      }
    }
    return acc;
  }, []);

  // Render code blocks with syntax highlighting
  const renderContent = (content) => {
    // Simple regex to identify code blocks
    const parts = content.split(/(`{3}[\s\S]*?`{3})/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        // Extract code and language
        const code = part.slice(3, -3).trim();
        return (
          <pre key={index} className="bg-gray-100 p-3 rounded-md overflow-x-auto my-3 font-mono text-sm">
            <code>{code}</code>
          </pre>
        );
      }
      return <p key={index} className="mb-3">{part}</p>;
    });
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Thread header */}
      <div className="p-4 md:p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <Link 
            to="/discussion-forum" 
            className="button-text text-gray-700 hover:text-gray-900 flex items-center"
          >
            <Icon name="ArrowLeft" size={16} className="mr-1" />
            Back to Discussions
          </Link>
          
          <div className="flex items-center space-x-2">
            {thread.isResolved ? (
              <span className="px-3 py-1 bg-success text-white rounded-full caption flex items-center">
                <Icon name="CheckCircle" size={14} className="mr-1" />
                Resolved
              </span>
            ) : (
              <span className="px-3 py-1 bg-warning text-white rounded-full caption flex items-center">
                <Icon name="HelpCircle" size={14} className="mr-1" />
                Open Question
              </span>
            )}
          </div>
        </div>
        
        <h1 className="heading text-gray-900 mb-3">{thread.title}</h1>
        
        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
            <Image
              src={thread.author.avatar}
              alt={thread.author.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="body-large font-medium text-gray-900">{thread.author.name}</p>
            <p className="caption text-gray-500">
              Posted on {formatDate(thread.createdAt)} • {thread.course}
            </p>
          </div>
        </div>
        
        <div className="prose prose-sm max-w-none text-gray-700 mb-4">
          {renderContent(thread.content)}
        </div>
        
        <div className="flex flex-wrap items-center mt-4">
          {thread.tags.map((tag, index) => (
            <span 
              key={index}
              className="mr-2 mb-2 px-2 py-1 bg-gray-100 text-gray-700 rounded-full caption"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-gray-500 hover:text-primary transition-colors">
              <Icon name="ThumbsUp" size={18} className="mr-1" />
              <span className="body">{thread.likes}</span>
            </button>
            <button className="flex items-center text-gray-500 hover:text-primary transition-colors">
              <Icon name="Bookmark" size={18} className="mr-1" />
              <span className="body">Save</span>
            </button>
            <button className="flex items-center text-gray-500 hover:text-primary transition-colors">
              <Icon name="Share2" size={18} className="mr-1" />
              <span className="body">Share</span>
            </button>
          </div>
          
          <div className="flex items-center text-gray-500">
            <Icon name="Eye" size={16} className="mr-1" />
            <span className="body">{thread.views} views</span>
          </div>
        </div>
      </div>
      
      {/* Comments section */}
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="subheading text-gray-900">
            {comments.length} {comments.length === 1 ? 'Response' : 'Responses'}
          </h2>
          
          <div className="flex items-center">
            <button className="button-text text-primary hover:text-primary-dark flex items-center">
              <Icon name="ArrowDown" size={16} className="mr-1" />
              Newest First
            </button>
          </div>
        </div>
        
        {/* Comment list */}
        {commentTree.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="MessageCircle" size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="body-large text-gray-700 mb-2">No responses yet</p>
            <p className="body text-gray-500">Be the first to respond to this discussion</p>
          </div>
        ) : (
          <ul className="space-y-6">
            {commentTree.map((comment) => (
              <li key={comment.id} className="border-b border-gray-100 pb-6">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
                    <Image
                      src={comment.author.avatar}
                      alt={comment.author.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-1">
                      <p className="body-large font-medium text-gray-900 mr-2">
                        {comment.author.name}
                      </p>
                      {comment.isInstructorResponse && (
                        <span className="px-2 py-0.5 bg-achievement bg-opacity-10 text-achievement rounded-full caption">
                          Instructor
                        </span>
                      )}
                      <span className="caption text-gray-500 ml-2">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    
                    <div className="prose prose-sm max-w-none text-gray-700 mb-3">
                      {renderContent(comment.content)}
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-gray-500 hover:text-primary transition-colors">
                        <Icon name="ThumbsUp" size={16} className="mr-1" />
                        <span className="caption">{comment.likes}</span>
                      </button>
                      <button 
                        onClick={() => setShowReplyForm(comment.id === showReplyForm ? null : comment.id)}
                        className="flex items-center text-gray-500 hover:text-primary transition-colors"
                      >
                        <Icon name="Reply" size={16} className="mr-1" />
                        <span className="caption">Reply</span>
                      </button>
                    </div>
                    
                    {/* Reply form */}
                    {showReplyForm === comment.id && (
                      <div className="mt-3">
                        <CommentForm 
                          userData={userData} 
                          onCancel={() => setShowReplyForm(null)}
                          placeholder={`Reply to ${comment.author.name}...`}
                        />
                      </div>
                    )}
                    
                    {/* Nested replies */}
                    {comment.replies.length > 0 && (
                      <ul className="mt-4 space-y-4 pl-6 border-l-2 border-gray-100">
                        {comment.replies.map((reply) => (
                          <li key={reply.id} className="pt-4">
                            <div className="flex items-start">
                              <div className="h-8 w-8 rounded-full overflow-hidden mr-3 flex-shrink-0">
                                <Image
                                  src={reply.author.avatar}
                                  alt={reply.author.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center mb-1">
                                  <p className="body font-medium text-gray-900 mr-2">
                                    {reply.author.name}
                                  </p>
                                  <span className="caption text-gray-500">
                                    {formatDate(reply.createdAt)}
                                  </span>
                                </div>
                                
                                <div className="prose prose-sm max-w-none text-gray-700 mb-2">
                                  {renderContent(reply.content)}
                                </div>
                                
                                <div className="flex items-center space-x-4">
                                  <button className="flex items-center text-gray-500 hover:text-primary transition-colors">
                                    <Icon name="ThumbsUp" size={14} className="mr-1" />
                                    <span className="caption">{reply.likes}</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        
        {/* Add comment form */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="subheading text-gray-900 mb-4">Add Your Response</h3>
          <CommentForm userData={userData} placeholder="Write your response..." />
        </div>
      </div>
    </div>
  );
};

export default ThreadDetail;