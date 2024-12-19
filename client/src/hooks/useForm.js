import { useEffect, useState } from "react";

import { useFormValidationContext } from "../contexts/FormValidationContext";

export function useForm(initialValues, submitCallback) {
	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState({});

	const validationRules = useFormValidationContext();

	const validate = () => {
		const newErrors = {};
		for (const key in validationRules) {
			const rules = validationRules[key];
			const value = values[key] || '';

			if (rules.required && !value) {
				newErrors[key] = `${key} is required`;
			} else if (rules.minLength && value.length < rules.minLength) {
				newErrors[key] = `${key} must be at least ${rules.minLength} characters`;
			} else if (rules.maxLength && value.length > rules.maxLength) {
				newErrors[key] = `${key} must not exceed ${rules.maxLength} characters`;
			} else if (rules.pattern && !rules.pattern.test(value)) {
				newErrors[key] = `${key} is invalid`;
			}
		}
		return newErrors;
	};

	// Reinitialise from values
	useEffect(() => {
		setValues(initialValues)
	}, [initialValues]);

	// TODO: add support for check boxes
	const changeHandler = (e) => {
		setValues((state) => ({
			...state,
			[e.target.name]: e.target.value,
		}));

		setErrors((state) => ({
			...state,
			[e.target.name]: '',
		}));
	};
	
	const submitHandler = async (e) => {
		e.preventDefault();

		const newErrors = validate();
		setErrors(newErrors);

		if (Object.keys(newErrors).length > 0) {
			return;
		}

		await submitCallback(values);
		setValues(initialValues);
	};

	return {
		values,
		changeHandler,
		submitHandler,
		errors,
	};
}
