import React, { useState } from 'react';
import axios from 'axios';

const PlaceOrder = () => {
    const [orderDetails, setOrderDetails] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderDetails({ ...orderDetails, [name]: value });
    };

    const placeOrder = () => {
        axios.post(`${import.meta.env.VITE_BASE_URL}/admin/place-order`, orderDetails, {withCredentials:true})
            .then(response => {
                alert('Order placed successfully!');
                setOrderDetails({});
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Place Order</h2>
        <form 
            onSubmit={(e) => { e.preventDefault(); placeOrder(); }} 
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Customer Name</label>
                <input 
                    type="text" 
                    name="customerName" 
                    value={orderDetails.customerName || ''} 
                    onChange={handleInputChange} 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Product IDs (comma separated)</label>
                <input 
                    type="text" 
                    name="productIds" 
                    value={orderDetails.productIds || ''} 
                    onChange={handleInputChange} 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="flex items-center justify-between">
                <button 
                    type="submit" 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Place Order
                </button>
            </div>
        </form>
    </div>
    );
};

export default PlaceOrder;
