import RouterProvider from './providers/Router.provider';
import Query from './providers/Query.provider';
import Mantine from './providers/Mantine.provider';
import Router from './router';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const App = () => {
  return (
    <RouterProvider>
      <Query>
        <Mantine>
          <Router />
        </Mantine>
      </Query>
    </RouterProvider>
  );
};

export default App;
