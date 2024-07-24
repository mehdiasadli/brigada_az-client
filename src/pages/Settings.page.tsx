import { Button, Stack, TextInput, Textarea, Title } from '@mantine/core';
import { useUser } from '../hooks/useUser';
import { useForm, zodResolver } from '@mantine/form';
import { TUpdateUserSchema, UpdateUserSchema } from '../schemas/user.schema';
import dayjs from 'dayjs';
import { DatePickerInput } from '@mantine/dates';
import { useUpdateUser } from '../api/user/mutation';
import MetaTitle from '../components/ui/MetaTitle';

const SettingsPage = () => {
  const user = useUser();

  const form = useForm<TUpdateUserSchema>({
    initialValues: {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      date_of_birth: new Date(user.date_of_birth),
      positions: user.positions,
      bio: user.bio,
    },
    validate: zodResolver(UpdateUserSchema),
    onValuesChange(values) {
      values.email = values.email.toLowerCase().trim();

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

  const { mutate, isPending } = useUpdateUser();

  const onUpdate = (values: TUpdateUserSchema) => {
    mutate({
      id: user.id,
      data: values,
    });
  };

  return (
    <form onSubmit={form.onSubmit(onUpdate)}>
      <MetaTitle title={user.first_name + ' ' + user.last_name + ' | Edit'} />
      <Stack mt={10}>
        <Title order={2}>Update Your Account</Title>

        <TextInput label='First name' placeholder='ex: Jon' {...form.getInputProps('first_name')} />
        <TextInput label='Last name' placeholder='ex: Doe' {...form.getInputProps('last_name')} />
        <TextInput
          readOnly
          value={user.username}
          label='Username'
          disabled
          description='You cannot change your username'
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
        <Textarea
          label='Bio'
          autosize
          placeholder='Enter your bio'
          {...form.getInputProps('bio')}
        />
        <Button type='submit' disabled={!form.isDirty()} color='yellow' loading={isPending}>
          Update
        </Button>
      </Stack>
    </form>
  );
};

export default SettingsPage;
