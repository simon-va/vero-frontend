import { FC, useEffect, useMemo, useState } from 'react';
import Management from './management/Management.tsx';
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts';
import { loadModules } from '../redux-modules/modules/actions.ts';
import { selectSelectedClubId } from '../redux-modules/clubs/selectors.ts';
import { loadClubs } from '../redux-modules/clubs/actions.ts';
import { loadMembers } from '../redux-modules/members/actions.ts';
import { loadTeams } from '../redux-modules/teams/actions.ts';
import { selectIsLoggedIn } from '../redux-modules/app/selectors.ts';
import { setAccessToken } from '../redux-modules/app/slice.ts';
import { setSelectedClubId } from '../redux-modules/clubs/slice.ts';
import { CssBaseline } from '@mui/material';
import Login from './login/Login.tsx';
import Clubs from './clubs/Clubs.tsx';


const App: FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const selectedClubId = useAppSelector(selectSelectedClubId);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (selectedClubId) {
            void dispatch(loadModules());
            void dispatch(loadMembers());
            void dispatch(loadTeams());
        }
    }, [dispatch, selectedClubId]);

    useEffect(() => {
        if (isLoggedIn) {
            void dispatch(loadClubs());
        }
    }, [dispatch, isLoggedIn]);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const selectClubId = Number(localStorage.getItem('selectedClubId'));

        if (token) {
            console.log('token', token);
            dispatch(setAccessToken(token));
        }
        if (selectClubId) {
            dispatch(setSelectedClubId(selectClubId));
        }

        setIsLoading(false);
    }, [dispatch]);


    return useMemo(() => {
        switch (true) {
            case isLoading:
                return (
                    <>
                        <CssBaseline/>
                    </>
                );
            case !isLoggedIn:
                return (
                    <Login/>
                );
            case !selectedClubId:
                return (
                    <Clubs/>
                );
            default:
                return (
                    <Management/>
                );
        }

    }, [isLoading, isLoggedIn, selectedClubId]);
};

export default App;