import { Button, Flex, Group, Stack, Text, Textarea } from '@mantine/core';
import UserPanel from '../ui/UserPanel';
import { useForm } from '@mantine/form';
import { TCreatePostSchema } from '../../schemas/post.schema';
import { useCreatePost } from '../../api/post/mutation';
import { modals } from '@mantine/modals';
import AddMentionsToPost from '../ui/AddMentionsToPost';
import { useDisclosure } from '@mantine/hooks';

export default function CreatePostModal() {
  const [addModeOpened, { open: openAddMode, close: closeAddMode }] = useDisclosure(false);
  const form = useForm<TCreatePostSchema>({
    initialValues: {
      content: '',
      mentions: [],
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
        <Flex align='center'>
          <UserPanel
            extra={
              form.getValues().mentions.length > 0
                ? `with ${form.getValues().mentions.join(', ')}`
                : undefined
            }
          />
          <Text mt={-10} fz='xs' c='dimmed'></Text>
        </Flex>
        <Textarea
          placeholder='Enter your thoughts...'
          autosize
          {...form.getInputProps('content')}
        />
        <Group>
          <AddMentionsToPost form={form} opened={addModeOpened} openAdd={openAddMode} closeAdd={closeAddMode} />
        </Group>
        <Button type='submit' loading={isPending} disabled={form.getValues().content.length === 0}>
          Post
        </Button>
      </Stack>
    </form>
  );
}
