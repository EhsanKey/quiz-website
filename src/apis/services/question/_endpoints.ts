const QUESTION_URL = 'questions';

export const GET_QUESTIONS_EP = `${QUESTION_URL}`;
export const CREATE_QUESTION_EP = `${QUESTION_URL}`;
export const GET_QUESTION_EP = (id: number) => `${QUESTION_URL}/${id}`;
export const UPDATE_QUESTION_EP = (id: number) => `${QUESTION_URL}/${id}`;
export const DELETE_QUESTION_EP = (id: number) => `${QUESTION_URL}/${id}`;
