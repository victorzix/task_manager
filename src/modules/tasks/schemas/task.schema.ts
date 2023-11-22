import { z } from 'zod';

export const TaskSchema = z.object({
  task: z
    .string({ required_error: 'A title must be provided' })
    .max(12, { message: 'Title max length is 12' }),
  description: z
    .string({ required_error: 'A description must be provided' })
    .min(1, { message: 'Description is required' }),
  user_id: z.string().uuid(),
  time_to_complete: z.string({
    required_error: 'A time to complete must be provided',
  }),
});

export const UpdateTaskSchema = z.object({
  task: z.string().optional(),
  description: z.string().optional(),
  user_id: z.string().uuid().optional(),
  time_to_complete: z.number().optional(),
});
