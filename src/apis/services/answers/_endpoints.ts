const ANSWERS_URL = '/answers';

export const CREATE_AN_ANSWER_EP = `${ANSWERS_URL}`;
export const UPDATE_ANSWER_EP = (id: number) => `${ANSWERS_URL}/${id}`;
export const DELETE_ANSWER_EP = (id: number) => `${ANSWERS_URL}/${id}`;
