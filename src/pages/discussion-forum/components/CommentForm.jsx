import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const CommentForm = ({ userData, onCancel, placeholder = "Write your comment..." }) => {
  const [content, setContent] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  // Format content for preview
  const formatPreview = (text) => {
    // Simple formatting for preview
    const parts = text.split(/(`{3}[\s\S]*?`{3})/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        // Extract code
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
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-start mb-4">
        <div className="h-10 w-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
          <Image
            src={userData.avatar}
            alt={userData.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="body font-medium text-gray-900">{userData.name}</p>
          <p className="caption text-gray-500">{userData.role}</p>
        </div>
      </div>
      
      <div className="mb-3">
        {/* Tabs for Write/Preview */}
        <div className="flex border-b border-gray-200 mb-3">
          <button
            onClick={() => setIsPreview(false)}
            className={`px-4 py-2 button-text ${
              !isPreview 
                ? "text-primary border-b-2 border-primary" :"text-gray-500 hover:text-gray-700"
            }`}
          >
            <Icon name="Edit2" size={16} className="inline mr-1" />
            Write
          </button>
          <button
            onClick={() => setIsPreview(true)}
            className={`px-4 py-2 button-text ${
              isPreview 
                ? "text-primary border-b-2 border-primary" :"text-gray-500 hover:text-gray-700"
            }`}
          >
            <Icon name="Eye" size={16} className="inline mr-1" />
            Preview
          </button>
        </div>
        
        {/* Write/Preview content */}
        {isPreview ? (
          <div className="min-h-[150px] p-3 border border-gray-300 rounded-md bg-white">
            {content ? (
              <div className="prose prose-sm max-w-none text-gray-700">
                {formatPreview(content)}
              </div>
            ) : (
              <p className="text-gray-400 italic">Nothing to preview</p>
            )}
          </div>
        ) : (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
            rows={6}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none resize-none"
          ></textarea>
        )}
      </div>
      
      {/* Formatting toolbar */}
      <div className="flex flex-wrap items-center mb-4 bg-white border border-gray-200 rounded-md p-1">
        <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded">
          <Icon name="Bold" size={16} />
          <span className="sr-only">Bold</span>
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded">
          <Icon name="Italic" size={16} />
          <span className="sr-only">Italic</span>
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded">
          <Icon name="List" size={16} />
          <span className="sr-only">Bullet List</span>
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded">
          <Icon name="ListOrdered" size={16} />
          <span className="sr-only">Numbered List</span>
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded">
          <Icon name="Code" size={16} />
          <span className="sr-only">Code</span>
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded">
          <Icon name="Link" size={16} />
          <span className="sr-only">Link</span>
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded">
          <Icon name="Image" size={16} />
          <span className="sr-only">Image</span>
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded">
          <Icon name="AtSign" size={16} />
          <span className="sr-only">Mention</span>
        </button>
      </div>
      
      <div className="flex justify-end space-x-3">
        {onCancel && (
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md button-text text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          disabled={!content.trim()}
          className={`px-4 py-2 rounded-md button-text text-white ${
            content.trim() 
              ? "bg-primary hover:bg-primary-dark" :"bg-gray-300 cursor-not-allowed"
          } transition-colors`}
        >
          Post Response
        </button>
      </div>
    </div>
  );
};

export default CommentForm;