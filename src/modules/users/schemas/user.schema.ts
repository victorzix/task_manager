import { z } from 'zod';

export const UserSchema = z.object({
  name: z.string({ required_error: 'A name must be provided'}).min(1, {message: "Name is required"}),
  email: z.string({ required_error: 'An email must be provided'}).email('A valid email must be provided'),
  password: z.string({ required_error: 'A password must be provided'}).min(8, {message: 'Password must have at least 8 characters'}),
});
