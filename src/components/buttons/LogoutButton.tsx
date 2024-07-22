import { ActionIcon, ActionIconProps, Text, Tooltip, TooltipProps } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { useLogout } from '../../api/auth/mutation';
import { modals } from '@mantine/modals';

interface LogoutButtonProps extends ActionIconProps {
  tooltipProps?: TooltipProps;
}

export default function LogoutButton({ tooltipProps, ...props }: LogoutButtonProps) {
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
    <Tooltip label='Logout' {...tooltipProps}>
      <ActionIcon size='xl' color='red' variant='light' onClick={openConfirm} {...props}>
        <IconLogout size={16} />
      </ActionIcon>
    </Tooltip>
  );
}
