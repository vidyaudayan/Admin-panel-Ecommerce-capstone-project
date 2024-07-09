import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VerifyProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        
        axios.get(`${import.meta.env.VITE_BASE_URL}/products`)
            .then(response => setProducts(response.data))
         
            .catch(error => console.error(error));
    }, []);

    const verifyProduct = (productId, status) => {
   
        axios.patch(`${import.meta.env.VITE_BASE_URL}/admin/update-productstatus/${productId}`, { status }, {withCredentials:true})
            .then(response => {
               
                setProducts(products.map(product =>
                    product._id === productId ? response.data : product
                ));
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Verify Products</h2>
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100 border-b border-gray-200">
                        <th className="py-2 px-4 text-left">Product ID</th>
                        <th className="py-2 px-4 text-left">Name</th>
                        <th className="py-2 px-4 text-left">Status</th>
                        <th className="py-2 px-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id} className="border-b border-gray-200">
                            <td className="py-2 px-4">{product._id}</td>
                            <td className="py-2 px-4">{product.name}</td>
                            <td className="py-2 px-4">{product.status}</td>
                            <td className="py-2 px-4">
                                <button 
                                    onClick={() => verifyProduct(product._id, 'approved')} 
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                                >
                                    Approve
                                </button>
                                <button 
                                    onClick={() => verifyProduct(product._id, 'rejected')} 
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                >
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default VerifyProducts;
