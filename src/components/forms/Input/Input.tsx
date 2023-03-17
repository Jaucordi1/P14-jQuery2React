import Classes from './Input.module.scss'
import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
}
export function Input({label, ...props}: InputProps) {
    return (
        <div className={Classes.wrapper}>
            <label htmlFor={props.id}>{label}</label>
            <input {...props} />
        </div>
    )
}
