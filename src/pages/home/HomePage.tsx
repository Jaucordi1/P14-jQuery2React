import Classes from './HomePage.module.scss'
import {Dropdown, DropdownItem} from "../../components/Dropdown/Dropdown";
import {Fieldset} from "../../components/forms/Fieldset/Fieldset";
import {Input} from "../../components/forms/Input/Input";
import {Button} from "../../components/Button/Button";
import {Title} from "../../components/Title/Title";
import React from "react";

const STATES: DropdownItem[] = [
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

export default function HomePage() {
    return (
        <main className={Classes.page}>
            <Title type="h1">HRnet</Title>
            <Title type="h2">Create Employee</Title>

            <form action="#" className={Classes.form}>
                <Input id="firstname" label="First Name" type="text" name="firstname" autoComplete="firstname" />
                <Input id="lastname" label="Last Name" type="text" name="lastname" autoComplete="lastname" />
                <Input id="birthdate" label="Date of Birth" type="date" name="birthdate" />
                <Input id="start-date" label="Start Date" type="date" name="start-date" />
                <Fieldset legend="Address">
                    <Input id="street" label="Street" type="text" name="street" autoComplete="street" />
                    <Input id="city" label="City" type="text" name="city" autoComplete="city" />
                    <Dropdown id="state" label="State" name="state" items={STATES} />
                    <Input id="zipcode" label="Zip Code" type="number" name="zipcode" autoComplete="zipcode" min={0} />
                </Fieldset>
                <Dropdown label="Department" items={DEPARTMENTS} id="department" name="department" />

                <Button type="submit" className={Classes.button}>Save</Button>
            </form>
        </main>
    )
}
