import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import StudentDashboard from "./pages/student-dashboard";
import CourseOnboarding from "./pages/course-onboarding";
import LearningPathNavigator from "./pages/learning-path-navigator";
import GamificationHub from "./pages/gamification-hub";
import StudentAnalytics from "./pages/student-analytics";
import TeacherDashboard from "./pages/teacher-dashboard";
import DiscussionForum from "./pages/discussion-forum";
import InteractiveQuiz from "./pages/interactive-quiz";
import VideoLessonPlayer from "./pages/video-lesson-player";
import AssessmentCreator from "./pages/assessment-creator";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <StudentDashboard /> },
    { path: "/student-dashboard", element: <StudentDashboard /> },
    { path: "/learning-path-navigator", element: <LearningPathNavigator /> },
    { path: "/gamification-hub", element: <GamificationHub /> },
    { path: "/student-analytics", element: <StudentAnalytics /> },
    { path: "/teacher-dashboard", element: <TeacherDashboard /> },
    { path: "/discussion-forum", element: <DiscussionForum /> },
    { path: "/interactive-quiz", element: <InteractiveQuiz /> },
    { path: "/video-lesson-player", element: <VideoLessonPlayer /> },
    { path: "/assessment-creator", element: <AssessmentCreator /> },
    { path: "/course-onboarding", element: <CourseOnboarding /> },
    // Routes for navigation - these components will be created separately
    { path: "*", element: <div>Page not found</div> }
  ]);

  return element;
};

const Routes = () => {
  return (
    <Router>
      <ScrollToTop />
      <ProjectRoutes />
    </Router>
  );
};

export default Routes;