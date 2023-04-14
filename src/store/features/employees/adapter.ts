import type {IEmployeeSerialized} from "../../../data/models/employee/IEmployee";
import {createEntityAdapter} from "@reduxjs/toolkit";

export function selectEmployeeID(employee: IEmployeeSerialized): number {
    return employee.id;
}

export function employeeSortComparer(a: IEmployeeSerialized, b: IEmployeeSerialized): number {
    if (a.personalInformation.lastname < b.personalInformation.lastname) return -1;
    if (a.personalInformation.lastname > b.personalInformation.lastname) return 1;

    if (a.personalInformation.firstname < b.personalInformation.firstname) return -1;
    if (a.personalInformation.firstname > b.personalInformation.firstname) return 1;

    if (a.startDate < b.startDate) return -1;
    return Number(a.startDate > b.startDate);
}

export default createEntityAdapter<IEmployeeSerialized>({
    selectId: selectEmployeeID,
    sortComparer: employeeSortComparer,
});
