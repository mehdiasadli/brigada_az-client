import { Button } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export default function EditButton() {
  return (
    <Button component={Link} to='/settings' color='yellow' leftSection={<IconEdit size={15} />}>
      Edit
    </Button>
  );
}
