import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from './app/slice.ts';
import { modulesReducer } from './modules/slice.ts';
import { clubsReducer } from './clubs/slice.ts';
import { membersReducer } from './members/slice.ts';
import { teamsReducer } from './teams/slice.ts';

export const store = configureStore({
    reducer: {
        app: appReducer,
        modules: modulesReducer,
        clubs: clubsReducer,
        members: membersReducer,
        teams: teamsReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false
        });
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type GetAppState = () => RootState;