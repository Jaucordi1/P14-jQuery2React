import Classes from './HomePage.module.scss'
import {Dropdown, DropdownItem} from "../../components/Dropdown/Dropdown";
import {Title} from "../../components/Title/Title";
import {useAppDispatch} from "../../store";
import {employeeActions} from "../../store/features/employees";
import {Formik} from "formik";
import * as yup from 'yup';
import React from "react";
import {Input} from "../../components/forms/Input/Input";
import {Fieldset} from "../../components/forms/Fieldset/Fieldset";
import {Button} from "../../components/Button/Button";
import {IEmployee} from "../../data/models/employee/IEmployee";

const STATES: DropdownItem[] = [
    {
        name: 'Choose a state',
        value: '',
    },
    {
        name: 'Alabama',
        value: 'AL',
    },
]
const DEPARTMENTS: DropdownItem[] = [
    {
        name: 'Sales',
        value: 'sales',
    },
    {
        name: 'Marketing',
        value: 'marketing',
    },
    {
        name: 'Engineering',
        value: 'engineering',
    },
    {
        name: 'Human Resources',
        value: 'hr',
    },
    {
        name: 'Legal',
        value: 'legal',
    },
]

const validationSchema = yup.object({
    id: yup.number(),
    personalInformation: yup.object({
        firstname: yup.string().required('Employee first name is mandatory.'),
        lastname: yup.string().required('Employee last name is mandatory.'),
        address: yup.object({
            street: yup.string().required('Street name and number are mandatory.'),
            city: yup.string().required('City is mandatory.'),
            state: yup.string().oneOf(STATES.map(state => state.value)).required('State is mandatory.'),
            zipcode: yup.string().required('Zipcode is mandatory.'),
        }).required('Employee address is mandatory.'),
        birthdate: yup.date().required('Employee birthdate is mandatory.'),
    }).required('Employee personal information are mandatory.'),
    startDate: yup.date().required('Employee start date is mandatory.'),
    department: yup.string().oneOf(DEPARTMENTS.map(dep => dep.value)).required('Employee first name is mandatory.'),
});

function leadingZero(num: number): string {
    return num < 10 ? `0${num}` : num.toString(10);
}

export default function HomePage() {
    const dispatch = useAppDispatch();
    const dateToString = (date: Date) => date.toLocaleDateString('fr-CA', {year: 'numeric', month: '2-digit', day: '2-digit'})

    return (
        <main className={Classes.page}>
            <Title type="h1">HRnet</Title>
            <Title type="h2">Create Employee</Title>

            <Formik<Omit<IEmployee, 'id'>> validationSchema={validationSchema}
                    initialValues={{
                        personalInformation: {
                            firstname: '',
                            lastname: '',
                            address: {
                                street: '',
                                city: '',
                                state: '',
                                zipcode: '',
                            },
                            birthdate: new Date(),
                        },
                        department: 'sales',
                        startDate: new Date(),
                    }}
                    onSubmit={async (values, formikHelpers) => {
                        formikHelpers.setSubmitting(true);
                        await dispatch(employeeActions.CREATE_EMPLOYEE_ACTION(values));
                        formikHelpers.setSubmitting(false);
                    }}>
                {({values, errors, handleChange, setFieldValue, handleSubmit}) => {
                    if (Object.keys(errors).length > 0) {
                        console.debug('ERRORS :', errors);
                    }
                    return (
                        <form className={Classes.form} onSubmit={handleSubmit}>
                            <Input id="firstname" label="First Name" type="text" name="firstname" autoComplete="firstname"
                                   value={values.personalInformation.firstname}
                                   onChange={event => setFieldValue('personalInformation.firstname', event.target.value)} />
                            <Input id="lastname" label="Last Name" type="text" name="lastname" autoComplete="lastname"
                                   value={values.personalInformation.lastname}
                                   onChange={event => setFieldValue('personalInformation.lastname', event.target.value)} />
                            <Input id="birthdate" label="Date of Birth" type="date" name="birthdate"
                                   value={dateToString(values.personalInformation.birthdate)}
                                   onChange={event => setFieldValue('personalInformation.birthdate', new Date(event.target.value))} />
                            <Input id="start-date" label="Start Date" type="date" name="start-date"
                                   value={dateToString(values.startDate)}
                                   onChange={event => setFieldValue('startDate', new Date(event.target.value))} />
                            <Fieldset legend="Address">
                                <Input id="street" label="Street" type="text" name="street" autoComplete="street"
                                       value={values.personalInformation.address.street}
                                       onChange={event => setFieldValue('personalInformation.address.street', event.target.value)} />
                                <Input id="city" label="City" type="text" name="city" autoComplete="city"
                                       value={values.personalInformation.address.city}
                                       onChange={event => setFieldValue('personalInformation.address.city', event.target.value)} />
                                <Dropdown id="state" label="State" name="state" items={STATES}
                                          value={values.personalInformation.address.state}
                                          onChange={event => setFieldValue('personalInformation.address.state', event.target.value)} />
                                <Input id="zipcode" label="Zip Code" type="number" name="zipcode" autoComplete="zipcode"
                                       min={0} value={values.personalInformation.address.zipcode}
                                       onChange={event => setFieldValue('personalInformation.address.zipcode', event.target.value)} />
                            </Fieldset>
                            <Dropdown label="Department" items={DEPARTMENTS} id="department" name="department"
                                      value={values.department}
                                      onChange={event => setFieldValue('department', event.target.value)} />

                            <Button type="submit" className={Classes.button}>Save</Button>
                        </form>
                    );
                }}
            </Formik>
        </main>
    )
}
