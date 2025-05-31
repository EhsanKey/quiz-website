import React from 'react';

const NewQuizDescription = () => {
  return (
    <div className="flex flex-col">
      <span className="font-montserrat font-bold text-lg md:text-2xl text-brand">
        Create New QUIZ
      </span>
      <span className="font-montserrat text-xs font-normal md:text-sm text-tertiary">
        Fill in the details to create a new question with at least 4 answers.
      </span>
    </div>
  );
};

export default NewQuizDescription;
