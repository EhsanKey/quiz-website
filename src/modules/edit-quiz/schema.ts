import { z } from 'zod';

const incorrectAnswerSchema = z.object({
  value: z.string().min(1, 'Incorrect answer cannot be empty'),
  answerId: z.number().optional(),
  isNew: z.boolean().optional(),
});

export const editQuestionSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  correctAnswer: z.object({
    value: z.string().min(1, 'Correct answer cannot be empty'),
    answerId: z.number(),
  }),
  incorrectAnswers: z.array(incorrectAnswerSchema),
});

export type EditQuestionSchemaType = z.infer<typeof editQuestionSchema>;
