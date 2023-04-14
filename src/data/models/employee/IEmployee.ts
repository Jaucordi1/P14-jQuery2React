import type {IAddress} from "../address/IAddress";
import type {DepartmentType} from "./DepartmentType";

export interface IPersonalInformation {
    firstname: string;
    lastname: string;
    birthdate: Date;
    address: IAddress;
}

export interface IPersonalInformationSerialized extends Omit<IPersonalInformation, 'birthdate'> {
    birthdate: number;
}

export interface IEmployee {
    id: number;
    personalInformation: IPersonalInformation;
    department: DepartmentType;
    startDate: Date;
}

export interface IEmployeeSerialized extends Omit<IEmployee, 'startDate' | 'personalInformation'> {
    startDate: number;
    personalInformation: IPersonalInformationSerialized;
}

export function serializeEmployee(employee: IEmployee): IEmployeeSerialized {
    return {
        id: employee.id,
        personalInformation: {
            firstname: employee.personalInformation.firstname,
            lastname: employee.personalInformation.lastname,
            birthdate: employee.personalInformation.birthdate.getTime(),
            address: employee.personalInformation.address,
        },
        startDate: employee.startDate.getTime(),
        department: employee.department,
    };
}

export function deserializeEmployee(employee: IEmployeeSerialized): IEmployee {
    return {
        id: employee.id,
        personalInformation: {
            firstname: employee.personalInformation.firstname,
            lastname: employee.personalInformation.lastname,
            birthdate: new Date(employee.personalInformation.birthdate),
            address: employee.personalInformation.address,
        },
        startDate: new Date(employee.startDate),
        department: employee.department,
    };
}