import { Button, Stack, Textarea } from '@mantine/core';
import UserPanel from '../ui/UserPanel';
import { useForm } from '@mantine/form';
import { TCreatePostSchema } from '../../schemas/post.schema';
import { useCreatePost } from '../../api/post/mutation';
import { modals } from '@mantine/modals';

export default function CreatePostModal() {
  const form = useForm<TCreatePostSchema>({
    initialValues: {
      content: '',
    },
    transformValues(values) {
      return { ...values, content: values.content.trim() };
    },
  });

  const { mutate, isPending } = useCreatePost();

  const onPost = (values: TCreatePostSchema) => {
    mutate(values, {
      onSuccess() {
        modals.closeAll();
      },
    });
  };

  return (
    <form onSubmit={form.onSubmit(onPost)}>
      <Stack>
        <UserPanel />
        <Textarea
          placeholder='Enter your thoughts...'
          autosize
          {...form.getInputProps('content')}
        />
        <Button type='submit' loading={isPending} disabled={form.getValues().content.length === 0}>
          Post
        </Button>
      </Stack>
    </form>
  );
}
