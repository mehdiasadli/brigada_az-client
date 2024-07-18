import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Header from './Header';
import Navbar from './Navbar';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Shell = ({ children }: { children: React.ReactNode }) => {
  const [opened, { toggle, close }] = useDisclosure();
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
        <Header opened={opened} toggle={toggle} />
      </AppShell.Header>
      <AppShell.Navbar p='md'>
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default Shell;
