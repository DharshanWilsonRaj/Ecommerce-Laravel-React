import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import Button from '@/src/Components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const intialcost = {
    subtotal: 0,
    shippingcost: 15,
    totalCost: 15
}
const Cart = () => {

    const { isLoggedIn, token } = useSelector(state => state.auth);
    const [loading, setLoading] = useState(false);
    const [pageData, setPageData] = useState([]);
    const [totalCost, setTotalCost] = useState(intialcost);
    const navigate = useNavigate();

    const getCartRef = useRef();
    const updateQuantityRef = useRef();
    const removeCartItemRef = useRef();

    const getCartProduct = useCallback(async () => {
        setLoading(true);
        try {

            if (getCartRef.current) {
                getCartRef.current.abort();
            }
            getCartRef.current = new AbortController();
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                signal: getCartRef.current.signal
            }
            if (!isLoggedIn) {
                const cartProducts = JSON.parse(localStorage.getItem("cart_product")) || [];
                setPageData(cartProducts || []);
            }

            else {
                const response = await axios.get(`${window.base_path}/viewCart`, config);
                const json = response.data;
                if (json?.success) {
                    setPageData(json?.data || []);
                }
            }

        } catch (error) {
            console.log(error.message);
        }
        setLoading(false);
    }, [isLoggedIn, token]);

    useEffect(() => {
        getCartProduct();
    }, [getCartProduct])


    const handleQuantity = useCallback(async (type, id) => {
        try {
            if (updateQuantityRef.current) {
                updateQuantityRef.current.abort();
            }
            updateQuantityRef.current = new AbortController();
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                signal: updateQuantityRef.current.signal
            }
            if (!isLoggedIn) {
                setPageData(prevPageData => {
                    const productIndex = prevPageData.findIndex(curr => curr.id === id);
                    if (productIndex !== -1) {
                        if (type === 'minus' && prevPageData[productIndex].quantity > 0) {
                            prevPageData[productIndex].quantity -= 1;
                            prevPageData[productIndex].subtotal -= prevPageData[productIndex].price;
                        } else {
                            prevPageData[productIndex].quantity += 1;
                            prevPageData[productIndex].subtotal += prevPageData[productIndex].price;
                        }
                    }
                    localStorage.setItem("cart_product", JSON.stringify(prevPageData));
                    return [...prevPageData];
                });
            }
            const response = await axios.post(`${window.base_path}/updateCart/${type}/${id}`, {}, config);
            const json = response?.data;
            if (json?.success) {
                setPageData(prevPageData => {
                    const productIndex = prevPageData.findIndex(curr => curr.id === id);
                    if (productIndex !== -1) {
                        if (type === 'minus' && prevPageData[productIndex].quantity > 0) {
                            prevPageData[productIndex].quantity -= 1;
                            prevPageData[productIndex].subtotal -= prevPageData[productIndex].price;
                        } else {
                            prevPageData[productIndex].quantity += 1;
                            prevPageData[productIndex].subtotal += prevPageData[productIndex].price;
                        }
                    }
                    return [...prevPageData];
                });
            }
        } catch (error) {
            console.log(error.message);
        }
    }, [isLoggedIn, token]);


    useEffect(() => {
        const totalProductsCost = pageData.reduce((acc, curr) => {
            return acc + curr.subtotal;
        }, 0);

        setTotalCost((prevTotalCost) => ({
            ...prevTotalCost,
            subtotal: totalProductsCost,
            totalCost: totalProductsCost + prevTotalCost.shippingcost
        }));
    }, [pageData])


    const handleRemoveItem = useCallback(async (id) => {
        try {

            if (removeCartItemRef.current) {
                removeCartItemRef.current.abort();
            }
            removeCartItemRef.current = new AbortController();
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                signal: removeCartItemRef.current.signal
            }

            if (!isLoggedIn) {
                setPageData(prevPageData => {
                    const selectedProduct = prevPageData.filter(curr => curr.id !== id);
                    localStorage.setItem("cart_product", JSON.stringify(selectedProduct));
                    return selectedProduct;
                });
            }
            else {
                const response = await axios.post(`${window.base_path}/remove-cart-item/${id}`, {}, config);
                const json = response?.data;
                if (json?.success) {
                    getCartProduct();
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }, [getCartProduct, isLoggedIn, token])



    const handleCheckOut = useCallback(async () => {
        if (isLoggedIn) {
            navigate('/checkout')
        }
        else {
            navigate('/login')
        }
    }, [isLoggedIn, navigate]);


    return (
        <div className='container'>
            <div className="my-3 row  my-4">
                <div className={`  ${!!pageData?.length ? "col-9" : 'col-12'}`}>
                    <div className='border p-2 shadow-sm rounded'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th >Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Subtotal</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {!!pageData?.length > 0 && pageData?.map((curr, idx) =>
                                    <tr className="align-middle" key={idx}>
                                        <td style={{ width: "25%" }}>
                                            <img src={curr.image} alt="" width={"40px"} />
                                            <span className='mx-1 ' style={{ fontSize: "13px" }}>{curr.name || curr.product_name}</span></td>
                                        <td>${curr.price}</td>
                                        <td>
                                            <button className={`px-2 btn border me-2  ${curr.quantity === 1 && "disabled"}`} style={{ cursor: curr.quantity === 1 && "not-allowed" }} disabled={curr.quantity === 1 && true} onClick={() => handleQuantity('minus', curr.id)}>-</button>{curr.quantity}
                                            <button className={`px-2 btn border ms-2 ${curr.quantity === curr.stocks && "disabled"}`} disabled={curr.quantity === curr.stocks && true} onClick={() => handleQuantity('plus', curr.id)}>+</button></td>
                                        <td>${curr.subtotal}</td>
                                        <td><button className='btn border-danger text-danger p-1 px-2 rounded' onClick={() => handleRemoveItem(curr.id)} style={{ fontSize: "14px" }}><FontAwesomeIcon icon={faTrashCan} /></button></td>
                                    </tr>
                                )}
                                {
                                    !pageData?.length && <tr ><td colSpan={6} className='text-center'> No data</td></tr>
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
                {
                    !!pageData?.length > 0 && <div className="col-3 border shadow-sm p-2 d-flex align-items-center rounded" style={{ height: "350px" }}>
                        <div className=" w-100">
                            <h5 className="fs-5 fw-bold">Cart Total</h5>
                            <div className="d-flex mt-4 ">
                                <p>Subtotal</p>
                                <p className="ms-auto" id="subtotal">${totalCost.subtotal}</p>
                            </div>
                            <hr className="my-2 text-secondary" />
                            <div className="d-flex mt-4">
                                <p>Sipping chart</p>
                                <p className="ms-auto" id="shippingCost">${totalCost.shippingcost}</p>
                            </div>
                            <hr className="my-2 text-secondary" />
                            <div className="d-flex mt-4">
                                <p>Total </p>
                                <p className="ms-auto fw-bold " id="totalCost">${totalCost.totalCost}</p>
                            </div>
                            <Button className="w-100 my-2" onClick={handleCheckOut}>Proceed to checkout</Button>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

export default Cart
