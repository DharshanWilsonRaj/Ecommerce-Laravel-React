import Button from '@/src/Components/Button/Button';
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';

const initialState = {
    product_id: "",
    product_name: "",
    customer_name: '',
    customer_email: "",
    customer_phone: "",
    customer_address: "",
    order_status: "",
}

const EditOrder = ({ data, show, handleClose }) => {
    const { token } = useSelector(state => state.auth)
    const editOrderRef = useRef();
    const [loading, setLoading] = useState(false);
    const [pageData, setPageData] = useState(initialState);

    useEffect(() => {
        if (editOrderRef.current) {
            editOrderRef.current.abort();
        }
    }, []);

    const getOrdersList = useCallback(async () => {
        setLoading(true);
        try {
            if (editOrderRef.current) {
                editOrderRef.current.abort();
            }
            editOrderRef.current = new AbortController();

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                signal: editOrderRef.current.signal
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

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}

            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditOrder
