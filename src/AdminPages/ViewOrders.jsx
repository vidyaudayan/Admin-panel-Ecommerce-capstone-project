import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const ViewOrders = () => {
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState({});

    const fetchOrders = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/get-allorders`, { withCredentials: true });
          setOrders(response.data);
    
          console.log("order res", response)
    
        } catch (error) {
          console.error('Error fetching orders', error);
         
    
        }
      };
    

    useEffect(() => {

        const fetchUsers = async (orders) => {
            const userIds = orders.map(order => order.user_id);
            const uniqueUserIds = [...new Set(userIds)]; // Get unique user IDs
            const userResponses = await Promise.all(uniqueUserIds.map(userId => axios.get(`${import.meta.env.VITE_BASE_URL}/admin/get-user/${userId}`,{withCredentials:true})));
            const usersData = userResponses.reduce((acc, response) => {
                acc[response.data._id] = response.data;
                return acc;
            }, {});
            setUsers(usersData);
        };
  fetchOrders()
  fetchUsers()
      
    }, []);

    return (
        <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Orders</h2>
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100 border-b border-gray-200">
                        <th className="py-2 px-4 text-left">Order ID</th>
                        <th className="py-2 px-4 text-left">Customer</th>
                        <th className="py-2 px-4 text-left">Customer Name</th>
                        <th className="py-2 px-4 text-left">Status</th>
                        <th className="py-2 px-4 text-left">Products</th>
                        <th className="py-2 px-4 text-left">Total Price</th>
                        <th className="py-2 px-4 text-left">Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id} className="border-b border-gray-200">
                            <td className="py-2 px-4">{order._id}</td>
                           
                            <td className="py-2 px-4">{order.user_id}</td>
                           
                            <td className="py-2 px-4">{order.status}</td>
                            <td className="py-2 px-4">
                                <ul className="list-disc list-inside">
                                    {order.products.map(product => (
                                        <li key={product._id}>
                                            {product.quantity}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td className="py-2 px-4">{order.total_price}</td>
                            <td className="py-2 px-4">{moment(order.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
            
    );
};

export default ViewOrders;
