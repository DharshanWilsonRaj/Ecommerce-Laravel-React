import * as Yup from 'yup';

export const ProfileSchema = Yup.object().shape({
    email: Yup.string().required('Email field is required').matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
    name: Yup.string().required("Name field is required"),
})
