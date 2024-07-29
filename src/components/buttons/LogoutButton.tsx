import { ActionIcon, ActionIconProps, Menu, Text, Tooltip, TooltipProps } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { useLogout } from '../../api/auth/mutation';
import { modals } from '@mantine/modals';

interface LogoutButtonProps extends ActionIconProps {
  tooltipProps?: TooltipProps;
  menu?: boolean;
}

export default function LogoutButton({ tooltipProps, menu = false, ...props }: LogoutButtonProps) {
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

  return menu ? (
    <Menu.Item color='red' leftSection={<IconLogout size={16} />} onClick={openConfirm}>
      Logout
    </Menu.Item>
  ) : (
    <Tooltip label='Logout' {...tooltipProps}>
      <ActionIcon size='xl' color='red' variant='light' onClick={openConfirm} {...props}>
        <IconLogout size={16} />
      </ActionIcon>
    </Tooltip>
  );
}
