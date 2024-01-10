import * as Yup from 'yup';
export const loginSchema = Yup.object().shape({
    email: Yup.string().required('Email field is required').matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
    password: Yup.string().required("Password field is required"),
});
