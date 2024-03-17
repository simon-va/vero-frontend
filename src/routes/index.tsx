import { createBrowserRouter } from 'react-router-dom';
import Root from './Root.tsx';
import ClubSettings from '../components/club-settings/ClubSettings.tsx';
import Home from '../components/home/Home.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        children: [
            {
                path: 'club-settings',
                element: <ClubSettings/>
            },
            {
                path: '/',
                element: <Home/>
            }
        ]
    }
]);

export default router;
