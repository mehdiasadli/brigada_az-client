import { z } from 'zod';
import { regexes } from '../lib/regexes';

const EmailDto = z.string().min(1, 'Email is required').email('Invalid Email');

const UsernameDto = z
  .string({ required_error: 'Username is required' })
  .min(4, 'Username must be at least 4 characters long')
  .max(20, 'Username cannot exceed 20 characters')
  .regex(regexes.username, 'Username can only include english letters, digits and "_" symbol');

export const NameDto = (name: string) =>
  z
    .string({
      required_error: name + ' name is required',
    })
    .min(2, name + ' name must be at least 2 characters long');

export const PasswordDto = z.string().min(1, 'Password is required');

export const DateOfBirthDto = z.coerce.date({
  invalid_type_error: 'Invalid date value',
});

export const CreateUserSchema = z.object({
  email: EmailDto,
  username: UsernameDto,
  password: PasswordDto,
  first_name: NameDto('First'),
  last_name: NameDto('Last'),
  date_of_birth: DateOfBirthDto.optional(),
});

const UpdateUserBaseSchema = z.object({
  date_of_birth: DateOfBirthDto,
  bio: z.string().max(500, 'Bio cannot exceed 500 characters').optional(),
});

export const UpdateUserSchema = CreateUserSchema.omit({
  username: true,
  password: true,
  date_of_birth: true,
}).merge(UpdateUserBaseSchema);

export const ChangePasswordSchema = CreateUserSchema.pick({ password: true })
  .merge(
    z.object({
      new_password: z.string().min(1, 'New password is required'),
      confirm_new_password: z.string().min(1, 'Confirm your new password'),
    })
  )
  .superRefine((arg, c) => {
    if (arg.new_password === arg.password) {
      c.addIssue({
        code: 'custom',
        path: ['new_password'],
        message: 'New password is same with the old one',
      });

      return z.NEVER;
    }

    if (arg.confirm_new_password !== arg.new_password) {
      c.addIssue({
        code: 'custom',
        path: ['confirm_new_password'],
        message: 'New passwords do not match',
      });
    }
  });

export type TCreateUserSchema = z.infer<typeof CreateUserSchema>;
export type TUpdateUserSchema = z.infer<typeof UpdateUserSchema>;
export type TChangePasswordSchema = z.infer<typeof ChangePasswordSchema>;
