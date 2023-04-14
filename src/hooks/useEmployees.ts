import {useAppSelector} from "./useStore";
import {employeeSelectors, employeeActions} from "../store/features/employees";

export function useEmployees() {
    const employees = useAppSelector(employeeSelectors.selectEmployees);
    return [employees, employeeActions] as const;
}
