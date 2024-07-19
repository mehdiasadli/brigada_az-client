import RouterProvider from './providers/Router.provider';
import Query from './providers/Query.provider';
import Mantine from './providers/Mantine.provider';
import Router from './router';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { HelmetProvider } from 'react-helmet-async';

dayjs.extend(relativeTime);

const App = () => {
  return (
    <RouterProvider>
      <HelmetProvider>
        <Query>
          <Mantine>
            <Router />
          </Mantine>
        </Query>
      </HelmetProvider>
    </RouterProvider>
  );
};

export default App;
