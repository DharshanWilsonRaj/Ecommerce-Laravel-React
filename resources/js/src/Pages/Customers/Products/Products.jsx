import Button from '@/src/Components/Button/Button'
import { faCartShopping, faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useCallback } from 'react'
import './Products.scss'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const ProductsPage = () => {
    const getProductsRef = useRef();
    const addCart = useRef();

    const [pageData, setPageData] = useState([]);
    const { isLoggedIn, token } = useSelector(state => state.auth);

    useEffect(() => {
        if (getProductsRef.current) {
            getProductsRef.current.abort();
        }
        if (addCart.current) {
            addCart.current.abort();
        }
    }, []);

    const getProducts = useCallback(async () => {
        try {
            if (getProductsRef.current) {
                getProductsRef.current.abort();
            }
            getProductsRef.current = new AbortController();
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                signal: getProductsRef.current.signal
            }
            const response = await axios.get(`${window.base_path}/products-list`, config);
            const json = response.data;

            if (json?.success) {
                setPageData(json?.data || []);
            }
        } catch (error) {
            console.log(error.message);
        }

    }, []);

    useEffect(() => {
        getProducts();
    }, [getProducts])



    const handleAddCart = useCallback(async (product_id) => {
        if (!product_id) return;
        try {
            if (addCart.current) {
                addCart.current.abort();
            }

            if (!isLoggedIn) {
                const cartProducts = JSON.parse(localStorage.getItem("cart_product")) || [];
                const product = pageData?.find(curr => curr.id === product_id);
                if (product) {
                    let quantity = 1;
                    let subtotal = product.price * quantity;

                    const alreadyInCartIndex = cartProducts?.findIndex(curr => curr.id === product_id);
                    let updatedCart = [];
                    if (alreadyInCartIndex !== -1) {
                        if (cartProducts[alreadyInCartIndex].quantity < product.stocks) {
                            cartProducts[alreadyInCartIndex].quantity += 1;
                            cartProducts[alreadyInCartIndex].subtotal = product.price * cartProducts[alreadyInCartIndex].quantity;
                            updatedCart = cartProducts
                        }
                        else {
                            updatedCart = cartProducts
                        }
                    }
                    else {
                        updatedCart = [...cartProducts, { ...product, quantity, subtotal }];
                    }
                    localStorage.setItem("cart_product", JSON.stringify(updatedCart));
                }

                toast.success(" Added in cart ", {
                    toastId: product_id,
                    position: 'bottom-right',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                })
            }
            else {
                addCart.current = new AbortController();
                let config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    signal: addCart.current.signal
                }
                const response = await axios.post(`${window.base_path}/addCart/${product_id}`, {}, config);
                const json = response.data;

                toast.success(json?.message || "Added in Cart", {
                    toastId: product_id,
                    position: 'bottom-right',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                })

            }

        } catch (error) {
            console.log(error.message);
        }

    }, [isLoggedIn, pageData, token]);



    return (
        <div className='products_page_container'>
            <div className="container">

                <div className="row product_list_container row-gap-2   my-4">
                    {!!pageData?.length && pageData?.map((curr, idx) =>
                        <div className="col-xl-3 col-lg-4 col-md-4 col-12 " key={idx}>
                            <div className="card" style={{ width: "18rem" }}>
                                <div className='image_container'>
                                    <img src={curr.image} class="card-img-top border p-2" alt="..." style={{ height: "200px" }} />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <span>{curr.name}  </span>
                                        <span className='rating_star '>
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStarHalfStroke} />
                                        </span>
                                    </h5>
                                    <p className="card-text">${curr.price}</p>
                                    <Button onClick={() => handleAddCart(curr.id)} className="btn btn-primary w-100"> <FontAwesomeIcon icon={faCartShopping} className="mx-2" /> Add to cart </Button>
                                </div>
                            </div>


                        </div>)}
                        {!!pageData?.length && pageData?.map((curr, idx) =>
                        <div className="col-xl-3 col-lg-4 col-md-4 col-12 " key={idx}>
                            <div className="card" style={{ width: "18rem" }}>
                                <div className='image_container'>
                                    <img src={curr.image} class="card-img-top border p-2" alt="..." style={{ height: "200px" }} />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <span>{curr.name}  </span>
                                        <span className='rating_star '>
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStarHalfStroke} />
                                        </span>
                                    </h5>
                                    <p className="card-text">${curr.price}</p>
                                    <Button onClick={() => handleAddCart(curr.id)} className="btn btn-primary w-100"> <FontAwesomeIcon icon={faCartShopping} className="mx-2" /> Add to cart </Button>
                                </div>
                            </div>
                        </div>)}

                </div>
            </div>
        </div>
    )
}

export default ProductsPage
