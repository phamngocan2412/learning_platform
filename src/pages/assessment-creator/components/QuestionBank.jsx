import React from "react";
import Icon from "../../../components/AppIcon";

const QuestionBank = ({ 
  questionTemplates, 
  addQuestion, 
  questions, 
  activeQuestion, 
  setActiveQuestion,
  reorderQuestions
}) => {
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('questionIndex', index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    const sourceIndex = parseInt(e.dataTransfer.getData('questionIndex'));
    if (sourceIndex !== index) {
      reorderQuestions(sourceIndex, index);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden h-full flex flex-col">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h2 className="subheading text-gray-900 flex items-center">
          <Icon name="Layers" size={18} className="text-primary mr-2" />
          Question Bank
        </h2>
      </div>
      
      <div className="p-4 border-b border-gray-200">
        <h3 className="body-large font-medium text-gray-900 mb-3">Question Types</h3>
        <div className="grid grid-cols-1 gap-2">
          {questionTemplates.map((template) => (
            <button
              key={template.id}
              className="flex items-start p-3 rounded-md hover:bg-gray-50 text-left transition-colors"
              onClick={() => addQuestion(template.type)}
            >
              <div className="rounded-full bg-primary bg-opacity-10 p-2 mr-3">
                <Icon name={template.icon} size={16} className="text-primary" />
              </div>
              <div>
                <p className="body font-medium text-gray-900">{template.title}</p>
                <p className="caption text-gray-500">{template.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="flex justify-between items-center mb-3">
          <h3 className="body-large font-medium text-gray-900">Questions ({questions.length})</h3>
          <button 
            className="caption text-primary hover:text-primary-dark flex items-center"
            onClick={() => addQuestion('multiple-choice')}
          >
            <Icon name="Plus" size={14} className="mr-1" />
            Add
          </button>
        </div>
        
        <div className="space-y-2">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className={`p-3 rounded-md cursor-pointer ${
                index === activeQuestion ? 'bg-primary bg-opacity-10 border border-primary border-opacity-30' : 'bg-gray-50 hover:bg-gray-100'
              }`}
              onClick={() => setActiveQuestion(index)}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start">
                  <div className="rounded-full bg-gray-200 w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                    <span className="caption font-medium text-gray-700">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="body font-medium text-gray-900 truncate">{question.title}</p>
                    <p className="caption text-gray-500">
                      {question.type.charAt(0).toUpperCase() + question.type.slice(1)} • {question.points} pts
                    </p>
                  </div>
                </div>
                <Icon name="GripVertical" size={16} className="text-gray-400 cursor-move" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <button className="w-full py-2 px-4 rounded-md button-text bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center justify-center">
          <Icon name="Upload" size={16} className="mr-2" />
          Import Questions
        </button>
      </div>
    </div>
  );
};

export default QuestionBank;