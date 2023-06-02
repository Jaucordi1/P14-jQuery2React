import Classes from "../TextField/TextField.module.scss";
import React from "react";
import {ErrorMessage, FieldHookConfig, useField} from "formik";
import classNames from "classnames";
import {InputError} from "../InputError/InputError";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateField {
    label?: string;
    value: Date;
    onChange: (newValue: string) => Date;
}

export function DateField<P extends FieldHookConfig<Date>>(props: P & DateField) {
    const {label} = props;
    const [field, meta, helpers] = useField(props);
    const dateToString = (date: Date) => date.toLocaleDateString("fr-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
    const handleChange = (date: Date | null) => {
        if (date) {
            helpers.setValue(date, true);
        }
    };

    return (
        <div className={Classes.wrapper}>
            {label && <label htmlFor={props.id}>{label}</label>}
            <DatePicker selected={field.value}
                        dateFormat="yyyy-MM-dd"
                        closeOnScroll
                        onChange={handleChange}
                        className={classNames(Classes.input, {
                            [Classes.error]: meta.touched && !!meta.error,
                        })}
                        autoComplete={props.autoComplete}
                        id={props.id}
            />
            {/*<input {...field} type="date" name={props.name} id={props.id} placeholder={props.placeholder}
                   autoComplete={props.autoComplete} className={classNames(Classes.input, {
                [Classes.error]: meta.touched && !!meta.error,
            })}
                   value={dateToString(field.value)}
                   onChange={handleChange}
                   max={props.max}
                   value={dateToString(field.value)}
                   onChange={({target: {value}}) => {
                       console.debug(value);
                       if (value) {
                           helpers.setValue(new Date(value), true)
                       }
                   }}
            />*/}
            <ErrorMessage name={props.name} render={error => <InputError error={error} />} />
        </div>
    );
}
