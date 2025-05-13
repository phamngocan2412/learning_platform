import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const InteractiveElements = ({ interaction, onComplete, onAddNote }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [reflectionText, setReflectionText] = useState("");
  
  // Handle quiz submission
  const handleQuizSubmit = () => {
    if (selectedAnswer) {
      const correct = selectedAnswer === interaction.content.correctAnswer;
      setIsCorrect(correct);
      
      if (correct) {
        setTimeout(() => {
          onComplete();
        }, 2000);
      }
    }
  };
  
  // Handle note submission
  const handleNoteSubmit = () => {
    if (noteText.trim()) {
      onAddNote(noteText);
      onComplete();
    }
  };
  
  // Handle reflection submission
  const handleReflectionSubmit = () => {
    if (reflectionText.trim()) {
      onAddNote(reflectionText);
      onComplete();
    }
  };
  
  // Render different interaction types
  const renderInteractionContent = () => {
    switch (interaction.type) {
      case 'quiz':
        return (
          <div>
            <p className="body-large text-gray-900 mb-4">{interaction.content.question}</p>
            
            <div className="space-y-2 mb-6">
              {interaction.content.options.map((option) => (
                <button
                  key={option.id}
                  className={`w-full text-left p-3 rounded-md border transition-colors ${
                    selectedAnswer === option.id
                      ? 'border-primary bg-primary bg-opacity-10' :'border-gray-300 hover:border-primary'
                  }`}
                  onClick={() => {
                    if (isCorrect === null) {
                      setSelectedAnswer(option.id);
                    }
                  }}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                      selectedAnswer === option.id ? 'border-primary' : 'border-gray-400'
                    }`}>
                      {selectedAnswer === option.id && (
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                      )}
                    </div>
                    <span className="body text-gray-700">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
            
            {isCorrect !== null && (
              <div className={`p-3 rounded-md mb-4 ${
                isCorrect ? 'bg-success bg-opacity-10 text-success' : 'bg-error bg-opacity-10 text-error'
              }`}>
                <div className="flex items-center">
                  <Icon name={isCorrect ? "CheckCircle" : "XCircle"} size={18} className="mr-2" />
                  <p className="body-large">
                    {isCorrect ? "Correct! Well done." : "Incorrect. Try again."}
                  </p>
                </div>
              </div>
            )}
            
            <div className="flex justify-between">
              <button
                className="button-text bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md transition-colors"
                onClick={onComplete}
              >
                Skip
              </button>
              
              <button
                className={`button-text bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition-colors ${
                  !selectedAnswer && 'opacity-50 cursor-not-allowed'
                }`}
                onClick={handleQuizSubmit}
                disabled={!selectedAnswer}
              >
                Submit Answer
              </button>
            </div>
          </div>
        );
        
      case 'note':
        return (
          <div>
            <p className="body-large text-gray-900 mb-4">{interaction.content.prompt}</p>
            
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none mb-4"
              rows={4}
              placeholder={interaction.content.placeholder}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
            
            <div className="flex justify-between">
              <button
                className="button-text bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md transition-colors"
                onClick={onComplete}
              >
                Skip
              </button>
              
              <button
                className={`button-text bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition-colors ${
                  !noteText.trim() && 'opacity-50 cursor-not-allowed'
                }`}
                onClick={handleNoteSubmit}
                disabled={!noteText.trim()}
              >
                Save Note
              </button>
            </div>
          </div>
        );
        
      case 'reflection':
        return (
          <div>
            <p className="body-large text-gray-900 mb-4">{interaction.content.prompt}</p>
            
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none mb-4"
              rows={4}
              placeholder={interaction.content.placeholder}
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
            ></textarea>
            
            <div className="flex justify-between">
              <button
                className="button-text bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md transition-colors"
                onClick={onComplete}
              >
                Skip
              </button>
              
              <button
                className={`button-text bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition-colors ${
                  !reflectionText.trim() && 'opacity-50 cursor-not-allowed'
                }`}
                onClick={handleReflectionSubmit}
                disabled={!reflectionText.trim()}
              >
                Save Reflection
              </button>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="text-center">
            <p className="body-large text-gray-900 mb-4">Unknown interaction type</p>
            <button
              className="button-text bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition-colors"
              onClick={onComplete}
            >
              Continue
            </button>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="subheading text-gray-900 flex items-center">
            {interaction.type === 'quiz' && <Icon name="HelpCircle" size={18} className="text-primary mr-2" />}
            {interaction.type === 'note' && <Icon name="FileEdit" size={18} className="text-primary mr-2" />}
            {interaction.type === 'reflection' && <Icon name="Lightbulb" size={18} className="text-primary mr-2" />}
            {interaction.title}
          </h3>
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={onComplete}
          >
            <Icon name="X" size={18} />
          </button>
        </div>
        
        <div className="p-4">
          {renderInteractionContent()}
        </div>
      </div>
    </div>
  );
};

export default InteractiveElements;