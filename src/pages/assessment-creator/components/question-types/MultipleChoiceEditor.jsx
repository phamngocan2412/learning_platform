import React from "react";
import Icon from "../../../../components/AppIcon";

const MultipleChoiceEditor = ({ question, updateQuestion }) => {
  const addOption = () => {
    const newOptions = [...question.options];
    newOptions.push({
      id: newOptions.length + 1,
      text: `Option ${newOptions.length + 1}`,
      isCorrect: false
    });
    
    updateQuestion({
      ...question,
      options: newOptions
    });
  };

  const updateOption = (index, field, value) => {
    const newOptions = [...question.options];
    newOptions[index] = {
      ...newOptions[index],
      [field]: value
    };
    
    updateQuestion({
      ...question,
      options: newOptions
    });
  };

  const setCorrectOption = (index) => {
    const newOptions = question.options.map((option, i) => ({
      ...option,
      isCorrect: i === index
    }));
    
    updateQuestion({
      ...question,
      options: newOptions
    });
  };

  const removeOption = (index) => {
    if (question.options.length <= 2) {
      return; // Keep at least 2 options
    }
    
    const newOptions = question.options.filter((_, i) => i !== index);
    
    // If we removed the correct option, set the first option as correct
    if (question.options[index].isCorrect && newOptions.length > 0) {
      newOptions[0].isCorrect = true;
    }
    
    updateQuestion({
      ...question,
      options: newOptions
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="body-large font-medium text-gray-900">Multiple Choice Options</h3>
        <p className="caption text-gray-500">Select one correct answer</p>
      </div>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <div key={option.id} className="flex items-center space-x-3">
            <div 
              className={`h-6 w-6 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                option.isCorrect ? 'border-success' : 'border-gray-300 hover:border-gray-400'
              }`}
              onClick={() => setCorrectOption(index)}
            >
              {option.isCorrect && (
                <div className="h-3 w-3 rounded-full bg-success"></div>
              )}
            </div>
            
            <div className="flex-1">
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                value={option.text}
                onChange={(e) => updateOption(index, 'text', e.target.value)}
                placeholder={`Option ${index + 1}`}
              />
            </div>
            
            <button 
              className="p-2 text-gray-400 hover:text-error rounded-md"
              onClick={() => removeOption(index)}
              disabled={question.options.length <= 2}
              title="Remove option"
            >
              <Icon name="Trash2" size={16} />
            </button>
          </div>
        ))}
      </div>
      
      <button 
        className="flex items-center body text-primary hover:text-primary-dark"
        onClick={addOption}
      >
        <Icon name="Plus" size={16} className="mr-1" />
        Add Option
      </button>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center mb-3">
          <Icon name="Settings" size={16} className="text-gray-500 mr-2" />
          <h3 className="body font-medium text-gray-900">Additional Settings</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="shuffleOptions"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="shuffleOptions" className="ml-2 block body text-gray-700">
              Shuffle option order
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="multipleCorrect"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="multipleCorrect" className="ml-2 block body text-gray-700">
              Allow multiple correct answers
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultipleChoiceEditor;