import { Outlet } from 'react-router-dom';
import Shell from '../components/layout/Shell';
import { Box } from '@mantine/core';

const HomeLayout = () => {
  return (
    <Shell>
      <Box py={10}>
        <Outlet />
      </Box>
    </Shell>
  );
};

export default HomeLayout;
