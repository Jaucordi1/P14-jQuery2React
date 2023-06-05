import Classes from "./Employees.module.scss";
import {Table} from "smart-react-table";
import {useEmployees} from "../../hooks/useEmployees";
import STATES from "../../assets/states.json";
import DEPARTMENTS from "../../assets/departments.json";

export default function EmployeesPage() {
    const [employees, actions] = useEmployees();
    const displayedEmployees = employees.map(employee => {
        // Employee address state
        const stateAbbr = employee.personalInformation.address.state;
        const state = STATES.find(state => state.abbreviation === stateAbbr);
        const stateName = state ? `(${state.abbreviation}) ${state.name}` : stateAbbr;

        // Employee department
        const departmentAbbr = employee.department;
        const department = DEPARTMENTS.find(department => department.abbreviation === departmentAbbr);
        const departmentName = department ? department.name : departmentAbbr;

        return {
            ...employee,
            department: departmentName,
            personalInformation: {
                ...employee.personalInformation,
                address: {
                    ...employee.personalInformation.address,
                    state: stateName,
                },
            },
        };
    });

    return (
        <main className={Classes.page}>
            <h1>Current Employees</h1>
            <Table lines={displayedEmployees} columns={{
                "personalInformation.firstname": "First Name",
                "personalInformation.lastname": "Last Name",
                startDate: "Start Date",
                department: "Department",
                "personalInformation.birthdate": "Date of Birth",
                "personalInformation.address.street": "Street",
                "personalInformation.address.city": "City",
                "personalInformation.address.state": "State",
                "personalInformation.address.zipcode": "Zip Code",
            }} linesPerPage={10} />
        </main>
    );
}
