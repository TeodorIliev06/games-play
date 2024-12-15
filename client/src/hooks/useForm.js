import { useEffect, useState } from "react";
export function useForm(initialValues, submitCallback) {
	const [values, setValues] = useState(initialValues);

	// might remove this
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
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		
		await submitCallback(values);

		setValues(initialValues);
	};
	return {
		values,
		changeHandler,
		submitHandler,
	};
}
// //with FORM VALIDATION 100% workin
// export function useForm(initialValues, submitCallback) {
//   const [values, setValues] = useState(initialValues);
//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const newErrors = {};
//     for (const key in values) {
//       if (!values[key]) {
//         newErrors[key] = `${key} is required`;
//       }
//     }
//     return newErrors;
//   };

//   const changeHandler = (e) => {
//     setValues((state) => ({
//       ...state,
//       [e.target.name]: e.target.value,
//     }));

//     // Clear the error for this field if it was set
//     setErrors((state) => ({
//       ...state,
//       [e.target.name]: '',
//     }));
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();
//     const newErrors = validate();
//     if (Object.keys(newErrors).length === 0) {
//       submitCallback(values);
//       setValues(initialValues);  // Reset form values after successful submission
//     } else {
//       setErrors(newErrors);
//     }
//   };

//   return {
//     values,
//     changeHandler,
//     submitHandler,
//     errors,
//   };
// }
