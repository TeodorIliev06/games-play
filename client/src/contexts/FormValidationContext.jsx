import { createContext, useContext } from "react";

export const FormValidationContext = createContext();

export function FormValidationContextProvider(props) {
    const validationRules = {
        title: { required: true, minLength: 3 },
        category: { required: true },
        maxLevel: { required: true, minLength: 1 },
        imageUrl: { required: false },
        summary: { required: true, minLength: 5 },
    };

    return (
        <FormValidationContext.Provider value={validationRules}>
            {props.children}
        </FormValidationContext.Provider>
    );
}

export function useFormValidationContext() {
    const formData = useContext(FormValidationContext);

    return formData;
}
