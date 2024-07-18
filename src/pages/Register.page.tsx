import { useForm, zodResolver } from '@mantine/form';
import { Anchor, Button, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import { CreateUserSchema, TCreateUserSchema } from '../schemas/user.schema';
import { useRegister } from '../api/user/mutation';
import { DatePickerInput } from '@mantine/dates';
import dayjs from 'dayjs';

const RegisterPage = () => {
  const form = useForm<TCreateUserSchema>({
    initialValues: {
      email: '',
      password: '',
      date_of_birth: undefined,
      first_name: '',
      last_name: '',
      positions: [],
      username: '',
    },
    validate: zodResolver(CreateUserSchema),
    onValuesChange(values) {
      for (const field of ['email', 'username'] as const) {
        values[field] = values[field].toLowerCase().trim();
      }

      for (const field of ['first_name', 'last_name'] as const) {
        values[field] = !values[field]
          ? values[field]
          : values[field][0].toUpperCase() + values[field].substring(1);
      }
    },
    transformValues(values) {
      return {
        ...values,
        first_name: values.first_name.trim(),
        last_name: values.last_name.trim(),
      };
    },
  });

  const { mutate, isPending } = useRegister();

  const onRegister = (values: TCreateUserSchema) => {
    mutate(values, {
      onError: () => {
        form.setFieldValue('password', '');
      },
    });
  };

  return (
    <form onSubmit={form.onSubmit(onRegister)} style={{ width: '100%' }}>
      <Stack>
        <Title order={2}>Create Your Account</Title>

        <TextInput label='First name' placeholder='ex: Jon' {...form.getInputProps('first_name')} />
        <TextInput label='Last name' placeholder='ex: Doe' {...form.getInputProps('last_name')} />
        <TextInput
          label='Username'
          placeholder='ex: jondoe_123'
          {...form.getInputProps('username')}
        />
        <TextInput
          label='Email'
          placeholder='ex: jondoe@example.com'
          {...form.getInputProps('email')}
        />
        <DatePickerInput
          label='Date of Birth'
          placeholder='Enter your birth date'
          maxDate={dayjs().subtract(12, 'years').toDate()}
          minDate={dayjs().subtract(100, 'years').toDate()}
          {...form.getInputProps('date_of_birth')}
        />
        <PasswordInput
          label='Password'
          placeholder='ex: jondoe123'
          {...form.getInputProps('password')}
        />

        <Button mt={5} type='submit' loading={isPending}>
          Register
        </Button>
        <Anchor component={Link} to='/auth' ta='center'>
          Login here
        </Anchor>
      </Stack>
    </form>
  );
};

export default RegisterPage;
