import Classes from './Fieldset.module.scss'
import React from 'react'

interface FieldsetProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
    legend: string;
}

export function Fieldset({legend, children, ...props}: FieldsetProps) {
    return (
        <fieldset className={Classes.fieldset} {...props}>
            <legend className={Classes.legend}>{legend}</legend>
            {children}
        </fieldset>
    )
}
