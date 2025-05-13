import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Icon from "../../components/AppIcon";

import Header from "../student-dashboard/components/Header";
import VideoPlayer from "./components/VideoPlayer";
import VideoTranscript from "./components/VideoTranscript";
import LessonOutline from "./components/LessonOutline";
import InteractiveElements from "./components/InteractiveElements";
import NotesList from "./components/NotesList";

const VideoLessonPlayer = () => {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("course") || "1";
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState(0.8);
  const [showCaptions, setShowCaptions] = useState(true);
  const [activeInteraction, setActiveInteraction] = useState(null);
  const [notes, setNotes] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  
  // Mock user data (same as in student dashboard)
  const userData = {
    name: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
  };

  // Mock course data
  const courseData = {
    id: parseInt(courseId),
    title: "Introduction to Web Development",
    instructor: "Dr. Sarah Williams",
    currentLesson: {
      id: 1,
      title: "CSS Flexbox and Grid Systems",
      description: "Learn how to create responsive layouts using CSS Flexbox and Grid systems.",
      duration: "18:45",
      videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4", // Sample video URL
      thumbnail: "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      progress: 0.35,
      transcript: [
        { id: 1, startTime: 0, endTime: 15, text: "Welcome to our lesson on CSS Flexbox and Grid Systems. Today we\'ll explore how these powerful layout tools can help you create responsive designs with ease." },
        { id: 2, startTime: 16, endTime: 30, text: "Let\'s start with Flexbox. Flexbox is a one-dimensional layout method designed for laying out items in rows or columns." },
        { id: 3, startTime: 31, endTime: 45, text: "To create a flex container, you simply set the display property to \'flex\' on the parent element. This enables a flex context for all its direct children." },
        { id: 4, startTime: 46, endTime: 60, text: "The main axis is defined by the flex-direction property, which can be set to row, row-reverse, column, or column-reverse." },
        { id: 5, startTime: 61, endTime: 75, text: "The cross axis runs perpendicular to the main axis. If your flex-direction is row, your cross axis runs vertically." },
        { id: 6, startTime: 76, endTime: 90, text: "Now let\'s look at some key properties. The justify-content property aligns items along the main axis. Options include flex-start, flex-end, center, space-between, and space-around." },
        { id: 7, startTime: 91, endTime: 105, text: "The align-items property aligns items along the cross axis. Options include flex-start, flex-end, center, baseline, and stretch." },
        { id: 8, startTime: 106, endTime: 120, text: "Moving on to CSS Grid, this is a two-dimensional layout system designed for complex layouts. It works with both rows and columns simultaneously." },
        { id: 9, startTime: 121, endTime: 135, text: "To create a grid container, set the display property to \'grid\' on the parent element. Then use grid-template-columns and grid-template-rows to define the columns and rows." },
        { id: 10, startTime: 136, endTime: 150, text: "The fr unit is particularly useful in Grid layouts. It represents a fraction of the available space. For example, grid-template-columns: 1fr 2fr means the second column takes up twice as much space as the first." },
        { id: 11, startTime: 151, endTime: 165, text: "Grid areas allow you to name sections of your grid and place items within them using the grid-template-areas property." },
        { id: 12, startTime: 166, endTime: 180, text: "Let\'s look at a practical example of combining Flexbox and Grid for a responsive layout." },
      ],
      interactions: [
        { 
          id: 1, 
          type: "quiz", 
          triggerTime: 45, 
          title: "Quick Check: Flexbox Basics",
          content: {
            question: "What CSS property creates a flex container?",
            options: [
              { id: "a", text: "display: flex" },
              { id: "b", text: "position: flex" },
              { id: "c", text: "flex: 1" },
              { id: "d", text: "flex-direction: row" }
            ],
            correctAnswer: "a"
          }
        },
        { 
          id: 2, 
          type: "reflection", 
          triggerTime: 90, 
          title: "Reflection Point",
          content: {
            prompt: "Think about a layout challenge you\'ve faced. How could Flexbox help solve it?",
            placeholder: "Type your reflection here..."
          }
        },
        { 
          id: 3, 
          type: "quiz", 
          triggerTime: 135, 
          title: "Quick Check: Grid Basics",
          content: {
            question: "What does the \'fr\' unit represent in CSS Grid?",
            options: [
              { id: "a", text: "A fixed pixel value" },
              { id: "b", text: "A percentage of the parent" },
              { id: "c", text: "A fraction of available space" },
              { id: "d", text: "A flexible row" }
            ],
            correctAnswer: "c"
          }
        },
        { 
          id: 4, 
          type: "note", 
          triggerTime: 165, 
          title: "Key Takeaway",
          content: {
            prompt: "Summarize when you would use Flexbox vs. Grid in your projects.",
            placeholder: "Type your notes here..."
          }
        }
      ]
    },
    outline: [
      { id: 1, title: "Introduction to CSS Layout", completed: true, duration: "12:30" },
      { id: 2, title: "CSS Flexbox and Grid Systems", current: true, duration: "18:45" },
      { id: 3, title: "Responsive Design Principles", completed: false, duration: "15:20" },
      { id: 4, title: "Media Queries and Breakpoints", completed: false, duration: "14:10" },
      { id: 5, title: "Mobile-First Approach", completed: false, duration: "16:35" },
      { id: 6, title: "Layout Debugging Techniques", completed: false, duration: "13:45" },
      { id: 7, title: "Real-world Layout Examples", completed: false, duration: "20:15" },
      { id: 8, title: "Performance Considerations", completed: false, duration: "11:50" }
    ],
    nextLesson: {
      id: 3,
      title: "Responsive Design Principles"
    },
    previousLesson: {
      id: 1,
      title: "Introduction to CSS Layout"
    }
  };

  // Find current transcript segment based on video time
  const getCurrentTranscriptSegment = () => {
    return courseData.currentLesson.transcript.find(
      segment => currentTime >= segment.startTime && currentTime <= segment.endTime
    ) || courseData.currentLesson.transcript[0];
  };

  // Check for interactions that should be triggered
  useEffect(() => {
    const interaction = courseData.currentLesson.interactions.find(
      item => Math.abs(currentTime - item.triggerTime) < 2 && currentTime > 0
    );
    
    if (interaction && !activeInteraction) {
      setIsPlaying(false);
      setActiveInteraction(interaction);
    }
  }, [currentTime, activeInteraction]);

  // Handle adding a new note
  const handleAddNote = (content, timestamp = currentTime) => {
    const newNote = {
      id: Date.now(),
      content,
      timestamp,
      formattedTime: formatTime(timestamp)
    };
    setNotes(prev => [...prev, newNote]);
  };

  // Handle adding a bookmark
  const handleAddBookmark = () => {
    const newBookmark = {
      id: Date.now(),
      timestamp: currentTime,
      formattedTime: formatTime(currentTime),
      title: `Bookmark at ${formatTime(currentTime)}`
    };
    setBookmarks(prev => [...prev, newBookmark]);
  };

  // Format time from seconds to MM:SS
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle jumping to a specific time in the video
  const handleJumpToTime = (time) => {
    setCurrentTime(time);
  };

  // Handle completing an interaction
  const handleCompleteInteraction = () => {
    setActiveInteraction(null);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userData={userData} searchQuery="" setSearchQuery={() => {}} />
      
      <main className="container mx-auto px-4 py-6 lg:px-8">
        {/* Course navigation and progress */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div>
              <Link 
                to="/student-dashboard" 
                className="button-text text-gray-700 hover:text-gray-900 flex items-center mb-2"
              >
                <Icon name="ChevronLeft" size={16} className="mr-1" />
                Back to Dashboard
              </Link>
              <h1 className="heading text-gray-900">{courseData.title}</h1>
              <p className="body text-gray-700">
                <Icon name="User" size={14} className="inline mr-1 text-gray-500" />
                {courseData.instructor}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center">
              <Link 
                to={`/learning-path-navigator?course=${courseData.id}`}
                className="button-text bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md flex items-center transition-colors mr-3"
              >
                <Icon name="Map" size={16} className="mr-2" />
                Course Map
              </Link>
              
              <Link 
                to={`/interactive-quiz?course=${courseData.id}&lesson=${courseData.currentLesson.id}`}
                className="button-text bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md flex items-center transition-colors"
              >
                <Icon name="CheckSquare" size={16} className="mr-2" />
                Take Quiz
              </Link>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="h-2 rounded-full bg-primary" 
              style={{ width: `${courseData.currentLesson.progress * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center">
            <p className="caption text-gray-700">
              Lesson {courseData.currentLesson.id} of {courseData.outline.length}
            </p>
            <p className="caption text-gray-700">
              {Math.round(courseData.currentLesson.progress * 100)}% complete
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main content area */}
          <div className="lg:col-span-9">
            {/* Video player */}
            <VideoPlayer 
              videoUrl={courseData.currentLesson.videoUrl}
              thumbnail={courseData.currentLesson.thumbnail}
              title={courseData.currentLesson.title}
              currentTime={currentTime}
              setCurrentTime={setCurrentTime}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              playbackSpeed={playbackSpeed}
              setPlaybackSpeed={setPlaybackSpeed}
              volume={volume}
              setVolume={setVolume}
              showCaptions={showCaptions}
              setShowCaptions={setShowCaptions}
              onAddBookmark={handleAddBookmark}
              onAddNote={() => setActiveInteraction({
                id: 'manual-note',
                type: 'note',
                title: 'Add Note',
                content: {
                  prompt: 'Add a note at this timestamp:',
                  placeholder: 'Type your notes here...'
                }
              })}
            />
            
            {/* Interactive element overlay */}
            {activeInteraction && (
              <InteractiveElements 
                interaction={activeInteraction}
                onComplete={handleCompleteInteraction}
                onAddNote={handleAddNote}
              />
            )}
            
            {/* Transcript */}
            <div className="mt-6">
              <VideoTranscript 
                transcript={courseData.currentLesson.transcript}
                currentTime={currentTime}
                onJumpToTime={handleJumpToTime}
                currentSegment={getCurrentTranscriptSegment()}
              />
            </div>
            
            {/* Lesson navigation */}
            <div className="mt-6 flex justify-between">
              {courseData.previousLesson ? (
                <Link 
                  to={`/video-lesson-player?course=${courseData.id}&lesson=${courseData.previousLesson.id}`}
                  className="button-text bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md flex items-center transition-colors"
                >
                  <Icon name="ChevronLeft" size={16} className="mr-2" />
                  Previous: {courseData.previousLesson.title}
                </Link>
              ) : (
                <div></div>
              )}
              
              {courseData.nextLesson && (
                <Link 
                  to={`/video-lesson-player?course=${courseData.id}&lesson=${courseData.nextLesson.id}`}
                  className="button-text bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md flex items-center transition-colors"
                >
                  Next: {courseData.nextLesson.title}
                  <Icon name="ChevronRight" size={16} className="ml-2" />
                </Link>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-3">
            {/* Lesson outline */}
            <LessonOutline 
              outline={courseData.outline}
              courseId={courseData.id}
            />
            
            {/* Notes and bookmarks */}
            <NotesList 
              notes={notes}
              bookmarks={bookmarks}
              onJumpToTime={handleJumpToTime}
              onDeleteNote={(id) => setNotes(prev => prev.filter(note => note.id !== id))}
              onDeleteBookmark={(id) => setBookmarks(prev => prev.filter(bookmark => bookmark.id !== id))}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoLessonPlayer;