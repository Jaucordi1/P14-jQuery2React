import Classes from "./HomePage.module.scss";
import type {IEmployee} from "../../data/models/employee/IEmployee";
import React from "react";
import * as yup from "yup";
import Modal from "react-modal";
import {useAppDispatch} from "../../store";
import {employeeActions} from "../../store/features/employees";
import {Field, Form, Formik, FormikHelpers} from "formik";
import {Title} from "../../components/Title/Title";
import {Dropdown, DropdownItem} from "../../components/forms/Dropdown/Dropdown";
import {TextField} from "../../components/forms/TextField/TextField";
import {Fieldset} from "../../components/forms/Fieldset/Fieldset";
import {Button} from "../../components/Button/Button";
import {DateField} from "../../components/forms/DateField/DateField";
import STATES from "../../assets/states.json";
import DEPARTMENTS from "../../assets/departments.json";

const STATE_ITEMS: DropdownItem[] = STATES.map(state => ({label: state.name, value: state.abbreviation}));
const DEPARTMENTS_ITEMS: DropdownItem[] = DEPARTMENTS.map(department => ({
    label: department.name,
    value: department.abbreviation,
}));

const now = new Date();

const validationSchema = yup.object({
    id: yup.number(),
    personalInformation: yup.object({
        firstname: yup.string().required("Employee first name is mandatory."),
        lastname: yup.string().required("Employee last name is mandatory."),
        address: yup.object({
            street: yup.string().required("Street number and name are mandatory."),
            city: yup.string().required("City is mandatory."),
            state: yup.string()
                .oneOf(STATES.map(state => state.abbreviation).filter(v => v.length > 0))
                .required("State is mandatory."),
            zipcode: yup.string().required("Zip code is mandatory."),
        }).required(),
        birthdate: yup.date().required("Employee birthdate is mandatory.").max(now),
    }).required(),
    startDate: yup.date().required("Employee start date is mandatory."),
    department: yup.string()
        .oneOf(DEPARTMENTS.map(dep => dep.abbreviation).filter(v => v.length > 0))
        .required("Employee department is mandatory."),
});

Modal.setAppElement("#root");
const modalStyles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        overflow: "visible",
    },
};

export default function HomePage() {
    const dispatch = useAppDispatch();
    const [modalOpened, setModalOpened] = React.useState(false);
    const closeModal = () => setModalOpened(false);
    const handleSubmit = async (values: Omit<IEmployee, "id">, formikHelpers: FormikHelpers<Omit<IEmployee, "id">>) => {
        formikHelpers.setSubmitting(true);
        setModalOpened(true);
        await dispatch(employeeActions.CREATE_EMPLOYEE_ACTION(values as Omit<IEmployee, "id">));
        formikHelpers.setSubmitting(false);
    };

    return (
        <main className={Classes.page}>
            <Title type="h1">HRnet</Title>
            <Title type="h2">Create Employee</Title>

            <Formik<Omit<IEmployee, "id">> validationSchema={validationSchema} initialValues={{
                personalInformation: {
                    firstname: "",
                    lastname: "",
                    address: {
                        street: "",
                        city: "",
                        state: "",
                        zipcode: "",
                    },
                    birthdate: now,
                },
                department: "",
                startDate: new Date(),
            }} onSubmit={handleSubmit}>
                {({
                      values,
                      touched,
                      errors,
                      handleChange,
                      setFieldValue,
                      handleSubmit,
                      isValidating,
                      isSubmitting,
                      submitCount,
                      resetForm,
                  }) => {
                    return (
                        <Form className={Classes.form} onSubmit={handleSubmit}>
                            <Modal isOpen={!isValidating && modalOpened} onRequestClose={closeModal}
                                   onAfterClose={resetForm} style={modalStyles}
                                   shouldCloseOnEsc={true} shouldReturnFocusAfterClose={true}
                                   shouldCloseOnOverlayClick={true}>
                                <button onClick={closeModal} className={Classes.modalCloseBtn}>&times;</button>
                                {isSubmitting && "Creating resource…"}
                                {!isSubmitting && "Resource successfully created!"}
                            </Modal>

                            <div id="columns" className={Classes.row}>
                                <Fieldset legend="Address" className={Classes.col}>
                                    <Field as={TextField} name="personalInformation.address.street"
                                           autoComplete="street" label="Street" placeholder="123…" id="street" />

                                    <Field as={TextField} name="personalInformation.address.city" autoComplete="city"
                                           label="City" placeholder="Paris" id="city" />

                                    <Dropdown label="State" options={STATE_ITEMS} id="personalInformation.address.state"
                                              name="personalInformation.address.state" />

                                    <Field as={TextField} name="personalInformation.address.zipcode"
                                           autoComplete="zipcode" label="Zip Code" placeholder="64000" id="zipcode" />
                                </Fieldset>
                                <div className={Classes.col}>
                                    <Fieldset legend="Personal Information">
                                        <Field as={TextField} name="personalInformation.firstname"
                                               autoComplete="firstname" label="First Name" placeholder="John"
                                               id="firstname" />

                                        <Field as={TextField} name="personalInformation.lastname"
                                               autoComplete="lastname" label="Last Name" placeholder="Doe"
                                               id="lastname" />

                                        <Field as={DateField} name="personalInformation.birthdate"
                                               autoComplete="birthdate" label="Date of Birth" id="birthdate" />
                                    </Fieldset>
                                    <Fieldset legend="Job">
                                        <Field as={DateField} name="startDate" label="Start Date" id="startDate" />

                                        <Dropdown label="Department" options={DEPARTMENTS_ITEMS} name="department"
                                                  id="department" />
                                    </Fieldset>
                                </div>
                            </div>

                            <br />

                            <Button type="submit" className={Classes.button}>Save</Button>
                        </Form>
                    );
                }}
            </Formik>
        </main>
    );
}
