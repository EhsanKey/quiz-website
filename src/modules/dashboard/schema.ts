import { z } from 'zod';

export const AnswerSchema = z.object({
  answer: z.string().min(1, 'Please select an option'),
});

export type AnswerSchemaType = z.infer<typeof AnswerSchema>;
