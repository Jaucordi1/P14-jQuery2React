import {createSlice} from "@reduxjs/toolkit";
import adapter from "./adapter";
import * as actions from './actions';

interface EmployeesState {
    loading: boolean;
}
const initialState = adapter.getInitialState<EmployeesState>({
    loading: false,
});

const slice = createSlice({
    name: 'employees',
    initialState,
    reducers: {},
    extraReducers: builder => {
        // Manage local
        builder.addCase(actions.SET_EMPLOYEES_ACTION, (state, action) => {
            if (action.payload.additiveMode) {
                adapter.setMany(state, action.payload.employees);
            } else {
                adapter.setAll(state, action.payload.employees);
            }
        });
        builder.addCase(actions.ADD_EMPLOYEE_ACTION, (state, action) => {
            adapter.addOne(state, action.payload);
        });

        // Manage ASYNC
        builder
            .addCase(actions.FETCH_EMPLOYEES_ACTION.pending, state => {
                state.loading = true;
            })
            .addCase(actions.FETCH_EMPLOYEES_ACTION.fulfilled, state => {
                state.loading = false;
            })
            .addCase(actions.FETCH_EMPLOYEES_ACTION.rejected, state => {
                state.loading = false;
            });
        builder
            .addCase(actions.CREATE_EMPLOYEE_ACTION.pending, state => {
                state.loading = true;
            })
            .addCase(actions.CREATE_EMPLOYEE_ACTION.fulfilled, state => {
                state.loading = false;
            })
            .addCase(actions.CREATE_EMPLOYEE_ACTION.rejected, state => {
                state.loading = false;
            });
    },
});

export default slice.reducer;
