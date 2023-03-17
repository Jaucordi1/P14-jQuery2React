import Classes from './Navigation.module.scss'
import {Link} from "../../Router";

export function Navigation() {
    return (
        <nav className={Classes.nav}>
            <Link to="/">Home</Link>
            <Link to="/employees">View Current Employees</Link>
        </nav>
    )
}
