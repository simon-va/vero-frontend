import ReactDOM from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from './components/App.tsx';
import './index.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './utils/theme.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={ theme }>
        <CssBaseline/>
        <App/>
    </ThemeProvider>
);
