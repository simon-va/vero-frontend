import ReactDOM from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import routes from './routes';
import { Provider } from 'react-redux';
import { store } from './redux-modules';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={ store }>
        <RouterProvider router={ routes }/>
    </Provider>
);
