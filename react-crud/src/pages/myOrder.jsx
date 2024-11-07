import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";




function Order() {

    const [Orders, setOrders] = useState({
        isFetching: false, orders: []
    });

    const fetchOrders = async () => {
        try {
            setOrders({ isFetching: true });
            const response = await axios.get('/orders', {
                headers: {
                    Authorization: sessionStorage.getItem('accessToken')
                }
            });

            setOrders({ isFetching: false, orders: response.data });

            console.log(response.data);

        }
        catch (error) {
            console.log(error);

        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);


    const submitDelelte = async (id) => {
        try {
            console.log(id);
            
            const response = await axios.delete(`/orders/${id}`, {
                headers: {
                    Authorization: sessionStorage.getItem('accessToken')
                }
            });

            if (response.status !== 204) {
                throw new Error(response.data.error);
            }

            fetchOrders();
        } 
        catch (error) {
            alert(error);    
        }
    };

    return (
        <>
            <Link to={"/"} className="btn btn-primary mb-4">
                ย้อนกลับ
            </Link>

            <div className="d-flex justify-content-center">
                {Orders.isFetching ? (
                    <div class="spinner-border text-secondary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                ) : (
                    <table class="table border ">
                        <thead>
                            <tr>
                                <th scope="col">Order ID</th>
                                <th scope="col">customerName</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>

                        {Orders.orders.map((order, index) => (
                            <tbody>
                                <tr>
                                    <th scope="row">{order.id}</th>
                                    <td>{order.customerName}</td>
                                    <td>
                                        <div className="btn btn-danger" onClick={() => submitDelelte(order.id)}>
                                            Delete
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ))}

                    </table>
                )}

            </div>


        </>
    );
}


export default Order;