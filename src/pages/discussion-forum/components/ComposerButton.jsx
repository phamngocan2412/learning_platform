import React from "react";
import Icon from "../../../components/AppIcon";

const ComposerButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      aria-label="Create new thread"
    >
      <Icon name="Plus" size={24} />
    </button>
  );
};

export default ComposerButton;