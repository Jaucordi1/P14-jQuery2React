import Classes from "./TextField.module.scss";
import React from "react";
import classNames from "classnames";
import {ErrorMessage, FieldHookConfig, useField} from "formik";
import {InputError} from "../InputError/InputError";

interface InputProps {
    label?: string;
}

export function TextField<T extends React.InputHTMLAttributes<HTMLInputElement>["value"], P extends FieldHookConfig<T>>(props: P & InputProps) {
    const {label} = props;
    const [field, meta, helpers] = useField(props);
    return (
        <div className={Classes.wrapper}>
            {label && <label htmlFor={props.id}>{label}</label>}
            <input {...field} type={props.type} placeholder={props.placeholder} name={props.name} id={props.id}
                   autoComplete={props.autoComplete}
                   className={classNames(Classes.input, props.className, {
                       [Classes.error]: meta.touched && !!meta.error,
                   })} />
            <ErrorMessage name={props.name} className={Classes.error} render={error => <InputError error={error} /> } />
        </div>
    );
}
