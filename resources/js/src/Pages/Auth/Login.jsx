import { useFormik } from 'formik';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { loginSchema } from './schema/Schema';
import InputElement from '@/src/Components/InputElement/InputElement';
import Button from '@/src/Components/Button/Button';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAccess, setAuth } from '../../Store/Auth/AuthSlice';
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const initialState = {
    email: "",
    password: '',
};

const Login = () => {

    const [loading, setLoading] = useState(false);
    const formSubmitRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (formSubmitRef.current) {
            formSubmitRef.current.abort();
        }
    }, []);

    const handleSubmit = useCallback(async (values) => {
        setLoading(true);
        try {
            if (formSubmitRef.current) {
                formSubmitRef.current.abort();
            }
            formSubmitRef.current = new AbortController();
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                signal: formSubmitRef.current.signal
            }
            let data = {
                ...values
            }
            const response = await axios.post(`${window.base_path}/login`, data, config);
            const json = response.data;
            if (json.success) {
                dispatch(setAuth({
                    login: true,
                    token: json.token

                }))
                if (json?.role_id === 1) {
                    dispatch(setAccess(json?.role_id));
                    navigate('/admin/dashboard');
                }
                else {
                    navigate('/');
                }
                toast.success('Welcome to E-commerce', {
                    toastId: 'register',
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                })
            }
            else {
                toast.error(json?.error || json?.message || 'something went wrong', {
                    toastId: 'register',
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                })
            }

        } catch (error) {
            toast.error(error?.message || error?.message || 'something went wrong', {
                toastId: 'register',
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            })
            console.log(error.message);
        }
        setLoading(false);
    }, [dispatch, navigate]);


    const formik = useFormik({
        initialValues: initialState,
        validationSchema: loginSchema,
        onSubmit: handleSubmit
    })


    return (
        <div className='d-flex flex-column align-items-center justify-content-center'>
            <div className='my-5' style={{ height: "90vh" }}>
                <h6 className='fs-4 fw-bold mb-3 text-center'>LOGIN</h6>
                <form onSubmit={formik.handleSubmit}>
                    <div className="d-flex flex-column gap-2 ">
                        <div className="col">
                            <InputElement
                                label={'Email'}
                                type="text"
                                placeholder={"Enter email Address"}
                                required
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                name='email'
                                autocomplete={'off'}
                                disabled={loading}
                                error={formik.errors.email && formik.touched.email ? formik.errors.email : null}
                            />
                        </div>
                        <div className="col">
                            <InputElement
                                label={'Password'}
                                type="password"
                                placeholder={"Enter password"}
                                required
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                name='password'
                                autocomplete={'off'}
                                disabled={loading}
                                error={formik.errors.password && formik.touched.password ? formik.errors.password : null}
                            />
                        </div>
                        <div className='my-1'>
                            <Button className="my-button w-100 " type="submit" loading={loading} disabled={loading}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login
