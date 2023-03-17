import Classes from './Button.module.scss'
import React from 'react'

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button className={Classes.button} {...props} />
    )
}
