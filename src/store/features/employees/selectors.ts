import type {RootState} from "../../index";
import adapter, {selectEmployeeID} from './adapter';
import mapper from "../../../data/database/mapper/Mapper";
import {deserializeEmployee} from "../../../data/models/employee/IEmployee";

const {selectById, selectAll, selectIds} = adapter.getSelectors();

export const selectEmployees = (state: RootState) => selectAll(state.employees).map(deserializeEmployee).map(mapper.mapEmployee);
export const selectEmployee = (state: RootState, id: ReturnType<typeof selectEmployeeID>) => {
    const found = selectById(state.employees, id);
    return found
        ? mapper.mapEmployee(found)
        : null;
};
export const selectLastID = (state: RootState) => selectIds(state.employees).reduce((last, id) => id > last ? id : last, 0);
