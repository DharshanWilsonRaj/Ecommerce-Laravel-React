import React from 'react'
import './Products.scss'
import Button from '@/src/Components/Button/Button'
import { Link } from 'react-router-dom'

const Products = () => {
    return (
        <div>
            <div className="d-flex my-2">
                <div className="ms-auto">
                    <Link to={'/admin/products/add'}><Button >Add New</Button></Link>
                </div>
            </div>
        </div>
    )
}

export default Products
