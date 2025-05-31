import { z } from 'zod';

export const newQuestionSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  correctAnswer: z.string().min(1, 'Cannot be empty'),
  incorrectAnswers: z.array(z.object({ value: z.string().min(1, 'Cannot be empty') })),
});

export type NewQuestionSchemaType = z.infer<typeof newQuestionSchema>;
