import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const NotesList = ({ notes, bookmarks, onJumpToTime, onDeleteNote, onDeleteBookmark }) => {
  const [activeTab, setActiveTab] = useState('notes');
  const [isExpanded, setIsExpanded] = useState(true);
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div 
        className="p-4 border-b border-gray-200 flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="subheading text-gray-900 flex items-center">
          <Icon name={activeTab === 'notes' ? "FileEdit" : "Bookmark"} size={18} className="text-primary mr-2" />
          {activeTab === 'notes' ? 'My Notes' : 'Bookmarks'}
        </h3>
        <div className="flex items-center">
          <span className="badge-text text-gray-500 mr-2">
            {activeTab === 'notes' ? notes.length : bookmarks.length}
          </span>
          <button className="text-gray-500 hover:text-gray-700">
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={18} />
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <>
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-2 text-center button-text transition-colors ${
                activeTab === 'notes' ?'text-primary border-b-2 border-primary' :'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('notes')}
            >
              Notes
            </button>
            <button
              className={`flex-1 py-2 text-center button-text transition-colors ${
                activeTab === 'bookmarks' ?'text-primary border-b-2 border-primary' :'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('bookmarks')}
            >
              Bookmarks
            </button>
          </div>
          
          <div className="p-4">
            {activeTab === 'notes' ? (
              notes.length === 0 ? (
                <div className="text-center py-6">
                  <Icon name="FileEdit" size={32} className="mx-auto mb-2 text-gray-400" />
                  <p className="body text-gray-700">No notes yet</p>
                  <p className="caption text-gray-500 mt-1">
                    Add notes while watching the video
                  </p>
                </div>
              ) : (
                <div className="max-h-64 overflow-y-auto pr-2">
                  {notes.map((note) => (
                    <div 
                      key={note.id}
                      className="mb-3 p-3 bg-gray-50 rounded-md border border-gray-200"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <button
                          className="badge-text text-primary bg-primary bg-opacity-10 px-2 py-1 rounded-md flex items-center"
                          onClick={() => onJumpToTime(note.timestamp)}
                        >
                          <Icon name="Clock" size={12} className="mr-1" />
                          {note.formattedTime}
                        </button>
                        <button
                          className="text-gray-400 hover:text-error transition-colors"
                          onClick={() => onDeleteNote(note.id)}
                        >
                          <Icon name="Trash2" size={14} />
                        </button>
                      </div>
                      <p className="body text-gray-700">{note.content}</p>
                    </div>
                  ))}
                </div>
              )
            ) : (
              bookmarks.length === 0 ? (
                <div className="text-center py-6">
                  <Icon name="Bookmark" size={32} className="mx-auto mb-2 text-gray-400" />
                  <p className="body text-gray-700">No bookmarks yet</p>
                  <p className="caption text-gray-500 mt-1">
                    Bookmark important moments in the video
                  </p>
                </div>
              ) : (
                <div className="max-h-64 overflow-y-auto pr-2">
                  {bookmarks.map((bookmark) => (
                    <div 
                      key={bookmark.id}
                      className="flex items-center justify-between p-3 mb-2 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      <button
                        className="flex items-center"
                        onClick={() => onJumpToTime(bookmark.timestamp)}
                      >
                        <Icon name="Play" size={16} className="text-primary mr-2" />
                        <span className="body text-gray-700">{bookmark.formattedTime}</span>
                      </button>
                      <button
                        className="text-gray-400 hover:text-error transition-colors"
                        onClick={() => onDeleteBookmark(bookmark.id)}
                      >
                        <Icon name="Trash2" size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotesList;