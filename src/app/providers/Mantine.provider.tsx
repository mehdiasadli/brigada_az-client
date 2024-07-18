import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { ModalsProvider } from '@mantine/modals';
import { Toaster } from 'sonner';
import { MantineEmotionProvider, emotionTransform } from '@mantine/emotion';

const theme: MantineThemeOverride = {
  defaultRadius: 'lg',
  primaryColor: 'green',
  cursorType: 'pointer',
};

const Mantine = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider theme={theme} stylesTransform={emotionTransform}>
      <MantineEmotionProvider>
        <DatesProvider settings={{}}>
          <ModalsProvider>
            {children}

            <Toaster richColors />
          </ModalsProvider>
        </DatesProvider>
      </MantineEmotionProvider>
    </MantineProvider>
  );
};

export default Mantine;
