import Button from '@/src/Components/Button/Button'
import axios from 'axios'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import EditOrder from './Edit/EditOrder'

const Orders = () => {
    const { token } = useSelector(state => state.auth);
    const [pageData, setPageData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openEditModel, setopenEditModel] = useState(null);

    const getOrdersListRef = useRef();
    const editOrderRef = useRef();

    useEffect(() => {
        if (getOrdersListRef.current) {
            getOrdersListRef.current.abort();
        }
        if (editOrderRef.current) {
            editOrderRef.current.abort();
        }
    }, [])



    const getOrdersList = useCallback(async () => {
        setLoading(true);
        try {
            if (getOrdersListRef.current) {
                getOrdersListRef.current.abort();
            }
            getOrdersListRef.current = new AbortController();

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                signal: getOrdersListRef.current.signal
            }

            const response = await axios.get(`${window.base_path}/order-index`, config);
            const json = response.data;
            if (json.success) {
                setPageData(json?.data || [])
            }
        } catch (error) {
            console.log(error.message);
        }
        setLoading(false);
    }, [token]);


    useEffect(() => {
        getOrdersList();
    }, [getOrdersList])


    const handleEditOrderOpen = useCallback(async (id) => {
        setopenEditModel(id)
    }, []);

    const handleEditOrderClose = useCallback(async () => {
        setopenEditModel(null)
    }, []);



    // templates
    const imageBodyTemplate = (rowData) => {
        return <img src={`http://localhost:8000${rowData?.product_details.image}`} alt={rowData?.product_details.image} className="w-2rem  rounded " style={{ width: '50px' }} />;
    };

    const customerNameTemplate = (rowData) => {
        return <>{rowData?.customer_details?.name}</>
    }

    const productNameTemplate = (rowdata) => {
        return <>{rowdata?.product_details?.name || ""}</>
    }

    const addressTemplate = (rowdata) => {
        return <>{rowdata?.customer_details?.address || ""}</>
    }

    const formatCurrency = (value) => {
        return parseInt(value).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.amount);
    };

    const actionTemplate = (rowData) => {
        return (<div className='d-flex gap-1'>
            <Button className="bg-secondary btn-sm border-0" onClick={() => handleEditOrderOpen(rowData.id)}>View</Button>
        </div>
        )
    };

    const statusTemplate = (product) => {
        return parseInt(product.status) === 1 ? <span className='badge rounded bg-warning p-2'>Shipped</span> :
            parseInt(product.status) === 2 ? <span className='badge rounded bg-success  p-2'>Delivered</span> :
                parseInt(product.status) === 3 ? <span className='badge rounded bg-danger p-2 '> Cancelled</span> :
                    <span className='badge rounded bg-info p-2 '> New</span>
    }


    return (
        <div>
            <h6 className='fs-4 my-3 fw-bold'>Orders</h6>
            <DataTable value={pageData} paginator sortMode="multiple" rows={5} loading={loading} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem', }} >
                <Column header="Image" body={imageBodyTemplate} style={{ width: '10%' }}></Column>
                <Column sortable header="product " body={productNameTemplate} style={{ width: '20%' }}></Column>
                <Column sortable header="Customer " body={customerNameTemplate} style={{ width: '20%' }}></Column>
                <Column header="Address" body={addressTemplate} style={{ width: '20%' }}></Column>
                <Column field="price" sortable header="$ Price" body={priceBodyTemplate} style={{ width: '15%' }}></Column>
                <Column field="status" sortable header="Status" body={statusTemplate} style={{ width: '15%' }}></Column>
                <Column header="Actions" body={actionTemplate} style={{ width: '15%' }}></Column>
            </DataTable>


            {
                openEditModel && <EditOrder show={openEditModel ? true : false} data={openEditModel} handleClose={handleEditOrderClose} />
            }
        </div>
    )
}

export default Orders
