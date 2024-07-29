import { Icon, IconHome, IconProps } from '@tabler/icons-react';

export type NavItemType = {
  label: string;
  to: string;

  Icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
};

export const navItems: NavItemType[] = [
  {
    label: 'Home',
    Icon: IconHome,
    to: '/',
  },
];

export const tabItems: NavItemType[] = [
  {
    label: 'Home',
    Icon: IconHome,
    to: '/',
  },
];
