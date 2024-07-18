import { Button } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { useLogout } from '../../api/auth/mutation';

const LogoutButton = () => {
  const logout = useLogout();

  return (
    <Button
      size='xs'
      color='red'
      variant='light'
      leftSection={<IconLogout size={16} />}
      onClick={logout}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
