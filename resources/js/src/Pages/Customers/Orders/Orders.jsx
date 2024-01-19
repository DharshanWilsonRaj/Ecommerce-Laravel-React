import { faStarHalfStroke } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Orders.scss';

const CustomerOrders = () => {
    return (
        <div className='container customer_orders_container'>
            <div className='my-5'>
                <h6 className='fw-bold fs-4 mb-4'>Orders History</h6>
                <div className='responsive  border rounded shadow-sm'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th >Product </th>
                                <th className='text-center'>Price </th>
                                <th className='text-center'>Quantity</th>
                                <th className='text-center'>Subtotal</th>
                                <th className='text-center'>Shipping cost</th>
                                <th className='text-center'>Purchased Date </th>
                                <th className='text-center'>Status </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='align-middle'>
                                <td className='d-flex align-items-center gap-2'>
                                    <img src="http://localhost:8000/product_images/designshirt.png" alt="" width={'60px'} />
                                    <span className='d-flex flex-column'>Designshirt
                                        <span className='rating_star ' style={{ color: "#f18f0f", fontSize: "12px" }}>
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStarHalfStroke} />
                                        </span>
                                    </span>

                                </td>
                                <td className='text-center'>$87 </td>
                                <td className='text-center'>8</td>
                                <td className='text-center'>$970</td>
                                <td className='text-center'>$15</td>
                                <td className='text-center'>19-05-2024</td>
                                <td className='text-center'> <span className='badge rounded-pill bg-primary p-2'>shipped</span> </td>
                            </tr>
                            <tr className='align-middle'>
                                <td className='d-flex align-items-center gap-2'>
                                    <img src="http://localhost:8000/product_images/checkedshirt.png" alt="" width={'60px'} />
                                    <span className='d-flex flex-column'>Checked shirt
                                        <span className='rating_star ' style={{ color: "#f18f0f", fontSize: "12px" }}>
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStarHalfStroke} />
                                        </span>
                                    </span>

                                </td>
                                <td className='text-center'>$87 </td>
                                <td className='text-center'>8</td>
                                <td className='text-center'>$970</td>
                                <td className='text-center'>$15</td>
                                <td className='text-center'>19-05-2024</td>
                                <td className='text-center'> <span className='badge rounded-pill bg-primary p-2'>shipped</span> </td>
                            </tr>
                            <tr className='align-middle'>
                                <td className='d-flex align-items-center gap-2'>
                                    <img src="http://localhost:8000/product_images/havaishirt.jpg" alt="" width={'60px'} />
                                    <span className='d-flex flex-column'>Havaishirt
                                        <span className='rating_star ' style={{ color: "#f18f0f", fontSize: "12px" }}>
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon icon={faStarHalfStroke} />
                                        </span>
                                    </span>

                                </td>
                                <td className='text-center'>$87 </td>
                                <td className='text-center'>8</td>
                                <td className='text-center'>$970</td>
                                <td className='text-center'>$15</td>
                                <td className='text-center'>19-05-2024</td>
                                <td className='text-center'> <span className='badge rounded-pill bg-danger p-2'>cancelled</span> </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default CustomerOrders;
