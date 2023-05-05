import TextFieldClasses from "../TextField/TextField.module.scss";
import Classes from "./Dropdown.module.scss";
import React from "react";
import {ErrorMessage, useFormikContext} from "formik";
import classNames from "classnames";
import Select from "react-select";
import {StateManagerProps} from "react-select/dist/declarations/src/useStateManager";
import {InputError} from "../InputError/InputError";

export type DropdownItem<T extends string | number = string> = {
    label: string;
    value: T;
}

type GroupedDropdownItems<T extends string | number = string> = {
    label: string;
    options: DropdownItem<T>[];
}

type Props<T extends string | number = string> = {
    label: string;
    name: string;
} & Omit<
    StateManagerProps<DropdownItem<T>, false | true, GroupedDropdownItems<T>>,
    "value" | "onChange"
>;

export function Dropdown<Option extends string | number>(props: Props<Option>) {
    const {label, ...restProps} = props;
    const {setFieldValue, getFieldMeta, getFieldProps} = useFormikContext();
    const field = getFieldProps(props);
    const meta = getFieldMeta(props.name);

    const flattenedOptions = props.options?.flatMap((o) => {
        const isNotGrouped = "value" in o;
        if (isNotGrouped) {
            return o;
        } else {
            return o.options;
        }
    });

    const value = flattenedOptions?.filter((o) => {
        const isArrayValue = Array.isArray(field.value);

        if (isArrayValue) {
            const values = field.value as Array<any>;
            return values.includes(o.value);
        } else {
            return field.value === o.value;
        }
    });

    console.debug(meta.touched, !!meta.error, meta.error);
    return (
        <div className={TextFieldClasses.wrapper}>
            <label htmlFor={props.id}>{label}</label>
            <Select {...restProps} {...field} value={value} onChange={val => {
                const _val = val as DropdownItem<Option>[] | DropdownItem<Option>;
                const isArray = Array.isArray(_val);
                if (isArray) {
                    const values = _val.map((o) => o.value);
                    setFieldValue(props.name, values);
                } else {
                    setFieldValue(props.name, _val.value);
                }
            }} classNames={{
                control: p => classNames(TextFieldClasses.input, Classes.input, {
                    [TextFieldClasses.error]: !!meta.error,
                }),
            }} onBlur={field.onBlur} />
            <ErrorMessage name={props.name} className={TextFieldClasses.error}
                          render={error => <InputError error={error} />} />
        </div>
    );
    /*return (
        <div className={Classes.wrapper}>
            <label htmlFor={props.id}>{label}</label>
            <Select {...field} {...props} className={classNames(Classes.select, Classes.input, {
                [Classes.error]: meta.touched && !!meta.error,
            })} />
        </div>
    );*/
    /*return (
        <div className={Classes.wrapper}>
            <label htmlFor={props.id}>{label}</label>
            <select {...field} className={classNames(Classes.select, Classes.input, {
                [Classes.error]: meta.touched && !!meta.error,
            })}>
                {items.map(item => (
                    <option key={item.value} value={item.value}>{item.name}</option>
                ))}
            </select>
            <ErrorMessage name={props.name} className={Classes.error} render={error => <InputError error={error} /> } />
        </div>
    )*/
}
