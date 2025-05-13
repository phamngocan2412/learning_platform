import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/AppIcon";

import Header from "./components/Header";
import QuestionBank from "./components/QuestionBank";
import QuestionEditor from "./components/QuestionEditor";
import AssessmentSettings from "./components/AssessmentSettings";
import PreviewPanel from "./components/PreviewPanel";

const AssessmentCreator = () => {
  const [activeTab, setActiveTab] = useState("questions");
  const [selectedQuestionType, setSelectedQuestionType] = useState("multiple-choice");
  const [assessmentTitle, setAssessmentTitle] = useState("Untitled Assessment");
  const [showPreview, setShowPreview] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [questions, setQuestions] = useState([
    {
      id: 1,
      type: "multiple-choice",
      title: "Which of the following is a JavaScript framework?",
      points: 5,
      options: [
        { id: 1, text: "Python", isCorrect: false },
        { id: 2, text: "React", isCorrect: true },
        { id: 3, text: "Java", isCorrect: false },
        { id: 4, text: "HTML", isCorrect: false }
      ],
      feedback: {
        correct: "Correct! React is a JavaScript library for building user interfaces.",
        incorrect: "Incorrect. React is the JavaScript framework in this list."
      },
      difficulty: "medium"
    },
    {
      id: 2,
      type: "short-answer",
      title: "What does CSS stand for?",
      points: 3,
      correctAnswer: "Cascading Style Sheets",
      caseSensitive: false,
      feedback: {
        correct: "Correct!",
        incorrect: "Incorrect. CSS stands for Cascading Style Sheets."
      },
      difficulty: "easy"
    }
  ]);

  // Mock question templates
  const questionTemplates = [
    {
      id: 1,
      type: "multiple-choice",
      title: "Multiple Choice",
      description: "Select one correct answer from several options",
      icon: "CheckCircle"
    },
    {
      id: 2,
      type: "short-answer",
      title: "Short Answer",
      description: "Brief text response (1-2 sentences)",
      icon: "Type"
    },
    {
      id: 3,
      type: "essay",
      title: "Essay",
      description: "Extended written response",
      icon: "FileText"
    },
    {
      id: 4,
      type: "matching",
      title: "Matching",
      description: "Match items from two columns",
      icon: "GitMerge"
    },
    {
      id: 5,
      type: "true-false",
      title: "True/False",
      description: "Binary choice question",
      icon: "ToggleLeft"
    },
    {
      id: 6,
      type: "fill-blanks",
      title: "Fill in the Blanks",
      description: "Complete sentences with missing words",
      icon: "Edit3"
    },
    {
      id: 7,
      type: "hotspot",
      title: "Hotspot",
      description: "Identify areas on an image",
      icon: "Target"
    },
    {
      id: 8,
      type: "drag-drop",
      title: "Drag and Drop",
      description: "Arrange items in correct order or groups",
      icon: "Move"
    }
  ];

  // Mock assessment settings
  const [assessmentSettings, setAssessmentSettings] = useState({
    timeLimit: 60,
    attempts: 2,
    passingScore: 70,
    randomizeQuestions: true,
    showFeedback: "after_submission",
    gradingScheme: "points",
    accessControl: {
      startDate: "2023-07-01T08:00",
      endDate: "2023-07-15T23:59",
      requirePassword: false,
      password: ""
    },
    adaptiveSettings: {
      enabled: false,
      difficultyAdjustment: "performance",
      initialDifficulty: "medium"
    }
  });

  // Add a new question
  const addQuestion = (type) => {
    const newQuestion = {
      id: questions.length + 1,
      type: type,
      title: `New ${type} Question`,
      points: 5,
      options: type === "multiple-choice" ? [
        { id: 1, text: "Option 1", isCorrect: false },
        { id: 2, text: "Option 2", isCorrect: false }
      ] : [],
      feedback: {
        correct: "Correct!",
        incorrect: "Incorrect. Please try again."
      },
      difficulty: "medium"
    };
    
    setQuestions([...questions, newQuestion]);
    setActiveQuestion(questions.length);
  };

  // Update question
  const updateQuestion = (index, updatedQuestion) => {
    const newQuestions = [...questions];
    newQuestions[index] = updatedQuestion;
    setQuestions(newQuestions);
  };

  // Delete question
  const deleteQuestion = (index) => {
    if (questions.length > 1) {
      const newQuestions = questions.filter((_, i) => i !== index);
      setQuestions(newQuestions);
      if (activeQuestion >= index && activeQuestion > 0) {
        setActiveQuestion(activeQuestion - 1);
      }
    }
  };

  // Reorder questions
  const reorderQuestions = (sourceIndex, destinationIndex) => {
    const newQuestions = [...questions];
    const [removed] = newQuestions.splice(sourceIndex, 1);
    newQuestions.splice(destinationIndex, 0, removed);
    setQuestions(newQuestions);
    setActiveQuestion(destinationIndex);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        assessmentTitle={assessmentTitle} 
        setAssessmentTitle={setAssessmentTitle}
        showPreview={showPreview}
        setShowPreview={setShowPreview}
      />
      
      <main className="flex-1 container mx-auto px-4 py-6 lg:px-8 flex flex-col">
        <div className="mb-6 flex justify-between items-center">
          <div className="flex space-x-1">
            <button 
              className={`px-4 py-2 rounded-md button-text ${activeTab === 'questions' ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('questions')}
            >
              <Icon name="List" size={18} className="inline mr-2" />
              Questions
            </button>
            <button 
              className={`px-4 py-2 rounded-md button-text ${activeTab === 'settings' ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('settings')}
            >
              <Icon name="Settings" size={18} className="inline mr-2" />
              Settings
            </button>
            <button 
              className={`px-4 py-2 rounded-md button-text ${activeTab === 'analytics' ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('analytics')}
            >
              <Icon name="BarChart2" size={18} className="inline mr-2" />
              Analytics
            </button>
          </div>
          
          <div className="flex space-x-2">
            <Link 
              to="/teacher-dashboard" 
              className="px-4 py-2 rounded-md button-text bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
            >
              <Icon name="X" size={18} className="inline mr-2" />
              Cancel
            </Link>
            <button className="px-4 py-2 rounded-md button-text bg-success text-white hover:bg-opacity-90">
              <Icon name="Save" size={18} className="inline mr-2" />
              Save
            </button>
            <button className="px-4 py-2 rounded-md button-text bg-primary text-white hover:bg-primary-dark">
              <Icon name="Send" size={18} className="inline mr-2" />
              Publish
            </button>
          </div>
        </div>
        
        {showPreview ? (
          <PreviewPanel 
            questions={questions} 
            activeQuestion={activeQuestion}
            setActiveQuestion={setActiveQuestion}
            setShowPreview={setShowPreview}
          />
        ) : (
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {activeTab === 'questions' && (
              <>
                {/* Question Bank / Templates - Left Panel */}
                <div className="lg:col-span-3">
                  <QuestionBank 
                    questionTemplates={questionTemplates}
                    addQuestion={addQuestion}
                    questions={questions}
                    activeQuestion={activeQuestion}
                    setActiveQuestion={setActiveQuestion}
                    reorderQuestions={reorderQuestions}
                  />
                </div>
                
                {/* Question Editor - Right Panel */}
                <div className="lg:col-span-9">
                  <QuestionEditor 
                    question={questions[activeQuestion]}
                    updateQuestion={(updatedQuestion) => updateQuestion(activeQuestion, updatedQuestion)}
                    deleteQuestion={() => deleteQuestion(activeQuestion)}
                    questionIndex={activeQuestion}
                    totalQuestions={questions.length}
                  />
                </div>
              </>
            )}
            
            {activeTab === 'settings' && (
              <div className="lg:col-span-12">
                <AssessmentSettings 
                  settings={assessmentSettings}
                  setSettings={setAssessmentSettings}
                />
              </div>
            )}
            
            {activeTab === 'analytics' && (
              <div className="lg:col-span-12 bg-white rounded-lg shadow p-6">
                <div className="text-center py-8">
                  <Icon name="BarChart2" size={48} className="mx-auto mb-4 text-gray-400" />
                  <h3 className="heading text-gray-900 mb-2">Assessment Analytics</h3>
                  <p className="body text-gray-700 mb-4">Analytics will be available after students have taken this assessment.</p>
                  <p className="caption text-gray-500">You'll be able to view question difficulty, discrimination indices, and student performance data.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AssessmentCreator;