import { z } from 'zod';
import { regexes } from '../lib/regexes';
import { Position } from '../types/enums';

const EmailDto = z.string().min(1, 'Email is required').email('Invalid Email');

const UsernameDto = z
  .string({ required_error: 'Username is required' })
  .min(4, 'Username must be at least 4 characters long')
  .max(20, 'Username cannot exceed 20 characters')
  .regex(regexes.username, 'Username can only include english letters, digits and "_" symbol');

const PositionsDto = z
  .array(
    z.nativeEnum(Position, {
      errorMap() {
        return {
          message: `Only valid position values are ${Object.values(Position).join(', ')}`,
        };
      },
    })
  )
  .max(4, 'Max limit for positions is 4');

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
  positions: PositionsDto,
  date_of_birth: DateOfBirthDto.optional(),
});

const UpdateUserBaseSchema = z.object({
  date_of_birth: DateOfBirthDto,
});

export const UpdateUserSchema = CreateUserSchema.omit({
  username: true,
  password: true,
  date_of_birth: true,
}).merge(UpdateUserBaseSchema);

export type TCreateUserSchema = z.infer<typeof CreateUserSchema>;
export type TUpdateUserSchema = z.infer<typeof UpdateUserSchema>;
