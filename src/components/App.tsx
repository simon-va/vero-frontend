import { FC, useEffect } from 'react';
import Management from './management/Management.tsx';
import { useAppDispatch } from '../hooks/redux.ts';
import { loadModules } from '../redux-modules/modules/actions.ts';


const App: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        void dispatch(loadModules());
    }, [dispatch]);

    return (
        <Management/>
    );
};

export default App;