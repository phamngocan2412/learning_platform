import React from "react";

const FillInBlankQuestion = ({ question, answer, onChange, disabled }) => {
  // Parse the question to find the blank
  const questionParts = question.question.split("________");
  
  return (
    <div className="mt-4">
      <div className="body-large text-gray-900">
        {questionParts[0]}
        <input
          type="text"
          value={answer || ""}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="mx-1 px-2 py-1 border-b-2 border-primary focus:outline-none focus:ring-0 bg-transparent w-32 text-center"
          placeholder="type answer"
        />
        {questionParts[1]}
      </div>
      
      <div className="mt-2 text-gray-500 body">
        <span className="italic">Type your answer in the blank space</span>
      </div>
    </div>
  );
};

export default FillInBlankQuestion;