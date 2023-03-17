import Classes from './Dropdown.module.scss'
import React from 'react'

export type DropdownItem<T extends string | number = string> = {
    name: string;
    value: T;
}

interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    items: DropdownItem[];
    id: string;
}
export function Dropdown({label, items, ...props}: DropdownProps) {
    return (
        <div className={Classes.wrapper}>
            <label htmlFor={props.id}>{label}</label>
            <select {...props}>
                {items.map(item => (
                    <option key={item.value} value={item.value}>{item.name}</option>
                ))}
            </select>
        </div>
    )
}
