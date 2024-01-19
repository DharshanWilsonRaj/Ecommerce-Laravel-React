import * as Yup from 'yup';
export const registerSchema = Yup.object().shape({
    email: Yup.string().required('Email field is required').matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
    password: Yup.string().required("Password field is required"),
    name: Yup.string().required("name field is required"),
    address: Yup.string().required("address field is required"),
    phone: Yup.number().required('Phone number is required').typeError('Please enter a valid phone number')
});
