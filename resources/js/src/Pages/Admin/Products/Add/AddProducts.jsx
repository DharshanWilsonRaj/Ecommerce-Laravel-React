import Button from '@/src/Components/Button/Button';
import InputElement from '@/src/Components/InputElement/InputElement';
import axios from 'axios';
import { useFormik } from 'formik'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ProductSchema } from '../Schema/Schema';
import FilePicker from '@/src/Components/Filepicker/FilePicker';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const initialValues = {
    name: '',
    description: '',
    stocks: '',
    price: '',
    image: null,
}

const AddProducts = () => {

    const productStoreRef = useRef();
    const [loading, setLoading] = useState(false);
    const  navigate= useNavigate();

    const { token } = useSelector(state => state.auth)

    useEffect(() => {
        if (productStoreRef.current) {
            productStoreRef.current.abort();
        }
    }, []);

    const handleSumbit = useCallback(async (values) => {
        setLoading(true);
        try {
            if (productStoreRef.current) {
                productStoreRef.current.abort();
            }
            productStoreRef.current = new AbortController();

            const config = {
                headers: {
                    // 'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                signal: productStoreRef.current.signal
            }

            let formData = new FormData();
            formData.append('name', values.name);
            formData.append('description', values.description);
            formData.append('stocks', values.stocks);
            formData.append('price', values.price);
            formData.append('image', values.image);

            const response = await axios.post(`${window.base_path}/product-store`, formData, config);
            const json = response.data;
            if (json.success) {
                toast.success(json?.message || "Product Added Successfully", {
                    toastId: 'product_id',
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                })
                navigate('/admin/products');
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
    }, [navigate, token]);


    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: ProductSchema,
        onSubmit: handleSumbit,
    });

    return (
        <div className='d-flex flex-column align-items-center justify-content-center'>
            <div className='my-5 w-75' >
                <h6 className='fs-4 fw-bold mb-3 text-center'>Add Products</h6>
                <form onSubmit={formik.handleSubmit}>
                    <div className="row row-gap-2">
                        <div className="col-6">
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
                        <div className="col-6">
                            <InputElement
                                label={'Price'}
                                type="number"
                                placeholder={"Enter price"}
                                required
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                name='price'
                                autocomplete={'off'}
                                disabled={loading}
                                error={formik.errors.price && formik.touched.price ? formik.errors.price : null}
                            />
                        </div>
                        <div className="col-12">
                            <InputElement
                                label={'Description'}
                                type="text"
                                placeholder={"Enter description"}
                                required
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                name='description'
                                autocomplete={'off'}
                                disabled={loading}
                                error={formik.errors.description && formik.touched.description ? formik.errors.description : null}
                            />
                        </div>
                        <div className="col">
                            <InputElement
                                label={'Stocks'}
                                type="number"
                                placeholder={"Enter stocks"}
                                required
                                value={formik.values.stocks}
                                onChange={formik.handleChange}
                                name='stocks'
                                autocomplete={'off'}
                                disabled={loading}
                                error={formik.errors.stocks && formik.touched.stocks ? formik.errors.stocks : null}
                            />
                        </div>

                        <div className="col d-flex gap-2 flex-column">
                            <label htmlFor="">Image <span className='text-danger'>*</span></label>
                            <FilePicker
                                name="image"
                                handlePick={files => formik.setFieldValue('image', files[0])}
                                accept='image/*, .pdf, .PDF, .doc, .DOC, .DOCX, .docx'
                            />
                            {formik.errors.image && formik.touched.image ? <span className='text-danger' style={{ fontSize: "12px" }}>{formik.errors.image} </span> : <></>}
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

export default AddProducts
