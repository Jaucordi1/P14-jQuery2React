import {combineReducers, configureStore} from "@reduxjs/toolkit";
import employeeReducer from "./features/employees";
import {useDispatch} from "react-redux";

// Reducers
const rootReducer = combineReducers({
    employees: employeeReducer,
});

// Store
const SAVED_STATE = localStorage.getItem('store-persistence') as any;
const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
        store => next => action => {
            localStorage.setItem(
                'store-persistence',
                JSON.stringify(store.getState()),
            );
            return next(action);
        }
    ),
    preloadedState: SAVED_STATE
        ? JSON.parse(SAVED_STATE)
        : undefined,
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store;

// React
export const useAppDispatch: () => AppDispatch = useDispatch
