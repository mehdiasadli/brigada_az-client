import { Center } from '@mantine/core';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <Center mih='100vh'>
      <Outlet />
    </Center>
  );
};

export default AuthLayout;
