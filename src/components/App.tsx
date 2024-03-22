import { FC, useEffect, useMemo } from 'react';
import Management from './management/Management.tsx';
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts';
import { loadModules } from '../redux-modules/modules/actions.ts';
import { selectSelectedClubId } from '../redux-modules/clubs/selectors.ts';
import { loadClubs } from '../redux-modules/clubs/actions.ts';
import { loadMembers } from '../redux-modules/members/actions.ts';
import { loadTeams } from '../redux-modules/teams/actions.ts';
import { selectIsLoggedIn, selectRoute } from '../redux-modules/app/selectors.ts';
import { setAccessToken, setRoute } from '../redux-modules/app/slice.ts';
import { setSelectedClubId } from '../redux-modules/clubs/slice.ts';
import { CssBaseline } from '@mui/material';
import Login from './login/Login.tsx';
import Clubs from './clubs/Clubs.tsx';
import Register from './register/Register.tsx';


const App: FC = () => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const selectedClubId = useAppSelector(selectSelectedClubId);
    const route = useAppSelector(selectRoute);

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
            dispatch(setAccessToken(token));
        }

        if (selectClubId) {
            dispatch(setSelectedClubId(selectClubId));
        }

        if (selectClubId) {
            dispatch(setRoute('/management'));
        } else if (token) {
            dispatch(setRoute('/clubs'));
        } else {
            dispatch(setRoute('/login'));
        }
    }, [dispatch]);


    return useMemo(() => {
        switch (route) {
            case '/management':
                return (
                    <Management/>
                );
            case '/login':
                return (
                    <Login/>
                );
            case '/clubs':
                return (
                    <Clubs/>
                );
            case '/register':
                return (
                    <Register/>
                );
            default:
                return (
                    <>
                        <CssBaseline/>
                    </>
                );
        }

    }, [route]);
};

export default App;