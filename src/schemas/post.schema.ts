import { z } from 'zod';

export const CreatePostSchema = z.object({
  content: z
    .string()
    .min(1, 'Post content is required')
    .max(500, 'Maximum content length is 500 characters'),
  mentions: z.array(z.string()).max(6, 'You cannot mention more than 6 users'),
});

export type TCreatePostSchema = z.infer<typeof CreatePostSchema>;
