import React from 'react';
import NewQuizDescription from './new-quiz-description';
import NewQuizHeader from './new-quiz-header';
import NewQuizForm from './new-quiz-form';

const NewQuizModule = () => {
  return (
    <>
      <NewQuizHeader />
      <NewQuizDescription />
      <NewQuizForm />
    </>
  );
};

export default NewQuizModule;
