import React, { useState, useEffect } from "react";



import Header from "./components/Header";
import QuizProgress from "./components/QuizProgress";
import QuestionDisplay from "./components/QuestionDisplay";
import QuizNavigation from "./components/QuizNavigation";
import FeedbackModal from "./components/FeedbackModal";
import ResultsSummary from "./components/ResultsSummary";

const InteractiveQuiz = () => {
  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes in seconds
  const [timerEnabled, setTimerEnabled] = useState(true);

  // Mock quiz data
  const quizData = {
    id: "web-dev-fundamentals-quiz",
    title: "Web Development Fundamentals",
    description: "Test your knowledge of HTML, CSS, and JavaScript fundamentals",
    courseName: "Introduction to Web Development",
    totalQuestions: 10,
    passingScore: 70,
    timeLimit: 1800, // 30 minutes in seconds
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "Which HTML tag is used to create a hyperlink?",
        options: [
          { id: "a", text: "<link>" },
          { id: "b", text: "<a>" },
          { id: "c", text: "<href>" },
          { id: "d", text: "<url>" }
        ],
        correctAnswer: "b",
        explanation: "The <a> (anchor) tag is used to create hyperlinks in HTML. The href attribute specifies the URL that the link goes to.",
        difficulty: "easy",
        points: 10
      },
      {
        id: 2,
        type: "multiple-choice",
        question: "Which CSS property is used to change the text color of an element?",
        options: [
          { id: "a", text: "text-color" },
          { id: "b", text: "font-color" },
          { id: "c", text: "color" },
          { id: "d", text: "text-style" }
        ],
        correctAnswer: "c",
        explanation: "The \'color\' property is used to set the color of text in CSS.",
        difficulty: "easy",
        points: 10
      },
      {
        id: 3,
        type: "fill-in-blank",
        question: "In JavaScript, the ________ method is used to add new elements to the end of an array.",
        correctAnswer: "push",
        explanation: "The push() method adds new items to the end of an array and returns the new length.",
        difficulty: "medium",
        points: 15
      },
      {
        id: 4,
        type: "matching",
        question: "Match the HTML elements with their correct descriptions:",
        items: [
          { id: "a", text: "<header>" },
          { id: "b", text: "<footer>" },
          { id: "c", text: "<nav>" },
          { id: "d", text: "<article>" }
        ],
        matches: [
          { id: "1", text: "Defines a set of navigation links" },
          { id: "2", text: "Represents a self-contained composition" },
          { id: "3", text: "Represents a container for introductory content" },
          { id: "4", text: "Defines a footer for a document or section" }
        ],
        correctAnswer: { "a": "3", "b": "4", "c": "1", "d": "2" },
        explanation: "HTML5 semantic elements help describe the purpose of different parts of a web page.",
        difficulty: "hard",
        points: 20
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "Which JavaScript method is used to select an HTML element by its ID?",
        options: [
          { id: "a", text: "document.query()" },
          { id: "b", text: "document.getElement()" },
          { id: "c", text: "document.getElementById()" },
          { id: "d", text: "document.selectElement()" }
        ],
        correctAnswer: "c",
        explanation: "The getElementById() method returns the element that has the ID attribute with the specified value.",
        difficulty: "medium",
        points: 15
      },
      {
        id: 6,
        type: "multiple-choice",
        question: "Which CSS property is used to create space between elements?",
        options: [
          { id: "a", text: "spacing" },
          { id: "b", text: "margin" },
          { id: "c", text: "padding" },
          { id: "d", text: "border" }
        ],
        correctAnswer: "b",
        explanation: "The margin property defines the space around an element, outside of any defined borders.",
        difficulty: "easy",
        points: 10
      },
      {
        id: 7,
        type: "fill-in-blank",
        question: "In CSS, the ________ property is used to specify the font of an element.",
        correctAnswer: "font-family",
        explanation: "The font-family property specifies the font for an element. It can hold several font names as a \'fallback\' system.",
        difficulty: "medium",
        points: 15
      },
      {
        id: 8,
        type: "multiple-choice",
        question: "Which of the following is NOT a JavaScript data type?",
        options: [
          { id: "a", text: "String" },
          { id: "b", text: "Boolean" },
          { id: "c", text: "Character" },
          { id: "d", text: "Number" }
        ],
        correctAnswer: "c",
        explanation: "JavaScript does not have a Character data type. Single characters in JavaScript are simply strings with a length of 1.",
        difficulty: "medium",
        points: 15
      },
      {
        id: 9,
        type: "multiple-choice",
        question: "Which HTML tag is used to define an unordered list?",
        options: [
          { id: "a", text: "<ol>" },
          { id: "b", text: "<li>" },
          { id: "c", text: "<ul>" },
          { id: "d", text: "<list>" }
        ],
        correctAnswer: "c",
        explanation: "The <ul> tag defines an unordered (bulleted) list. Use the <ul> tag together with the <li> tag to create unordered lists.",
        difficulty: "easy",
        points: 10
      },
      {
        id: 10,
        type: "matching",
        question: "Match the CSS selectors with their descriptions:",
        items: [
          { id: "a", text: "#header" },
          { id: "b", text: ".menu" },
          { id: "c", text: "p" },
          { id: "d", text: "div > p" }
        ],
        matches: [
          { id: "1", text: "Selects all paragraph elements" },
          { id: "2", text: "Selects all elements with class \'menu'" },
          { id: "3", text: "Selects the element with id \'header'" },
          { id: "4", text: "Selects all paragraph elements that are direct children of div elements" }
        ],
        correctAnswer: { "a": "3", "b": "2", "c": "1", "d": "4" },
        explanation: "CSS selectors are patterns used to select HTML elements you want to style.",
        difficulty: "hard",
        points: 20
      }
    ]
  };

  // Timer effect
  useEffect(() => {
    if (!timerEnabled || quizCompleted) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setQuizCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerEnabled, quizCompleted]);

  // Format time remaining
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Current question
  const currentQuestion = quizData.questions[currentQuestionIndex];

  // Handle answer submission
  const handleAnswerSubmit = (answer) => {
    // Save the answer
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));

    // Check if answer is correct
    let isCorrect = false;
    if (currentQuestion.type === "multiple-choice") {
      isCorrect = answer === currentQuestion.correctAnswer;
    } else if (currentQuestion.type === "fill-in-blank") {
      isCorrect = answer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
    } else if (currentQuestion.type === "matching") {
      isCorrect = Object.keys(answer).every(key => 
        answer[key] === currentQuestion.correctAnswer[key]
      );
    }

    // Show feedback
    setFeedbackData({
      isCorrect,
      explanation: currentQuestion.explanation,
      correctAnswer: currentQuestion.correctAnswer
    });
    setShowFeedback(true);
  };

  // Handle navigation
  const goToNextQuestion = () => {
    if (currentQuestionIndex < quizData.totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowFeedback(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowFeedback(false);
    }
  };

  // Toggle flagged question
  const toggleFlagQuestion = () => {
    setFlaggedQuestions(prev => {
      if (prev.includes(currentQuestion.id)) {
        return prev.filter(id => id !== currentQuestion.id);
      } else {
        return [...prev, currentQuestion.id];
      }
    });
  };

  // Calculate quiz results
  const calculateResults = () => {
    let totalPoints = 0;
    let earnedPoints = 0;
    let correctAnswers = 0;

    quizData.questions.forEach(question => {
      totalPoints += question.points;
      
      const userAnswer = userAnswers[question.id];
      if (!userAnswer) return;

      let isCorrect = false;
      if (question.type === "multiple-choice") {
        isCorrect = userAnswer === question.correctAnswer;
      } else if (question.type === "fill-in-blank") {
        isCorrect = userAnswer.toLowerCase() === question.correctAnswer.toLowerCase();
      } else if (question.type === "matching") {
        isCorrect = Object.keys(userAnswer).every(key => 
          userAnswer[key] === question.correctAnswer[key]
        );
      }

      if (isCorrect) {
        earnedPoints += question.points;
        correctAnswers++;
      }
    });

    const percentageScore = Math.round((earnedPoints / totalPoints) * 100);
    const passed = percentageScore >= quizData.passingScore;

    return {
      totalQuestions: quizData.totalQuestions,
      answeredQuestions: Object.keys(userAnswers).length,
      correctAnswers,
      incorrectAnswers: Object.keys(userAnswers).length - correctAnswers,
      earnedPoints,
      totalPoints,
      percentageScore,
      passed
    };
  };

  // Reset quiz
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setQuizCompleted(false);
    setShowFeedback(false);
    setFlaggedQuestions([]);
    setTimeRemaining(quizData.timeLimit);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title={quizData.title} 
        courseName={quizData.courseName}
        timeRemaining={formatTime(timeRemaining)}
        timerEnabled={timerEnabled}
        toggleTimer={() => setTimerEnabled(prev => !prev)}
      />
      
      <main className="container mx-auto px-4 py-6 lg:px-8">
        {!quizCompleted ? (
          <div className="max-w-4xl mx-auto">
            <QuizProgress 
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={quizData.totalQuestions}
              flaggedQuestions={flaggedQuestions}
            />
            
            <div className="bg-white rounded-lg shadow-md p-6 mt-4">
              <QuestionDisplay 
                question={currentQuestion}
                userAnswer={userAnswers[currentQuestion.id]}
                onAnswerSubmit={handleAnswerSubmit}
                showFeedback={showFeedback}
              />
              
              {showFeedback && (
                <FeedbackModal 
                  feedbackData={feedbackData}
                  onClose={goToNextQuestion}
                />
              )}
            </div>
            
            <QuizNavigation 
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={quizData.totalQuestions}
              onPrevious={goToPreviousQuestion}
              onNext={goToNextQuestion}
              onFlag={toggleFlagQuestion}
              isFlagged={flaggedQuestions.includes(currentQuestion.id)}
              isAnswered={userAnswers[currentQuestion.id] !== undefined}
              showFeedback={showFeedback}
            />
          </div>
        ) : (
          <ResultsSummary 
            results={calculateResults()}
            onRetry={resetQuiz}
          />
        )}
      </main>
    </div>
  );
};

export default InteractiveQuiz;