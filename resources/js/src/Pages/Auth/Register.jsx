import React, { useCallback, useEffect, useRef, useState } from 'react'
import InputElement from '../../Components/InputElement/InputElement';
import { useFormik } from 'formik';
import { registerSchema } from './schema/Schema';
import Button from '../../Components/Button/Button';
import axios from 'axios';
import { toast } from 'react-toastify';


const initialState = {
    name: "",
    email: "",
    password: '',
    address: '',
    phone: '',
};

const Register = () => {

    const [loading, setLoading] = useState(false);
    const formSubmitRef = useRef();


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
                    // 'Authorization': `Bearer ${token}`
                },
                signal: formSubmitRef.current.signal
            }
            const data = { ...values };
            const response = await axios.post(`${window.base_path}/register`, data, config);
            const json = response.data;
            if (json.success) {
                toast.success('Successfully registered', {
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
        }
        setLoading(false);
    }, []);

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: registerSchema,
        onSubmit: handleSubmit
    });

    return (
        <div className='d-flex flex-column align-items-center justify-content-center'>
            <div className='my-5 w-50'>
                <h6 className='fs-4 fw-bold mb-3 text-center'>REGISTER</h6>
                <form className='w-100' onSubmit={formik.handleSubmit}>
                    <div className="w-100 row row-gap-2 ">
                        <div className="col-12">
                            <InputElement
                                label={'Name'}
                                type="text"
                                placeholder={"Enter Name"}
                                required
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                name='name'
                                // autoComplete={'off'}
                                disabled={loading}
                                error={formik.errors.name && formik.touched.name ? formik.errors.name : null}
                            />
                        </div>
                        <div className="col-6">
                            <InputElement
                                label={'Email'}
                                type="email"
                                placeholder={"Enter email Address"}
                                required
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                name='email'
                                // autoComplete={'off'}
                                disabled={loading}
                                error={formik.errors.email && formik.touched.email ? formik.errors.email : null}
                            />
                        </div>
                        <div className="col-6">
                            <InputElement
                                label={'Password'}
                                type="password"
                                placeholder={"Enter password"}
                                required
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                name='password'
                                autoComplete={'off'}
                                disabled={loading}
                                error={formik.errors.password && formik.touched.password ? formik.errors.password : null}
                            />
                        </div>
                        <div className="col-6">
                            <InputElement
                                label={'Address'}
                                type="textarea"
                                placeholder={"Enter Address"}
                                required
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                name='address'
                                // autoComplete={'off'}
                                disabled={loading}
                                rows={1}
                                error={formik.errors.address && formik.touched.address ? formik.errors.address : null}
                            />
                        </div>
                        <div className="col-6">
                            <InputElement
                                label={'Phone'}
                                type="number"
                                placeholder={"Enter phone"}
                                required
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                name='phone'
                                // autoComplete={'off'}
                                disabled={loading}
                                error={formik.errors.phone && formik.touched.phone ? formik.errors.phone : null}
                            />
                        </div>
                        <div className='my-2'>
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

export default Register
