import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FilePicker from '@/src/Components/Filepicker/FilePicker';
import AvatharImage from '@/src/Images/Avatar-Profile.png'
import InputElement from '@/src/Components/InputElement/InputElement';
import Button from '@/src/Components/Button/Button';
import './CustomerProfile.scss'

const initialValues = {
    name: '',
    email: '',
    image: '',
    address: '',
    phone: ''
}


const CustomerProfile = () => {
    const [loading, setLoading] = useState(false);
    const { token } = useSelector(state => state.auth);
    const getProfileRef = useRef();
    const UpdateProfileRef = useRef();


    useEffect(() => {
        if (UpdateProfileRef.current) {
            UpdateProfileRef.current.abort();
        }
        if (getProfileRef.current) {
            getProfileRef.current.abort();
        }
    }, []);


    const handleUpdateProfile = useCallback(async (values) => {
        setLoading(true);
        try {
            if (UpdateProfileRef.current) {
                UpdateProfileRef.current.abort();
            }
            UpdateProfileRef.current = new AbortController();

            const config = {
                headers: {
                    // 'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                signal: UpdateProfileRef.current.signal
            }

            let formData = new FormData();
            formData.append('name', values.name);
            formData.append('email', values.email);
            formData.append('image', values.image || '');

            const response = await axios.post(`${window.base_path}/admin-profile/update`, formData, config);
            const json = response.data;

            if (json.success) {
                toast.success(json?.message || "Profile updated Successfully", {
                    toastId: 'product_id',
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                })
                formikRef.current.setValues({
                    name: values.name || '',
                    email: values.email || '',
                    image: values.image || ''
                });
            }
            else {
                toast.error(json?.message || "somthing went wrong", {
                    toastId: 'product_id',
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
            toast.error(error?.message || "somthing went wrong", {
                toastId: 'product_id',
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
    }, [token]);

    const formik = useFormik({
        initialValues: initialValues,
        // validationSchema: ProfileSchema,
        onSubmit: handleUpdateProfile
    });

    const formikRef = useRef();
    formikRef.current = formik;

    return (
        <div className='cutomer_profile_container container'>
            <h5 class="text-center  fs-3 fw-bold my-4">Profile</h5>
            <div class="d-flex w-100 mt-1">
                <form class="d-flex gap-3 w-75 mx-auto" onSubmit={formik.handleSubmit}>
                    <div class="d-flex align-items-start p-2  justify-content-center">
                        <div className='profile_image_container' >
                            {
                                formik.values.image instanceof File ?
                                    <img
                                        src={URL.createObjectURL(formik.values.image)}
                                        class="rounded-circle bg-secondary border border-light" alt="profile_image"
                                        id="profile_img" /> :

                                    <img
                                        src={`${formik.values.image ? formik.values.image : AvatharImage}`}
                                        class="rounded-circle bg-secondary border border-light" alt="profile_image"
                                        id="profile_img" />
                            }

                            <label for="fileInput" class="bg-warning image_picker_label p-2 px-3 border border-light rounded-circle text-white fs-5">+
                            </label>
                            <FilePicker
                                name="image"
                                className='image_picker'
                                handlePick={files => formik.setFieldValue('image', files[0])}
                                accept='image/*'
                                id='fileInput'
                            />
                        </div>
                    </div>

                    <div class="row ">
                        <div class="mb-3 col-6">
                            <InputElement
                                label={'Name'}
                                type="text"
                                placeholder={"Enter name "}
                                required
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                name='name'
                                autocomplete={'off'}
                                disabled={loading}
                                error={formik.errors.name && formik.touched.name ? formik.errors.name : null}
                            />
                        </div>

                        <div class="mb-3 col-6">
                            <InputElement
                                label={'Email'}
                                type="email"
                                placeholder={"Enter Email"}
                                required
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                name='email'
                                autocomplete={'off'}
                                disabled={loading}
                                error={formik.errors.email && formik.touched.email ? formik.errors.email : null}
                            />
                        </div>
                        <div class="mb-3 col-6">
                            <InputElement
                                label={'Address'}
                                type="text"
                                placeholder={"Enter Address "}
                                required
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                name='address'
                                autocomplete={'off'}
                                disabled={loading}
                                error={formik.errors.address && formik.touched.address ? formik.errors.address : null}
                            />
                        </div>
                        <div class="mb-3 col-6">
                            <InputElement
                                label={'Phone'}
                                type="text"
                                placeholder={"Enter Phone "}
                                required
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                name='phone'
                                autocomplete={'off'}
                                disabled={loading}
                                error={formik.errors.phone && formik.touched.phone ? formik.errors.phone : null}
                            />
                        </div>

                        <div class="d-flex flex-column">
                            <Button className="w-100">Update</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default CustomerProfile
