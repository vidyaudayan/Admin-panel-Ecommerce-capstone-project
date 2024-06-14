import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import axios from 'axios'
import Productcard from '../components/Card/Productcard'
import { useLoaderData } from 'react-router-dom'

export  const categoryLoader= async () => {
  try{
      const res =  await axios.get(`${import.meta.env.VITE_BASE_URL}/categories`)
   
     return res.data;
  }catch(error){
      throw new Response("Failed to fetch categories", { status: error.response?.status || 500 });
  };

};;


const AllProducts = () => {
  const [openUploadProduct,setOpenUploadProduct] = useState(false)
  const [openUpdateProduct, setUpdateProduct] = useState(false)
  const [allProducts, setAllProducts]= useState([])
  const categories= useLoaderData()
  const fetchAllProducts= async()=>{
    try{
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/get-products`); 
      const resData= await response.data

      console.log("product data",resData)
      setAllProducts(resData )
    }catch(error){
          console.log(error)
    }
  }


  useEffect(()=>{
fetchAllProducts()
  }, [])
  
  return (
    <div >
      <div className='bg-blue-300 py-2 px-4 flex justify-between items-center '>
        <h2 className='font-bold text-lg'>All Products</h2>

<button className='border text-white bg-black border-red-600 hover:bg-red-700 py-1 px-3 rounded-full transition-all' onClick={()=>setOpenUploadProduct(true)}>Upload Product</button>

      </div> 
   {openUpdateProduct&&( <updateProduct onClose={()=>setOpenUploadProduct(false)}/>)}

   <div className=' grid grid-cols-4 gap-4 py-3  h-[calc(100vh-190px)] overflow-y-scroll bg-black'>
    
        {
        allProducts.map((product, index) => {
          
          return (
          <Productcard  data={product} key={index} fetchdata={fetchAllProducts}/>
          )
        })}
      </div>


      {
          openUploadProduct && (
            <UploadProduct onClose={()=>setOpenUploadProduct(false)} fetchData={fetchAllProducts}/>
          )
        }
      

    </div>
  )
}

export default AllProducts