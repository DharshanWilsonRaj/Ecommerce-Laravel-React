import Button from '@/src/Components/Button/Button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React from 'react'
import { Link } from 'react-router-dom'

const Orders = () => {

    const pageData = [
        {
            id: '1234',
            name: "black cap",
            image: '/product_images/blackWhiteCap.jpeg',
            address: "vellore road 634",
            price: '4',
            status: '2',
        },
        {
            id: '2334',
            name: "cap red",
            image: '/product_images/capRed.jpeg',
            address: "cengallpat 12e chaeram",
            price: '45',
            status: '1',
        },
        {
            id: '5211',
            name: "orange cap",
            image: '/product_images/orangeCap.jpeg',
            address: "vellore road 634",
            price: '23',
            status: '2',
        },
        {
            id: '6271',
            name: "black White Cap",
            image: '/product_images/blackWhiteCap.jpeg',
            address: "perungaluthor road tambaram",
            price: '15',
            status: '3',
        },
        {
            id: '3212',
            name: "cyan cap",
            image: '/product_images/capCyan.jpeg',
            address: "pondicherrry pallavaram bridge",
            price: '89',
            status: '1',
        },
        {
            id: '4309',
            name: "cap blue",
            image: '/product_images/capBlue.jpeg',
            address: "Thirvuallur",
            price: 98,
            status: '1',
        },
    ]

    const imageBodyTemplate = (product) => {
        return <img src={`http://localhost:8000${product.image}`} alt={product.image} className="w-2rem shadow rounded " style={{ width: '50px' }} />;
    };
    const formatCurrency = (value) => {

        return parseInt(value).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };
    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };
    const actionTemplate = (product) => {
        return (<div className='d-flex gap-1'>
            <Link><Button className="bg-secondary btn-sm border-0">Edit</Button></Link>
        </div>
        )
    };
    const statusTemplate = (product) => {
        return parseInt(product.status) === 1 ? <span className='badge rounded bg-primary p-2'>Shipped</span> :
            parseInt(product.status) === 2 ? <span className='badge rounded bg-success  p-2'>Delivered</span> :
                <span className='badge rounded bg-danger p-2 '> Cancelled</span>
    }

    return (
        <div>
            <DataTable value={pageData} paginator sortMode="multiple" rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem', }}>
                <Column header="Image" body={imageBodyTemplate} style={{ width: '15%' }}></Column>
                <Column field="name" sortable header="Name" style={{ width: '25%' }}></Column>
                <Column field="address" header="Address" style={{ width: '35%' }}></Column>
                <Column field="price" sortable header="$ Price" body={priceBodyTemplate} style={{ width: '25%' }}></Column>
                <Column field="status" sortable header="Status" body={statusTemplate} style={{ width: '25%' }}></Column>
                <Column header="Actions" body={actionTemplate} style={{ width: '15%' }}></Column>
            </DataTable>
        </div>
    )
}

export default Orders
