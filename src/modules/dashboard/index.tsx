import React, { Suspense } from 'react';
import QuizDashboardHeader from './quiz-dashboard-header';
import QuestionList from './components/question-list';
import { fetchAllQuestions } from '@/apis/services/question/_services';

const DashboardModule = () => {
  const quiz_list = fetchAllQuestions();
  return (
    <>
      <QuizDashboardHeader />
      <Suspense fallback={<div className="text-center ">Loading...</div>}>
        <QuestionList questionsPromise={quiz_list}></QuestionList>
      </Suspense>
    </>
  );
};

export default DashboardModule;
