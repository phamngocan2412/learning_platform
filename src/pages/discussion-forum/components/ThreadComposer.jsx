import React, { useState } from "react";
import Icon from "../../../components/AppIcon";


const ThreadComposer = ({ userData, categories, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  // Mock courses data
  const courses = [
    { id: 1, title: "Introduction to Web Development" },
    { id: 2, title: "Data Science Fundamentals" },
    { id: 3, title: "UX/UI Design Principles" },
    { id: 4, title: "Advanced JavaScript Concepts" },
    { id: 5, title: "Digital Marketing Essentials" },
    { id: 6, title: "Machine Learning for Beginners" },
    { id: 7, title: "General" }
  ];

  // Add tag
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 5) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  // Remove tag
  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Handle tag input key press
  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

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
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="heading text-gray-900">Create New Discussion</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <Icon name="X" size={20} />
            <span className="sr-only">Close</span>
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <label htmlFor="thread-title" className="block body font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              id="thread-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's your question or discussion topic?"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="thread-category" className="block body font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="thread-category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="thread-course" className="block body font-medium text-gray-700 mb-2">
                Related Course
              </label>
              <select
                id="thread-course"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="thread-content" className="block body font-medium text-gray-700">
                Content
              </label>
              <div className="flex">
                <button
                  onClick={() => setIsPreview(false)}
                  className={`px-3 py-1 button-text rounded-l-md ${
                    !isPreview 
                      ? "bg-primary text-white" :"bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Write
                </button>
                <button
                  onClick={() => setIsPreview(true)}
                  className={`px-3 py-1 button-text rounded-r-md ${
                    isPreview 
                      ? "bg-primary text-white" :"bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Preview
                </button>
              </div>
            </div>
            
            {isPreview ? (
              <div className="min-h-[250px] p-4 border border-gray-300 rounded-md bg-gray-50 overflow-y-auto">
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
                id="thread-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Describe your question or topic in detail..."
                rows={10}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none resize-none"
              ></textarea>
            )}
            
            {/* Formatting toolbar */}
            <div className="flex flex-wrap items-center mt-2 bg-white border border-gray-200 rounded-md p-1">
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
            </div>
            <p className="caption text-gray-500 mt-2">
              You can use markdown syntax for formatting. Surround code with triple backticks (```) for code blocks.
            </p>
          </div>
          
          <div className="mb-6">
            <label htmlFor="thread-tags" className="block body font-medium text-gray-700 mb-2">
              Tags (up to 5)
            </label>
            <div className="flex flex-wrap items-center mb-2">
              {tags.map((tag, index) => (
                <span 
                  key={index}
                  className="mr-2 mb-2 px-2 py-1 bg-gray-100 text-gray-700 rounded-full caption flex items-center"
                >
                  {tag}
                  <button 
                    onClick={() => removeTag(tag)}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    <Icon name="X" size={12} />
                    <span className="sr-only">Remove tag</span>
                  </button>
                </span>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                id="thread-tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyPress}
                placeholder="Add tags (press Enter or comma to add)"
                className="flex-1 p-3 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-primary focus:outline-none"
                disabled={tags.length >= 5}
              />
              <button
                onClick={addTag}
                disabled={!tagInput.trim() || tags.length >= 5}
                className={`px-4 py-2 rounded-r-md button-text text-white ${
                  tagInput.trim() && tags.length < 5
                    ? "bg-primary hover:bg-primary-dark" :"bg-gray-300 cursor-not-allowed"
                }`}
              >
                Add
              </button>
            </div>
            <p className="caption text-gray-500 mt-1">
              Tags help others find your discussion more easily
            </p>
          </div>
          
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md button-text text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={!title.trim() || !content.trim() || !selectedCategory || !selectedCourse}
              className={`px-4 py-2 rounded-md button-text text-white ${
                title.trim() && content.trim() && selectedCategory && selectedCourse
                  ? "bg-primary hover:bg-primary-dark" :"bg-gray-300 cursor-not-allowed"
              } transition-colors`}
            >
              <Icon name="Send" size={16} className="inline mr-1" />
              Post Discussion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadComposer;