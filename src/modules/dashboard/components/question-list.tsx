'use client';

import React, { use } from 'react';
import QuestionCard from './question-card';
import { IQuestion } from '@/models/question';

type QuestionListProps = {
  questionsPromise: Promise<IQuestion[]>;
};

const QuestionList = ({ questionsPromise }: QuestionListProps) => {
  const questions = use(questionsPromise);

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <QuestionCard key={question.id} question={question} />
      ))}
    </div>
  );
};

export default QuestionList;
