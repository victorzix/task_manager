import { z } from 'zod';

export const TaskSchema = z.object({
  description: z
    .string({ required_error: 'A description must be provided' })
    .min(1, { message: 'Description is required' }),
  user_id: z.string().uuid(),
  time_to_complete: z.string({
    required_error: 'A time to complete must be provided',
  }),
});

export const UpdateTaskSchema = z.object({
  description: z.string().optional(),
  user_id: z.string().uuid().optional(),
  time_to_complete: z.number().optional(),
});
