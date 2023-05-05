import Classes from "./InputError.module.scss";

export function InputError(props: { error?: string }) {
    const {error} = props;
    return !!error
        ? <div className={Classes.error}>{error}</div>
        : null;
}
