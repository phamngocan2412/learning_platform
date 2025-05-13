import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Icon from "../../components/AppIcon";

import Header from "./components/Header";
import CategoryList from "./components/CategoryList";
import PopularThreads from "./components/PopularThreads";
import ThreadList from "./components/ThreadList";
import ThreadDetail from "./components/ThreadDetail";
import ComposerButton from "./components/ComposerButton";
import ThreadComposer from "./components/ThreadComposer";

const DiscussionForum = () => {
  const [searchParams] = useSearchParams();
  const threadId = searchParams.get("id");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeFilter, setActiveFilter] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [showComposer, setShowComposer] = useState(false);
  const [activeThread, setActiveThread] = useState(null);

  // Mock user data
  const userData = {
    id: 1,
    name: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    role: "Student"
  };

  // Mock categories data
  const categories = [
    { id: "all", name: "All Topics", count: 156, icon: "Layers" },
    { id: "general", name: "General Discussion", count: 42, icon: "MessageCircle" },
    { id: "course-specific", name: "Course Specific", count: 78, icon: "BookOpen" },
    { id: "assignments", name: "Assignments Help", count: 23, icon: "FileText" },
    { id: "technical", name: "Technical Issues", count: 13, icon: "Tool" },
    { id: "study-groups", name: "Study Groups", count: 18, icon: "Users" },
    { id: "career", name: "Career & Jobs", count: 9, icon: "Briefcase" }
  ];

  // Mock threads data
  const threads = [
    {
      id: 1,
      title: "How to implement CSS Grid for responsive layouts?",
      category: "course-specific",
      course: "Introduction to Web Development",
      author: {
        id: 2,
        name: "Emily Parker",
        avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        role: "Student"
      },
      createdAt: "2023-06-18T14:30:00",
      lastActivity: "2023-06-19T10:15:00",
      views: 124,
      replies: 8,
      likes: 15,
      isPinned: false,
      isResolved: false,
      hasInstructorReply: true,
      content: `I'm struggling with implementing CSS Grid for my responsive layout project. I've tried following the examples in the course, but I'm having trouble with the grid-template-areas property.Here's my current code:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto;
  grid-template-areas: 
    "header header header header header header header header header header header header" "sidebar sidebar content content content content content content content content content content" "footer footer footer footer footer footer footer footer footer footer footer footer";
}
\`\`\`

But when I resize the browser window, the layout doesn't respond as expected. The sidebar overlaps with the content on smaller screens.

Has anyone successfully implemented a responsive grid layout that works well across different device sizes? Any tips or examples would be greatly appreciated!`,
      tags: ["CSS", "Web Development", "Responsive Design"]
    },
    {
      id: 2,
      title: "Understanding statistical significance in data analysis",
      category: "course-specific",
      course: "Data Science Fundamentals",
      author: {
        id: 3,
        name: "Michael Chen",
        avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        role: "Student"
      },
      createdAt: "2023-06-17T09:45:00",
      lastActivity: "2023-06-19T11:30:00",
      views: 98,
      replies: 12,
      likes: 23,
      isPinned: true,
      isResolved: true,
      hasInstructorReply: true,
      content: `I'm having trouble understanding when a result is considered statistically significant in our data analysis project. The course materials mention p-values and confidence intervals, but I'm confused about how to interpret these in practice.

For example, if I get a p-value of 0.06, is that significant or not? The conventional threshold is 0.05, but is this a hard rule?

Also, how do we account for multiple comparisons in our analysis? I've heard about the Bonferroni correction, but I'm not sure when to apply it.

Can someone explain these concepts in simpler terms or point me to some additional resources that might help? Thanks in advance!`,
      tags: ["Statistics", "Data Science", "Analysis"]
    },
    {
      id: 3,
      title: "Best practices for user testing in UX design",
      category: "course-specific",
      course: "UX/UI Design Principles",
      author: {
        id: 4,
        name: "Sophia Rodriguez",
        avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        role: "Student"
      },
      createdAt: "2023-06-16T16:20:00",
      lastActivity: "2023-06-18T14:45:00",
      views: 76,
      replies: 6,
      likes: 18,
      isPinned: false,
      isResolved: false,
      hasInstructorReply: false,
      content: `For my final project, I need to conduct user testing for a mobile app I'm designing. I'm wondering what best practices I should follow to get the most valuable feedback.

Specifically, I have questions about:
1. How many participants should I include in my user testing?
2. What's the best way to structure the testing sessions?
3. How do I create effective tasks for users to complete?
4. What are good techniques for encouraging participants to think aloud?
5. How should I document and analyze the results?

If anyone has experience with user testing or can recommend good resources beyond what's covered in the course, I'd really appreciate it!`,
      tags: ["UX Design", "User Testing", "Research"]
    },
    {
      id: 4,
      title: "Trouble with async/await in JavaScript",
      category: "course-specific",
      course: "Advanced JavaScript Concepts",
      author: {
        id: 5,
        name: "David Wilson",
        avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        role: "Student"
      },
      createdAt: "2023-06-15T11:10:00",
      lastActivity: "2023-06-17T13:25:00",
      views: 112,
      replies: 9,
      likes: 14,
      isPinned: false,
      isResolved: true,
      hasInstructorReply: true,
      content: `I'm having a hard time understanding how to properly use async/await in my JavaScript code. I keep running into issues where my async functions aren't behaving as expected. Here's a simplified version of my code:

\`\`\`javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function processData() {
  const data = fetchData();
  console.log(data); // This logs a Promise object, not the actual data
  // Process the data...
}

processData();
\`\`\`

I expected \`data\` to contain the JSON response, but instead it's a Promise object. What am I doing wrong here? How do I correctly use the result of an async function?`,
      tags: ["JavaScript", "Async/Await", "Promises"]
    },
    {
      id: 5,
      title: "Social media campaign strategy for small businesses",
      category: "course-specific",
      course: "Digital Marketing Essentials",
      author: {
        id: 6,
        name: "Jessica Thompson",
        avatar: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        role: "Student"
      },
      createdAt: "2023-06-14T15:30:00",
      lastActivity: "2023-06-16T09:40:00",
      views: 89,
      replies: 7,
      likes: 21,
      isPinned: false,
      isResolved: false,
      hasInstructorReply: true,
      content: `For my final project, I'm developing a social media campaign strategy for a small local bakery. I'm looking for advice on how to maximize engagement with a limited budget.

The bakery has been in business for over 20 years but has very little online presence. They want to use social media to attract younger customers while maintaining their brand identity as a traditional, family-owned business.

Some specific questions I have:
1. Which social media platforms would be most effective for a local food business?
2. What type of content tends to perform best for food-related businesses?
3. How frequently should they post to maintain engagement without overwhelming their resources?
4. What are some cost-effective ways to boost reach beyond organic posting?

Any insights or examples of successful small business social media campaigns would be really helpful!`,
      tags: ["Digital Marketing", "Social Media", "Small Business"]
    },
    {
      id: 6,
      title: "Implementing K-means clustering algorithm from scratch",
      category: "course-specific",
      course: "Machine Learning for Beginners",
      author: {
        id: 7,
        name: "Ryan Lee",
        avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        role: "Student"
      },
      createdAt: "2023-06-13T10:15:00",
      lastActivity: "2023-06-15T16:50:00",
      views: 67,
      replies: 5,
      likes: 12,
      isPinned: false,
      isResolved: false,
      hasInstructorReply: false,
      content: `I'm trying to implement the K-means clustering algorithm from scratch as part of our assignment, but I'm running into some issues with the convergence of the algorithm. Here's my current Python implementation:

\`\`\`python
import numpy as np

def kmeans(X, k, max_iters=100):
    # Randomly initialize centroids
    idx = np.random.choice(len(X), k, replace=False)
    centroids = X[idx, :]
    
    for _ in range(max_iters):
        # Assign each point to nearest centroid
        distances = np.sqrt(((X - centroids[:, np.newaxis])**2).sum(axis=2))
        labels = np.argmin(distances, axis=0)
        
        # Update centroids
        new_centroids = np.array([X[labels == i].mean(axis=0) for i in range(k)])
        
        # Check for convergence
        if np.all(centroids == new_centroids):
            break
            
        centroids = new_centroids
    
    return labels, centroids
\`\`\`

The problem is that my algorithm rarely converges within the maximum iterations. Also, I sometimes get empty clusters, which causes errors when trying to compute the new centroids.

Has anyone else implemented K-means from scratch? How did you handle these issues?`,
      tags: ["Machine Learning", "Clustering", "Python"]
    },
    {
      id: 7,
      title: "Study group for upcoming Data Science exam",
      category: "study-groups",
      course: "Data Science Fundamentals",
      author: {
        id: 8,
        name: "Olivia Martinez",
        avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        role: "Student"
      },
      createdAt: "2023-06-12T14:20:00",
      lastActivity: "2023-06-14T11:30:00",
      views: 54,
      replies: 15,
      likes: 28,
      isPinned: true,
      isResolved: false,
      hasInstructorReply: false,
      content: `Hi everyone! I'm organizing a study group for the upcoming Data Science midterm exam. The exam covers statistical analysis, data visualization, and basic machine learning concepts.

I'm thinking we could meet virtually twice a week (Tuesdays and Thursdays) from 7-9 PM EST starting next week. We can use the platform's video conferencing tool and collaborate on practice problems together. If you're interested in joining, please reply to this thread with:
1. Your name
2. Which topics you feel most comfortable with
3. Which topics you'd like to focus on more
4. Any specific questions or concepts you're struggling withI'll create a shared document where we can compile notes and practice questions. Looking forward to studying together!`,
      tags: ["Study Group", "Data Science", "Exam Prep"]
    },
    {
      id: 8,
      title: "Technical issue with code submission system",
      category: "technical",
      course: "General",
      author: {
        id: 9,
        name: "Daniel Brown",
        avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        role: "Student"
      },
      createdAt: "2023-06-11T09:30:00",
      lastActivity: "2023-06-13T15:45:00",
      views: 42,
      replies: 6,
      likes: 8,
      isPinned: false,
      isResolved: true,
      hasInstructorReply: true,
      content: `I'm experiencing an issue with the code submission system for the JavaScript course. When I try to submit my assignment, I keep getting an error message saying "Submission failed: Invalid file format" even though I'm submitting a .js file as required.

I've tried:
- Renaming the file
- Creating a new file with the same code
- Using a different browser
- Clearing my cache and cookies

Nothing seems to work. Is anyone else experiencing this issue? Or does anyone have suggestions for how to fix it?

Here's a screenshot of the error message: [Image would be attached here]

Thanks for any help!`,
      tags: ["Technical Issue", "Code Submission", "Platform Bug"]
    }
  ];

  // Mock comments data
  const comments = [
    {
      id: 1,
      threadId: 1,
      author: {
        id: 10,
        name: "Sarah Williams",
        avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        role: "Instructor"
      },
      content: `Great question about CSS Grid! The issue you're experiencing with the sidebar overlapping on smaller screens is common when working with fixed grid templates.

For responsive layouts, I recommend using media queries along with different grid-template-areas for different screen sizes. Here's an example:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto;
  grid-template-areas: 
    "header header header header header header header header header header header header" "sidebar sidebar content content content content content content content content content content" "footer footer footer footer footer footer footer footer footer footer footer footer";
}

@media (max-width: 768px) {
  .container {
    grid-template-areas: 
      "header header header header header header header header header header header header" "content content content content content content content content content content content content" "sidebar sidebar sidebar sidebar sidebar sidebar sidebar sidebar sidebar sidebar sidebar sidebar" "footer footer footer footer footer footer footer footer footer footer footer footer";
  }
}
\`\`\`

This way, on smaller screens, the sidebar will appear below the content instead of beside it, preventing overlap.

Another approach is to use \`minmax()\` for more flexible column sizing:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: minmax(200px, 2fr) minmax(300px, 10fr);
  gap: 20px;
}
\`\`\`

Hope this helps! Let me know if you have any other questions.`,
      createdAt: "2023-06-18T16:45:00",
      likes: 12,
      isInstructorResponse: true,
      parentId: null
    },
    {
      id: 2,
      threadId: 1,
      author: {
        id: 11,
        name: "James Wilson",
        avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        role: "Student"
      },
      content: `I had a similar issue with my project. In addition to what Sarah suggested, you might want to look into the \`grid-auto-flow\` property. It can help with how items that don't fit into your explicit grid are handled.

Also, for responsive designs, I've found that using \`auto-fit\` or \`auto-fill\` with \`minmax()\` works really well:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
\`\`\`

This creates as many columns as can fit with a minimum width of 250px, which automatically adjusts based on the viewport size.`,
      createdAt: "2023-06-18T18:20:00",
      likes: 8,
      isInstructorResponse: false,
      parentId: null
    },
    {
      id: 3,
      threadId: 1,
      author: {
        id: 2,
        name: "Emily Parker",
        avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        role: "Student"
      },
      content: `Thank you both for your helpful responses! I implemented the media query approach that Sarah suggested, and it worked perfectly. The layout now stacks properly on smaller screens.

I also experimented with the auto-fit and minmax() combination that James mentioned, which gave me even more flexibility for certain sections of my page.

Here's my updated code for anyone who might have a similar issue:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-areas: 
    "header header header header header header header header header header header header" "sidebar sidebar content content content content content content content content content content" "footer footer footer footer footer footer footer footer footer footer footer footer";
  gap: 20px;
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
    grid-template-areas: 
      "header" "content" "sidebar" "footer";
  }
}

/* For a gallery section */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}
\`\`\`

This has been really educational. Thanks again for your help!`,
      createdAt: "2023-06-19T09:15:00",
      likes: 5,
      isInstructorResponse: false,
      parentId: null
    },
    {
      id: 4,
      threadId: 1,
      author: {
        id: 12,
        name: "Alex Thompson",
        avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        role: "Student"
      },
      content: `@Emily, have you also tried using CSS Grid areas with named lines? I found that approach really helpful for complex layouts. Here's a quick example:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: [sidebar-start] 2fr [sidebar-end content-start] 10fr [content-end];
  grid-template-rows: [header-start] auto [header-end content-start] 1fr [content-end footer-start] auto [footer-end];
}

.header { grid-column: sidebar-start / content-end; grid-row: header-start / header-end; }
.sidebar { grid-column: sidebar-start / sidebar-end; grid-row: content-start / content-end; }
.content { grid-column: content-start / content-end; grid-row: content-start / content-end; }
.footer { grid-column: sidebar-start / content-end; grid-row: footer-start / footer-end; }
\`\`\`

This gives you more explicit control over where each element is placed.`,
      createdAt: "2023-06-19T10:05:00",
      likes: 3,
      isInstructorResponse: false,
      parentId: null
    },
    {
      id: 5,
      threadId: 1,
      author: {
        id: 2,
        name: "Emily Parker",
        avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        role: "Student"
      },
      content: `@Alex That's a great suggestion! I haven't tried named lines yet, but I can see how they would be useful for more complex layouts. I'll definitely experiment with that approach for my next project.

Do you find it easier to maintain compared to the grid-template-areas approach?`,
      createdAt: "2023-06-19T10:15:00",
      likes: 1,
      isInstructorResponse: false,
      parentId: 4
    }
  ];

  // Filter threads based on active category and search query
  const filteredThreads = threads.filter(thread => {
    const matchesCategory = activeCategory === "all" || thread.category === activeCategory;
    const matchesSearch = 
      thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // Sort threads based on active filter
  const sortedThreads = [...filteredThreads].sort((a, b) => {
    switch (activeFilter) {
      case "recent":
        return new Date(b.lastActivity) - new Date(a.lastActivity);
      case "popular":
        return b.views - a.views;
      case "unanswered":
        return a.isResolved === b.isResolved ? 0 : a.isResolved ? 1 : -1;
      case "instructor":
        return b.hasInstructorReply - a.hasInstructorReply;
      default:
        return new Date(b.lastActivity) - new Date(a.lastActivity);
    }
  });

  // Get thread comments
  const getThreadComments = (threadId) => {
    return comments.filter(comment => comment.threadId === threadId);
  };

  // Find thread by ID
  useEffect(() => {
    if (threadId) {
      const thread = threads.find(t => t.id === parseInt(threadId));
      setActiveThread(thread || null);
    } else {
      setActiveThread(null);
    }
  }, [threadId, threads]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        userData={userData} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      
      <main className="container mx-auto px-4 py-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="display-medium text-gray-900 mb-2">Discussion Forum</h1>
            <p className="body-large text-gray-700">Connect with peers and instructors</p>
          </div>
          <div className="hidden md:flex space-x-2">
            <button 
              onClick={() => setActiveFilter("recent")}
              className={`px-3 py-2 rounded-md button-text ${
                activeFilter === "recent" ?"bg-primary text-white" :"bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon name="Clock" size={16} className="inline mr-1" />
              Recent
            </button>
            <button 
              onClick={() => setActiveFilter("popular")}
              className={`px-3 py-2 rounded-md button-text ${
                activeFilter === "popular" ?"bg-primary text-white" :"bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon name="TrendingUp" size={16} className="inline mr-1" />
              Popular
            </button>
            <button 
              onClick={() => setActiveFilter("unanswered")}
              className={`px-3 py-2 rounded-md button-text ${
                activeFilter === "unanswered" ?"bg-primary text-white" :"bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon name="HelpCircle" size={16} className="inline mr-1" />
              Unanswered
            </button>
            <button 
              onClick={() => setActiveFilter("instructor")}
              className={`px-3 py-2 rounded-md button-text ${
                activeFilter === "instructor" ?"bg-primary text-white" :"bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon name="Award" size={16} className="inline mr-1" />
              Instructor Replies
            </button>
          </div>
        </div>

        {/* Mobile filter dropdown */}
        <div className="md:hidden mb-4">
          <select 
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <option value="recent">Recent Activity</option>
            <option value="popular">Most Popular</option>
            <option value="unanswered">Unanswered Questions</option>
            <option value="instructor">Instructor Replies</option>
          </select>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left sidebar - only visible when no thread is active on mobile */}
          <div className={`lg:col-span-3 ${activeThread && 'hidden lg:block'}`}>
            <CategoryList 
              categories={categories} 
              activeCategory={activeCategory} 
              setActiveCategory={setActiveCategory} 
            />
            
            <PopularThreads threads={threads} />
          </div>
          
          {/* Main content area */}
          <div className={`lg:col-span-9 ${activeThread ? 'block' : 'hidden lg:block'}`}>
            {activeThread ? (
              <ThreadDetail 
                thread={activeThread} 
                comments={getThreadComments(activeThread.id)}
                userData={userData}
              />
            ) : (
              <ThreadList 
                threads={sortedThreads} 
                activeFilter={activeFilter}
                searchQuery={searchQuery}
              />
            )}
          </div>
        </div>
      </main>
      
      {/* Floating compose button */}
      <ComposerButton onClick={() => setShowComposer(true)} />
      
      {/* Thread composer modal */}
      {showComposer && (
        <ThreadComposer 
          userData={userData}
          categories={categories.filter(cat => cat.id !== "all")}
          onClose={() => setShowComposer(false)}
        />
      )}
    </div>
  );
};

export default DiscussionForum;