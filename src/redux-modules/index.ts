import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from './app/slice.ts';
import { modulesReducer } from './modules/slice.ts';
import { clubsReducer } from './clubs/slice.ts';
import { membersReducer } from './members/slice.ts';
import { groupsReducer } from './groups/slice.ts';
import { notificationReducer } from './notification/slice.ts';

export const store = configureStore({
    reducer: {
        app: appReducer,
        modules: modulesReducer,
        clubs: clubsReducer,
        members: membersReducer,
        groups: groupsReducer,
        notification: notificationReducer
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