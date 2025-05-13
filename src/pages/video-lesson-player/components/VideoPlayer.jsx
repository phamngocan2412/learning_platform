import React, { useRef, useEffect, useState } from "react";
import Icon from "../../../components/AppIcon";


const VideoPlayer = ({
  videoUrl,
  thumbnail,
  title,
  currentTime,
  setCurrentTime,
  isPlaying,
  setIsPlaying,
  playbackSpeed,
  setPlaybackSpeed,
  volume,
  setVolume,
  showCaptions,
  setShowCaptions,
  onAddBookmark,
  onAddNote
}) => {
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);
  const [isSpeedOpen, setIsSpeedOpen] = useState(false);
  
  // Control video playback
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(error => {
          console.error("Error playing video:", error);
          setIsPlaying(false);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, setIsPlaying]);
  
  // Update video time
  useEffect(() => {
    if (videoRef.current && Math.abs(videoRef.current.currentTime - currentTime) > 0.5) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime]);
  
  // Update playback speed
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);
  
  // Update volume
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);
  
  // Handle video time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };
  
  // Handle video metadata loaded
  const handleMetadataLoaded = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };
  
  // Format time from seconds to MM:SS
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Handle progress bar click
  const handleProgressBarClick = (e) => {
    if (progressBarRef.current && videoRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      const newTime = pos * videoRef.current.duration;
      setCurrentTime(newTime);
    }
  };
  
  // Toggle fullscreen
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current.parentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };
  
  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  // Hide controls after inactivity
  useEffect(() => {
    let timeout;
    
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };
    
    const playerElement = videoRef.current?.parentElement;
    if (playerElement) {
      playerElement.addEventListener('mousemove', handleMouseMove);
      playerElement.addEventListener('mouseenter', handleMouseMove);
      playerElement.addEventListener('mouseleave', () => {
        if (isPlaying) {
          setShowControls(false);
        }
      });
    }
    
    return () => {
      clearTimeout(timeout);
      if (playerElement) {
        playerElement.removeEventListener('mousemove', handleMouseMove);
        playerElement.removeEventListener('mouseenter', handleMouseMove);
        playerElement.removeEventListener('mouseleave', () => {});
      }
    };
  }, [isPlaying]);

  return (
    <div className="relative bg-black rounded-lg overflow-hidden shadow">
      {/* Video element */}
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          src={videoUrl}
          poster={thumbnail}
          className="w-full h-full object-contain"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleMetadataLoaded}
          onClick={() => setIsPlaying(!isPlaying)}
        />
        
        {/* Play/pause overlay button (center of video) */}
        {!isPlaying && (
          <button
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-4 text-white hover:bg-opacity-70 transition-opacity"
            onClick={() => setIsPlaying(true)}
          >
            <Icon name="Play" size={32} />
          </button>
        )}
        
        {/* Video title overlay */}
        <div className={`absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black to-transparent text-white transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          <h3 className="subheading">{title}</h3>
        </div>
        
        {/* Video controls */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          {/* Progress bar */}
          <div 
            ref={progressBarRef}
            className="w-full h-2 bg-gray-600 rounded-full mb-3 cursor-pointer"
            onClick={handleProgressBarClick}
          >
            <div 
              className="h-2 bg-primary rounded-full relative"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            >
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
          
          {/* Control buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Play/pause button */}
              <button 
                className="text-white hover:text-primary transition-colors"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
              </button>
              
              {/* Volume control */}
              <div className="relative">
                <button 
                  className="text-white hover:text-primary transition-colors"
                  onClick={() => setIsVolumeOpen(!isVolumeOpen)}
                >
                  <Icon 
                    name={
                      volume === 0 ? "VolumeX" : 
                      volume < 0.5 ? "Volume1" : "Volume2"
                    } 
                    size={20} 
                  />
                </button>
                
                {isVolumeOpen && (
                  <div className="absolute bottom-full left-0 mb-2 p-2 bg-gray-900 rounded-md shadow-lg">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-24 accent-primary"
                    />
                  </div>
                )}
              </div>
              
              {/* Time display */}
              <div className="text-white text-xs">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Add note button */}
              <button 
                className="text-white hover:text-primary transition-colors"
                onClick={onAddNote}
              >
                <Icon name="FileEdit" size={18} />
              </button>
              
              {/* Add bookmark button */}
              <button 
                className="text-white hover:text-primary transition-colors"
                onClick={onAddBookmark}
              >
                <Icon name="Bookmark" size={18} />
              </button>
              
              {/* Captions toggle */}
              <button 
                className={`transition-colors ${showCaptions ? 'text-primary' : 'text-white hover:text-primary'}`}
                onClick={() => setShowCaptions(!showCaptions)}
              >
                <Icon name="Subtitles" size={18} />
              </button>
              
              {/* Playback speed */}
              <div className="relative">
                <button 
                  className="text-white hover:text-primary transition-colors"
                  onClick={() => setIsSpeedOpen(!isSpeedOpen)}
                >
                  <span className="text-xs font-medium">{playbackSpeed}x</span>
                </button>
                
                {isSpeedOpen && (
                  <div className="absolute bottom-full right-0 mb-2 p-2 bg-gray-900 rounded-md shadow-lg">
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                      <button
                        key={speed}
                        className={`block w-full text-left px-3 py-1 text-sm rounded ${playbackSpeed === speed ? 'bg-primary text-white' : 'text-white hover:bg-gray-700'}`}
                        onClick={() => {
                          setPlaybackSpeed(speed);
                          setIsSpeedOpen(false);
                        }}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Fullscreen toggle */}
              <button 
                className="text-white hover:text-primary transition-colors"
                onClick={toggleFullScreen}
              >
                <Icon name={isFullScreen ? "Minimize" : "Maximize"} size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;