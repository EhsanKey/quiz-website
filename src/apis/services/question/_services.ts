import fetcher from '@/apis/core';
import {
  CREATE_QUESTION_EP,
  DELETE_QUESTION_EP,
  GET_QUESTION_EP,
  GET_QUESTIONS_EP,
  UPDATE_QUESTION_EP,
} from './_endpoints';
import { createAnswersBatch, upsertAnswers } from '../answers/_services';

export type EditQuestionPayload = {
  question: string;
  correctAnswer: {
    value: string;
    answerId: number;
  };
  incorrectAnswers: {
    value: string;
    answerId?: number;
    isNew?: boolean;
  }[];
};

export type NewQuestionPayload = {
  question: string;
  correctAnswer: string;
  incorrectAnswers: { value: string }[];
};

export async function fetchAllQuestions() {
  try {
    const response = await fetcher.get(GET_QUESTIONS_EP, {
      next: { revalidate: 3600 },
      cache: 'force-cache',
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching questions list:', error);
    throw error;
  }
}

export async function fetchQuestionById(id: number) {
  try {
    const response = await fetcher.get(GET_QUESTION_EP(id), {
      next: { revalidate: 3600 },
      cache: 'force-cache',
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching question with id=${id}:`, error);
    throw error;
  }
}

async function createQuestion(text: string) {
  try {
    const response = await fetcher.post(CREATE_QUESTION_EP, { question: text });
    return response.data;
  } catch (error) {
    console.error('Error creating question:', error);
    throw error;
  }
}

export async function createQuestionWithAnswers(values: NewQuestionPayload) {
  try {
    const { question, correctAnswer, incorrectAnswers } = values;
    const createdQuestion = await createQuestion(question);
    const answerItems = [
      ...incorrectAnswers.map((ans) => ({
        answerText: ans.value,
        quizId: createdQuestion.id,
        isCorrect: false,
      })),
      {
        answerText: correctAnswer,
        quizId: createdQuestion.id,
        isCorrect: true,
      },
    ];
    await createAnswersBatch(answerItems);
    return createdQuestion;
  } catch (error) {
    console.error('Error creating question and answers:', error);
    throw error;
  }
}

export async function updateQuestionText(id: number, newText: string) {
  try {
    const response = await fetcher.patch(UPDATE_QUESTION_EP(id), { question: newText });
    return response.data;
  } catch (error) {
    console.error(`Error updating question id=${id}:`, error);
    throw error;
  }
}

export async function updateQuestionWithAnswers(params: {
  id: number;
  values: EditQuestionPayload;
  changedFields: string[];
}) {
  const { id, values, changedFields } = params;
  try {
    const { question, correctAnswer, incorrectAnswers } = values;
    if (changedFields.includes('question')) {
      await updateQuestionText(id, question);
    }
    const changedIncorrect = incorrectAnswers.filter((ans, idx) =>
      changedFields.includes(`incorrectAnswers[${idx}]`)
    );
    const needsCorrectUpdate = changedFields.includes('correctAnswer.value');
    const answersToUpsert = [
      ...changedIncorrect,
      ...(needsCorrectUpdate ? [correctAnswer] : []),
    ].map((item) => ({
      value: item.value,
      answerId: item.answerId,
      isNew: 'isNew' in item ? (item.isNew ?? false) : false,
      isCorrect: item.answerId === correctAnswer.answerId,
    }));
    await upsertAnswers(answersToUpsert, id);
  } catch (error) {
    console.error(`Error updating question and answers for id=${id}:`, error);
    throw error;
  }
}

export const deleteQuestion = async (id: number) => {
  try {
    const response = await fetcher.delete(DELETE_QUESTION_EP(id));
    return response.data;
  } catch (error) {
    console.error('Error deleting question:', error);
    throw error;
  }
};
