import {lazy, Suspense} from 'react'
import {createBrowserRouter, Outlet, NavLink, NavLinkProps} from 'react-router-dom'
import {Navigation} from "./components/Navigation/Navigation";

const HomePage = lazy(() => import('./pages/home/HomePage'));
const EmployeesPage = lazy(() => import('./pages/employees/EmployeesPage'));

function Root() {
    return (
        <>
            <Navigation />
            <Suspense fallback="">
                <Outlet />
            </Suspense>
        </>
    )
}

interface LinkProps extends NavLinkProps {
    to: '/' | '/employees';
}
export function Link(props: LinkProps) {
    return <NavLink {...props} />
}

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/employees',
                element: <EmployeesPage />,
            },
        ],
    },
])
