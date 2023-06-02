import Classes from './Employees.module.scss'
import {Table} from "smart-react-table";
import {useEmployees} from "../../hooks/useEmployees";

export default function EmployeesPage() {
    const [employees, actions] = useEmployees();

    return (
        <main className={Classes.page}>
            <h1>Current Employees</h1>
            <Table lines={employees} columns={{
                'personalInformation.firstname': 'First Name',
                'personalInformation.lastname': 'Last Name',
                startDate: 'Start Date',
                department: 'Department',
                'personalInformation.birthdate': 'Date of Birth',
                'personalInformation.address.street': 'Street',
                'personalInformation.address.city': 'City',
                'personalInformation.address.state': 'State',
                'personalInformation.address.zipcode': 'Zip Code',
            }} />
        </main>
    )
}
