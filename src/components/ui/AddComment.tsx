import { ActionIcon, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconPlus } from '@tabler/icons-react';
import { TAddCommentSchema } from '../../schemas/comment.schema';
import { useAddComment } from '../../api/comment/mutation';
import { IPost } from '../../types/models';

interface AddCommentProps {
  post: IPost;
}

export default function AddComment({ post }: AddCommentProps) {
  const form = useForm<TAddCommentSchema>({
    initialValues: {
      content: '',
    },
    transformValues(values) {
      return { ...values, content: values.content.trim() };
    },
  });
  const { mutate, isPending } = useAddComment();

  const onAdd = (values: TAddCommentSchema) => {
    mutate(
      {
        postId: post.id,
        data: values,
      },
      {
        onSuccess() {
          form.reset();
        },
      }
    );
  };

  return (
    <form onSubmit={form.onSubmit(onAdd)}>
      <Textarea
        autosize
        disabled={isPending}
        placeholder='Enter your comment'
        rightSectionWidth={35}
        rightSection={
          <ActionIcon type='submit' loading={isPending}>
            <IconPlus size={14} />
          </ActionIcon>
        }
        {...form.getInputProps('content')}
      />
    </form>
  );
}
