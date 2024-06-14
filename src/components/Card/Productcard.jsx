import React, { useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import UpdateProduct from '../UpdateProduct';
import displayINRCurrency from '../../helpers/Currency';



const Productcard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false)
  return (
    <div className='bg-slate-300 px-4 py-4 ml-4 mr-4 rounded' >
      <div className='w-48 '>
        <div className='w-42 h-42 flex justify-center items-center'>
        <img className=' mx-auto object-fill h-full' src={data?.image } alt={data.title} />
        </div>
        
        <h3 className=' text-black text-ellipsis line-clamp-2'>{data.title}</h3>
        <div>
          <p className='font-semibold'>
            {
              displayINRCurrency(data.price)
            }

          </p>

          <div className='w-fit ml-auto p-1 mb-2 mr-2 cursor-pointer bg-green-400 hover:bg-green-600 rounded-full  hover:text-white' onClick={() => setEditProduct(true)}>

            <FaEdit />
          </div>
        </div>

      </div>




      {
        editProduct && (
          <UpdateProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata} />
        )
      }
    </div>

  )
}

export default Productcard