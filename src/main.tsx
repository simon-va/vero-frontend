import ReactDOM from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux-modules';
import App from './components/App.tsx';
import { theme } from './utils/theme.ts';
import { ThemeProvider } from '@mui/material';
import NotificationBar from './components/notification-bar/NotificationBar.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={ store }>
        <ThemeProvider theme={ theme }>
            <NotificationBar/>
            <App/>
        </ThemeProvider>
    </Provider>
);
