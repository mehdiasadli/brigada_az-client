import { useEffect, useState } from 'react';
import { useDeleteAvatar, useUploadAvatar } from '../../api/user/mutation';
import { Button, Fieldset, FileButton, Flex, Group, Stack } from '@mantine/core';
import UserAvatar from './UserAvatar';

export default function AvatarSettings() {
  const [file, setFile] = useState<File | null>(null);
  const { mutate, isPending } = useUploadAvatar();
  const { mutate: deleteAvatar, isPending: deleteAvatarPending } = useDeleteAvatar();

  useEffect(() => {
    const onUpload = () => {
      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        mutate(formData);
      }
    };

    if (file) {
      onUpload();
    }
  }, [file, mutate]);

  return (
    <Fieldset>
      <Flex align='center' justify='space-between'>
        <UserAvatar size='lg' />
        <Stack>
          <FileButton onChange={setFile} accept='image/png,image/jpg,image/jpeg'>
            {(props) => (
              <Button
                loading={isPending}
                size='xs'
                color='orange'
                variant='light'
                radius='lg'
                {...props}
              >
                Upload Image
              </Button>
            )}
          </FileButton>
          <Button
            loading={deleteAvatarPending}
            size='xs'
            color='red'
            variant='light'
            radius='lg'
            onClick={() => deleteAvatar()}
          >
            Delete Image
          </Button>
        </Stack>
      </Flex>
    </Fieldset>
  );
}
