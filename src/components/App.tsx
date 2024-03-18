import { FC, useEffect } from 'react';
import Management from './management/Management.tsx';
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts';
import { loadModules } from '../redux-modules/modules/actions.ts';
import { selectSelectedClubId } from '../redux-modules/clubs/selectors.ts';
import { loadClubs, loadSelectedClub } from '../redux-modules/clubs/actions.ts';


const App: FC = () => {
    const selectedClubId = useAppSelector(selectSelectedClubId);

    const dispatch = useAppDispatch();

    useEffect(() => {
        void dispatch(loadModules());

        // loadClubs reset state
        // void dispatch(loadClubs());
    }, [dispatch]);

    useEffect(() => {
        if (selectedClubId) {
            void dispatch(loadSelectedClub(selectedClubId));
        }
    }, [dispatch, selectedClubId]);

    return (
        <Management/>
    );
};

export default App;