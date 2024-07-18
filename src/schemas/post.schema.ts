import { z } from 'zod';

export const CreatePostSchema = z.object({
  content: z
    .string()
    .min(1, 'Post content is required')
    .max(500, 'Maximum content length is 500 characters'),
});

export type TCreatePostSchema = z.infer<typeof CreatePostSchema>;
