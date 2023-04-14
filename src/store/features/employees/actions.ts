import type {IEmployee} from "../../../data/models/employee/IEmployee";
import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {selectLastID} from "./selectors";
import {RootState} from "../../index";
import {serializeEmployee} from "../../../data/models/employee/IEmployee";

export const SET_EMPLOYEES_ACTION = createAction('employees/set-all', (newEmployees: IEmployee[], additiveMode: boolean = false) => {
    return {
        payload: {
            additiveMode,
            employees: newEmployees.map(serializeEmployee),
        },
    };
});

export const ADD_EMPLOYEE_ACTION = createAction('employees/add', (newEmployee: IEmployee) => {
    return {
        payload: serializeEmployee(newEmployee),
    };
});

export const FETCH_EMPLOYEES_ACTION = createAsyncThunk('employees/fetch', async (_, thunkAPI) => {
    thunkAPI.dispatch(SET_EMPLOYEES_ACTION([]));
});

export const CREATE_EMPLOYEE_ACTION = createAsyncThunk('employees/create', (employeeData: Omit<IEmployee, 'id'>, thunkAPI) => {
    const lastID = selectLastID(thunkAPI.getState() as RootState)
    const newID = lastID as number + 1;
    thunkAPI.dispatch(ADD_EMPLOYEE_ACTION({...employeeData, id: newID}));
});
