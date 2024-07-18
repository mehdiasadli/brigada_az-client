import ReactDOM from 'react-dom/client';
import App from './app';
import { inject } from '@vercel/analytics';
import './index.css';

inject();
ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
