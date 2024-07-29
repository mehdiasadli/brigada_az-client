import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Header from './Header';
import Navbar from './Navbar';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Tabbar from './Tabbar';
import { navItems, tabItems } from '../../lib/navitems';

export default function Shell({ children }: { children: React.ReactNode }) {
  const [opened, { close }] = useDisclosure();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname) {
      close();
    }
  }, [close, location.pathname]);

  return (
    <AppShell
      header={{ height: 45 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header px='sm'>
        <Header />
      </AppShell.Header>
      <AppShell.Navbar p='md'>
        <Navbar items={navItems} />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
      <Tabbar items={tabItems} />
    </AppShell>
  );
}
