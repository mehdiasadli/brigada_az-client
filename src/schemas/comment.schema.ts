import { z } from 'zod';

export const AddCommentSchema = z.object({
  content: z
    .string()
    .min(1, 'Content is required')
    .max(500, 'Max length for content is 500 characters'),
});

export type TAddCommentSchema = z.infer<typeof AddCommentSchema>;
