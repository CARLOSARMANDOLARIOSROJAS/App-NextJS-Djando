    // src/app/store.ts
    import { configureStore } from '@reduxjs/toolkit';
    import userReducer from '../userSlice'; // Adjust the path as necessary
    import authReducer from '../reducers/loginReducer';

    export const store = configureStore({
      reducer: {
        users: userReducer, // Assuming you have a userReducer defined
        auth: authReducer, // Add the auth reducer (now from createSlice)
      },
    });

    // Infer the `RootState` and `AppDispatch` types from the store itself
    export type RootState = ReturnType<typeof store.getState>;
    // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
    export type AppDispatch = typeof store.dispatch;