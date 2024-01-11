import React from 'react'
import './Products.scss'
import Button from '@/src/Components/Button/Button'
import { Link } from 'react-router-dom'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const Products = () => {
    const pageData = [
        {
            "id": 2,
            "name": "orange cap",
            "description": "orange cap",
            "stocks": 5,
            "price": 54,
            "image": "/product_images/orangeCap.jpeg",
            "created_at": "2024-01-11T12:06:46.000000Z",
            "updated_at": "2024-01-11T12:06:46.000000Z"
        },
        {
            "id": 3,
            "name": "black cap",
            "description": "black cap",
            "stocks": 5,
            "price": 4,
            "image": "/product_images/blackWhiteCap.jpeg",
            "created_at": "2024-01-11T12:08:22.000000Z",
            "updated_at": "2024-01-11T12:08:22.000000Z"
        },
        {
            "id": 4,
            "name": "blue cap",
            "description": "blue cap",
            "stocks": 7,
            "price": 5,
            "image": "/product_images/capBlue.jpeg",
            "created_at": "2024-01-11T12:10:15.000000Z",
            "updated_at": "2024-01-11T12:10:15.000000Z"
        }
    ]

    const imageBodyTemplate = (product) => {
        return <img src={`http://localhost:8000${product.image}`} alt={product.image} className="w-1rem shadow-2 border-round" style={{width:'50px'}} />;
    };
    return (
        <div>
            <div className="d-flex my-2">
                <div className="ms-auto">
                    <Link to={'/admin/products/add'}><Button >Add New</Button></Link>
                </div>
            </div>

            <DataTable value={pageData} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                <Column header="Image" body={imageBodyTemplate} style={{ width: '15%' }}></Column>
                <Column field="name" header="Name" style={{ width: '25%' }}></Column>
                <Column field="description" header="Description" style={{ width: '25%' }}></Column>
                <Column field="stocks" header="Stocks" style={{ width: '25%' }}></Column>
                <Column field="price" header="price" style={{ width: '25%' }}></Column>
                <Column field="" header="Description" style={{ width: '25%' }}></Column>
            </DataTable>
        </div>
    )
}

export default Products
