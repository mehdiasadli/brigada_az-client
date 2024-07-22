import { Container, Flex } from '@mantine/core';
import UserPanel from '../ui/UserPanel';

export default function ProfileBar() {
  return (
    <Flex pos='fixed' bottom={0} left={0} right={0} justify='center' sx={{ zIndex: 100 }} bg='red'>
      <Container
        p={0}
        size='xs'
        w='100%'
        sx={{
          background: 'rgba( 255, 255, 255, 0.75 )',
          boxShadow: '0 2px 10px -8px rgba( 31, 38, 135, 0.37 )',
          backdropFilter: 'blur( 12px )',
          border: '1px solid rgba( 255, 255, 255, 0.18 )',
        }}
        px={10}
      >
        <Flex align='center' justify='space-around' gap={10}>
          <UserPanel />
        </Flex>
      </Container>
    </Flex>
  );
}
