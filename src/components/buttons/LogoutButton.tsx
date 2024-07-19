import { ActionIcon, Text, Tooltip } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { useLogout } from '../../api/auth/mutation';
import { modals } from '@mantine/modals';

const LogoutButton = () => {
  const logout = useLogout();
  const openConfirm = () =>
    modals.openConfirmModal({
      children: <Text>Do you want to logout?</Text>,
      labels: {
        confirm: 'Logout',
        cancel: 'Cancel',
      },
      confirmProps: {
        color: 'red',
      },
      onConfirm() {
        logout();
      },
      withCloseButton: false,
    });

  return (
    <Tooltip label='Logout'>
      <ActionIcon size='xl' color='red' variant='light' onClick={openConfirm}>
        <IconLogout size={16} />
      </ActionIcon>
    </Tooltip>
  );
};

export default LogoutButton;
