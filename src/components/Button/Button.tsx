import Classes from './Button.module.scss'
import React from 'react'
import classNames from "classnames";

export function Button({className, ...props}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button {...props} className={classNames(Classes.button, className)} />
    )
}
