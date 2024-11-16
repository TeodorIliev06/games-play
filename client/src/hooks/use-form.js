import { useState } from "react";

export function useForm(initialValues, submitCallback) {
    const [values, setValues] = useState(initialValues);

    //! Does not support checkboxes
    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    const submitHandler = (e) => {
        e.preventDefault();

        submitCallback(values);
    }

    return {
        values,
        changeHandler,
        submitHandler,
    };
}
