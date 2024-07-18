import { useForm, zodResolver } from '@mantine/form';
import { LoginSchema, TLoginSchema } from '../schemas/auth.schema';
import { useLogin } from '../api/auth/mutation';
import { Anchor, Button, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const form = useForm<TLoginSchema>({
    initialValues: {
      username: '',
      password: '',
    },
    validate: zodResolver(LoginSchema),
    onValuesChange(values) {
      values.username = values.username.toLowerCase().trim();
    },
  });

  const { mutate, isPending } = useLogin();

  const onLogin = (values: TLoginSchema) => {
    mutate(values, {
      onError: () => {
        form.setFieldValue('password', '');
      },
    });
  };

  return (
    <form onSubmit={form.onSubmit(onLogin)} style={{ width: '100%' }}>
      <Stack>
        <Title order={2}>Login To Your Account</Title>

        <TextInput
          label='Username'
          placeholder='ex: jondoe_123'
          {...form.getInputProps('username')}
        />
        <PasswordInput
          label='Password'
          placeholder='ex: jondoe123'
          {...form.getInputProps('password')}
        />

        <Button mt={5} type='submit' loading={isPending}>
          Login
        </Button>
        <Anchor component={Link} to='/auth/register' ta='center'>
          Register here
        </Anchor>
      </Stack>
    </form>
  );
};

export default LoginPage;
