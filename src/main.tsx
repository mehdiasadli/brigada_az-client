import PullToRefresh from 'pulltorefreshjs';
import ReactDOM from 'react-dom/client';
import App from './app';
import { inject } from '@vercel/analytics';
import './index.css';

inject();

const standalone = window.matchMedia('(display-mode: standalone)').matches;
const ios = /iPhone|iPad|iPod/i.test(window.navigator.userAgent);

if (standalone && ios) {
  PullToRefresh.init({
    onRefresh() {
      window.location.reload();
    },
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
