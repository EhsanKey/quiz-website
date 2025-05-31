'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { AnswerSchema, AnswerSchemaType } from '../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import QuestionCardHeader from './question-card-header';
import QuizForm from './question-form';
import { IAnswer, IQuestion } from '@/models/question';
import { toast } from 'react-toastify';
import { Separator } from '@/components/ui/separator';

type QuestionCardProps = {
  question: IQuestion;
};

const QuestionCard = ({ question }: QuestionCardProps) => {
  const form = useForm<AnswerSchemaType>({
    resolver: zodResolver(AnswerSchema),
  });

  function onSubmit(data: IAnswer) {
    if (data.isCorrect) {
      toast.success('Your answer is correct!');
    } else {
      toast.error('Your answer is incorrect. Please try again.');
    }
  }

  return (
    <div className="w-full rounded-2 border border-primary p-5 flex flex-col gap-5 ">
      <QuestionCardHeader
        quizId={question.id}
        quizDate={new Date(question.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
        quizTitle={question.question}
      />
      <Separator />

      <QuizForm form={form} question={question} onSubmit={onSubmit} />
    </div>
  );
};

export default QuestionCard;
