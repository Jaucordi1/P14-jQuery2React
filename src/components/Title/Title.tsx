import Classes from './Title.module.scss'
import React from 'react'

interface TitleProps {
    type: 'h1' | 'h2' | 'h3';
    children: React.ReactNode;
}

export function Title({type, children}: TitleProps) {
    switch (type) {
        case "h1":
            return <h1 className={Classes.h1}>{children}</h1>
        case "h2":
            return <h2 className={Classes.h2}>{children}</h2>
        case "h3":
            return <h3 className={Classes.h3}>{children}</h3>
    }
}
