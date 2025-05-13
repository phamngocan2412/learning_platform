import React from "react";
import Icon from "../../../../components/AppIcon";

const ShortAnswerEditor = ({ question, updateQuestion }) => {
  const handleCorrectAnswerChange = (e) => {
    updateQuestion({
      ...question,
      correctAnswer: e.target.value
    });
  };

  const handleCaseSensitiveChange = (e) => {
    updateQuestion({
      ...question,
      caseSensitive: e.target.checked
    });
  };

  const addAlternativeAnswer = () => {
    const alternativeAnswers = question.alternativeAnswers || [];
    updateQuestion({
      ...question,
      alternativeAnswers: [...alternativeAnswers, ""]
    });
  };

  const updateAlternativeAnswer = (index, value) => {
    const alternativeAnswers = [...(question.alternativeAnswers || [])];
    alternativeAnswers[index] = value;
    updateQuestion({
      ...question,
      alternativeAnswers
    });
  };

  const removeAlternativeAnswer = (index) => {
    const alternativeAnswers = [...(question.alternativeAnswers || [])];
    alternativeAnswers.splice(index, 1);
    updateQuestion({
      ...question,
      alternativeAnswers
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="body-large font-medium text-gray-900">Short Answer Configuration</h3>
        <p className="caption text-gray-500">Student types a brief text response</p>
      </div>
      
      <div>
        <label htmlFor="correctAnswer" className="block body text-gray-700 mb-1">Correct Answer</label>
        <input
          id="correctAnswer"
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          value={question.correctAnswer || ""}
          onChange={handleCorrectAnswerChange}
          placeholder="Enter the correct answer"
        />
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          id="caseSensitive"
          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          checked={question.caseSensitive || false}
          onChange={handleCaseSensitiveChange}
        />
        <label htmlFor="caseSensitive" className="ml-2 block body text-gray-700">
          Case sensitive
        </label>
      </div>
      
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block body text-gray-700">Alternative Acceptable Answers</label>
          <button 
            className="caption text-primary hover:text-primary-dark flex items-center"
            onClick={addAlternativeAnswer}
          >
            <Icon name="Plus" size={14} className="mr-1" />
            Add
          </button>
        </div>
        
        {question.alternativeAnswers && question.alternativeAnswers.length > 0 ? (
          <div className="space-y-2">
            {question.alternativeAnswers.map((answer, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  value={answer}
                  onChange={(e) => updateAlternativeAnswer(index, e.target.value)}
                  placeholder={`Alternative answer ${index + 1}`}
                />
                <button 
                  className="p-2 text-gray-400 hover:text-error rounded-md"
                  onClick={() => removeAlternativeAnswer(index)}
                  title="Remove alternative"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="body text-gray-500 italic">No alternative answers added</p>
        )}
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center mb-3">
          <Icon name="Settings" size={16} className="text-gray-500 mr-2" />
          <h3 className="body font-medium text-gray-900">Response Settings</h3>
        </div>
        
        <div className="space-y-3">
          <div>
            <label htmlFor="maxLength" className="block body text-gray-700 mb-1">Maximum Length (characters)</label>
            <input
              id="maxLength"
              type="number"
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              defaultValue="200"
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="partialMatching"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="partialMatching" className="ml-2 block body text-gray-700">
              Allow partial matching
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="allowKeywords"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="allowKeywords" className="ml-2 block body text-gray-700">
              Grade based on keywords
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortAnswerEditor;