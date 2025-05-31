import React, { Suspense } from 'react';
import EditQuizForm from './edit-quiz-form';
import EditQuizHeader from './edit-quiz-header';
import EditQuizDescription from './edit-quiz-description';
import { fetchQuestionById } from '@/apis/services/question/_services';

const EditQuizModule = ({ id }: { id: number }) => {
  const question = fetchQuestionById(id);
  return (
    <>
      <EditQuizHeader />
      <EditQuizDescription />
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <EditQuizForm questionsPromise={question} />
      </Suspense>
    </>
  );
};

export default EditQuizModule;
