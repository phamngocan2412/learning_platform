import React, { useRef, useEffect, useState } from "react";
import Icon from "../../../components/AppIcon";

const VideoTranscript = ({ transcript, currentTime, onJumpToTime, currentSegment }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const activeSegmentRef = useRef(null);
  
  // Scroll to active segment
  useEffect(() => {
    if (activeSegmentRef.current && currentSegment) {
      activeSegmentRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [currentSegment]);

  // Format time from seconds to MM:SS
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div 
        className="p-4 border-b border-gray-200 flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="subheading text-gray-900 flex items-center">
          <Icon name="FileText" size={18} className="text-primary mr-2" />
          Transcript
        </h3>
        <button className="text-gray-500 hover:text-gray-700">
          <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={18} />
        </button>
      </div>
      
      {isExpanded && (
        <div className="p-4">
          <div className="max-h-64 overflow-y-auto pr-2">
            {transcript.map((segment) => (
              <div 
                key={segment.id}
                ref={segment.id === currentSegment?.id ? activeSegmentRef : null}
                className={`mb-3 p-2 rounded-md cursor-pointer transition-colors ${
                  segment.id === currentSegment?.id 
                    ? 'bg-primary bg-opacity-10 border-l-4 border-primary' :'hover:bg-gray-100'
                }`}
                onClick={() => onJumpToTime(segment.startTime)}
              >
                <div className="flex items-start">
                  <span className="badge-text text-gray-500 mr-2 mt-1">
                    {formatTime(segment.startTime)}
                  </span>
                  <p className={`body flex-1 ${
                    segment.id === currentSegment?.id ? 'text-gray-900' : 'text-gray-700'
                  }`}>
                    {segment.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoTranscript;