import { Button, PasswordInput, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { TChangePasswordSchema } from '../../schemas/user.schema';
import { useChangePassword } from '../../api/user/mutation';

export default function ChangePasswordModal() {
  const form = useForm<TChangePasswordSchema>({
    initialValues: {
      password: '',
      new_password: '',
      confirm_new_password: '',
    },
  });

  const { mutate, isPending } = useChangePassword();

  const onChangePassowrd = (values: TChangePasswordSchema) => {
    mutate(values);
  };

  return (
    <form onSubmit={form.onSubmit(onChangePassowrd)}>
      <Stack>
        <PasswordInput
          label='Password'
          placeholder='Enter your current password'
          {...form.getInputProps('password')}
        />
        <PasswordInput
          label='New password'
          placeholder='Enter your new password'
          {...form.getInputProps('new_password')}
        />
        <PasswordInput
          label='Confirm password'
          placeholder='Confirm your new password'
          {...form.getInputProps('confirm_new_password')}
        />
        <Button type='submit' color='yellow' loading={isPending}>
          Submit
        </Button>
      </Stack>
    </form>
  );
}
