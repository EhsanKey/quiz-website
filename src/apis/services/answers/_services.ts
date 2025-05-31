import fetcher from '@/apis/core/index';
import { CREATE_AN_ANSWER_EP, DELETE_ANSWER_EP, UPDATE_ANSWER_EP } from './_endpoints';

type AnswerPayload = {
  answerText: string;
  quizId: number;
  isCorrect: boolean;
};

type UpsertAnswerItem = {
  value: string;
  answerId?: number;
  isNew?: boolean;
  isCorrect: boolean;
};

export async function createAnswer(payload: AnswerPayload) {
  try {
    const response = await fetcher.post(CREATE_AN_ANSWER_EP, payload);
    return response.data;
  } catch (error) {
    console.error('Error creating answer:', error);
    throw error;
  }
}

export async function updateAnswer(id: number, payload: AnswerPayload) {
  try {
    const response = await fetcher.patch(UPDATE_ANSWER_EP(id), payload);
    return response.data;
  } catch (error) {
    console.error('Error updating answer:', error);
    throw error;
  }
}

export async function deleteAnswer(id: number) {
  try {
    const response = await fetcher.delete(DELETE_ANSWER_EP(id));
    return response.data;
  } catch (error) {
    console.error('Error deleting answer:', error);
    throw error;
  }
}

export async function createAnswersBatch(items: AnswerPayload[]) {
  try {
    const results = await Promise.all(items.map((item) => createAnswer(item)));
    return results;
  } catch (error) {
    console.error('Error creating answers batch:', error);
    throw error;
  }
}

export async function upsertAnswers(items: UpsertAnswerItem[], quizId: number) {
  try {
    const results = await Promise.all(
      items.map((item) => {
        const payload: AnswerPayload = {
          answerText: item.value,
          quizId,
          isCorrect: item.isCorrect,
        };

        if (item.isNew) {
          return createAnswer(payload);
        } else {
          return updateAnswer(item.answerId!, payload);
        }
      })
    );
    return results;
  } catch (error) {
    console.error('Error creating/updating answers batch:', error);
    throw error;
  }
}
