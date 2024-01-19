import React, { useCallback, useEffect, useRef, useState } from 'react'
import './Products.scss'
import Button from '@/src/Components/Button/Button'
import { Link } from 'react-router-dom'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const Products = () => {
    const { token } = useSelector(state => state.auth);
    const [pageData, setPageData] = useState([]);
    const [loading, setloading] = useState(false);
    const getDataRef = useRef();
    const deleteProductRef = useRef();


    useEffect(() => {
        if (getDataRef.current) {
            getDataRef.current.abort();
        }
        if (deleteProductRef.current) {
            deleteProductRef.current.abort();
        }
    }, [])

    const getData = useCallback(async () => {
        setloading(true);
        try {
            if (getDataRef.current) {
                getDataRef.current.abort();
            }

            getDataRef.current = new AbortController();

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                signal: getDataRef.current.signal
            }

            const response = await axios.get(`${window.base_path}/product-index`, config);
            const json = response.data;
            if (json.success) {
                setPageData(json?.data || [])
            }
        } catch (error) {
            console.log(error.message);
        }
        setloading(false);
    }, [token]);


    useEffect(() => {
        getData();
    }, [getData]);

    const handleProductDelete = useCallback(async (id) => {

        try {
            const result = await Swal.fire({
                text: "Are you sure you want to delete this product?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, I am sure!',
                cancelButtonText: "No, cancel it!",
            })

            if (result.isDismissed) {
                return;
            }
            if (deleteProductRef.current) {
                deleteProductRef.current.abort();
            }

            deleteProductRef.current = new AbortController();
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                signal: deleteProductRef.current.signal
            }

            const response = await axios.post(`${window.base_path}/product/delete/${id}`, {}, config);
            const json = response.data;
            if (json.success) {
                toast.success(json?.message || "Product deleted Successfully", {
                    toastId: 'product_id',
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                })
                await getData();
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
        }


    }, [getData, token])



    const imageBodyTemplate = (product) => {
        return <img src={`http://localhost:8000${product.image}`} alt={product.image} className="w-2rem  rounded " style={{ width: '50px' }} />;
    };
    // /product/delete/{id}
    const actionTemplate = (product) => {
        return (<div className='d-flex gap-1'>
            <Link to={`edit/${product.id}`}><Button className="bg-secondary btn-sm border-0">Edit</Button></Link>
            <Button className="bg-danger btn-sm border-0" onClick={() => handleProductDelete(product.id)}>Delete</Button>
        </div>
        )
    };
    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };
    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };


    return (
        <div>
            <div className="d-flex my-2">
                <h6 className='fs-4 fw-bold'>Products</h6>
                <div className="ms-auto">
                    <Link to={'/admin/products/add'}><Button >Add New</Button></Link>
                </div>
            </div>

            <DataTable value={pageData} paginator sortMode="multiple" loading={loading} rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem', }}>
                <Column header="Image" body={imageBodyTemplate} style={{ width: '15%' }}></Column>
                <Column field="name" sortable header="Name" style={{ width: '25%' }}></Column>
                <Column field="description" header="Description" style={{ width: '25%' }}></Column>
                <Column field="stocks" sortable header="Stocks" style={{ width: '25%' }}></Column>
                <Column field="price" sortable header="$ price" body={priceBodyTemplate} style={{ width: '25%' }}></Column>
                <Column header="Actions" body={actionTemplate} style={{ width: '25%' }}></Column>
            </DataTable>
        </div>
    )
}

export default Products
