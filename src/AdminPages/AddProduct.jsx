{/* React from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import UploadProduct from '../components/UploadProduct'
import { useLoaderData } from 'react-router-dom'
import axios from 'axios'
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify"

import { MdUpload } from "react-icons/md";

export  const loader= async () => {
    try{
        const res =  await axios.get(`${import.meta.env.VITE_BASE_URL}/categories`)
        //const categories= res.data
       //return {categories}
       return res.data;
    }catch(error){
        throw new Response("Failed to fetch categories", { status: error.response?.status || 500 });
    }

  }


function AddProduct() {
    const categories= useLoaderData()

    const { register, handleSubmit, watch,formState: { errors }, setValue,reset } = useForm();
    const [imageCount, setImageCount] = useState(0);
  

  const onSubmit = async(data) => {
   
    const formData = new FormData()


    formData.append("productImage", data.productImage[0])
    delete data.productImage
 
    formData.append("productDetails", JSON.stringify(data))
        console.log(data)
    /*axios.post(`${import.meta.env.VITE_BASE_URL}/admin/add-products`, formData, {withCredentials:true})
      .then(res=>console.log(res))
      
      .catch(error=>console.log(error))

  
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/add-products`, formData, { withCredentials: true });
        console.log(response);
        toast.success('Product added successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          toastId: 'add-product-success' // Optional unique ID for potential handling
        });
        reset(); // Reset form after success
      } catch (error) {
        console.error(error);
        toast.error('Error adding product!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
        });
      }
  

}


  const handleImageChange = (event) => {
  
    setImageCount(1);

  };

  return (
    <div className='fixed w-full h-full bg-slate-300 bg-opacity-30 top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
      <div className='bg-red-400 p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden mb-4'>

        <div className='flex justify-between items-center'>
          <h2 className='font-bold text-lg'> Upload Product</h2>
          <div className='w-fit ml-auto text-2xl hover:text-3xl cursor-pointer' >
            <IoClose />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='grid p-4 gap-2 overflow-y-scroll h-[80%] mt-8 pb-4' >
          <label htmlFor="title">Product Title</label>
          <input
            type='text'
            id='title'
            placeholder='enter product title'
            name='title'
            {...register('title', { required: true })}
            className='p-2 bg-slate-100 border rounded'
          />
          {errors.productName && <span className="text-red-500 text-sm">This field is required</span>}

          <label htmlFor="slug" className='mt-3'>Slug</label>
          <input
            type='text'
            id='slug'
            placeholder='enter product slug'
            name='slug'
            {...register('slug', { required: true })}
            className='p-2 bg-slate-100 border rounded'
          />
          {errors.slug && <span className="text-red-500 text-sm">This field is required</span>}

          <label htmlFor="category" className='mt-3'>Category</label>
          <select {...register('category', { required: true })} className='p-2 bg-slate-100 border rounded'>
           
          {
                categories.map((category,index)=>{
                    return(
                        <option key={category._id} value={category._id}>{category.title}</option>
                    )
                })
              }
          </select>
          {errors.category && <span className="text-red-500 text-sm">This field is required</span>}

          
          <label htmlFor="productImage"> Product Image
            <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
              <div className='flex flex-col gap-2 justify-center items-center'>
                <MdUpload className='text-2xl' />
                <p className='text-sm'>Upload product image</p>
                <input type="file" id='productImage' {...register('productImage', { required: true })} className='hidden'   />
              </div>
              
            </div>

          </label>
          {imageCount > 0 && <p className='text-green-500 text-sm' >{imageCount} image{imageCount > 1 ? 's' : ''} added</p>}


          <label htmlFor="price" className='mt-3'>Price</label>
          <input
            type='number'
            id='price'
            placeholder='enter product price'
            name='price'
            {...register('price', { required: true })}
            className='p-2 bg-slate-100 border rounded'
          />
          {errors.price && <span className="text-red-500 text-sm">This field is required</span>}
        
          <div className="flex justify-center">
       
        <button className="bg-green-500 px-4 h-10 text-white hover:bg-green-400 cursor-pointer" onClick={() => console.log('Submit button clicked')}  type="submit">Submit</button>
        </div>

        </form>
      </div>


    </div>
  )
  
 
}

export default AddProduct */}







/*import React from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import UploadProduct from '../components/UploadProduct'
import { useLoaderData } from 'react-router-dom'
import axios from 'axios'
import { IoClose } from "react-icons/io5";


import { MdUpload } from "react-icons/md";

export  const loader= async () => {
    try{
        const res =  await axios.get(`${import.meta.env.VITE_BASE_URL}/categories`)
        //const categories= res.data
       //return {categories}
       return res.data;
    }catch(error){
        throw new Response("Failed to fetch categories", { status: error.response?.status || 500 });
    }

  }


function AddProduct() {
   
  const categories = useLoaderData()

  const { register, handleSubmit, watch, formState: { errors }, setValue, reset } = useForm();
  const [images, setImages] = useState([]); // Stores an array of image URLs

  const onSubmit = (data) => {
    const formData = new FormData()

    for (let i = 0; i < images.length; i++) {
      formData.append(`productImage[${i}]`, images[i])
    }

    delete data.productImage // Remove the unnecessary key from data object
    formData.append("productDetails", JSON.stringify(data))

    axios.post(`${import.meta.env.VITE_BASE_URL}/admin/add-products`, formData, { withCredentials: true })
      .then(res => console.log(res))
      .catch(error => console.log(error))

    reset()
  }

  const handleImageChange = (event) => {
    const newImages = [...images];
    const uploadedFiles = event.target.files;

    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        newImages.push(imageUrl);
      }
    }

    setImages(newImages);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  }


  
  
  
    return (
      <div className='fixed w-full h-full bg-slate-300 bg-opacity-30 top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
        <div className='bg-red-400 p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden mb-4'>
  
          <div className='flex justify-between items-center'>
            <h2 className='font-bold text-lg'> Upload Product</h2>
            <div className='w-fit ml-auto text-2xl hover:text-3xl cursor-pointer' >
              <IoClose />
            </div>
          </div>
  
          <form onSubmit={handleSubmit(onSubmit)} className='grid p-4 gap-2 overflow-y-scroll h-[80%] mt-8 pb-4' >
            <label htmlFor="title">Product Title</label>
            <input
              type='text'
              id='title'
              placeholder='enter product title'
              name='title'
              {...register('title', { required: true })}
              className='p-2 bg-slate-100 border rounded'
            />
            {errors.productName && <span className="text-red-500 text-sm">This field is required</span>}
  
            <label htmlFor="slug" className='mt-3'>Slug</label>
            <input
              type='text'
              id='slug'
              placeholder='enter product slug'
              name='slug'
              {...register('slug', { required: true })}
              className='p-2 bg-slate-100 border rounded'
            />
            {errors.slug && <span className="text-red-500 text-sm">This field is required</span>}
  
            <label htmlFor="category" className='mt-3'>Category</label>
            <select {...register('category', { required: true })} className='p-2 bg-slate-100 border rounded'>
             
            {
                  categories.map((category)=>{
                      return(
                          <option key={category._id} value={category._id}>{category.title}</option>
                      )
                  })
                }
            </select>
            {errors.category && <span className="text-red-500 text-sm">This field is required</span>}
  

            <label htmlFor="productImage"> Product Image
            <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
              <div className='flex flex-col gap-2 justify-center items-center'>
                <MdUpload className='text-2xl' />
                <p className='text-sm'>Upload product image</p>
                
                <input type="file"  multiple onChange={handleImageChange} id='productImage' {...register('productImage', { required: true })} className='hidden'   />
              </div>
              {images.length > 0 && ( // Check if there are any images
    <div>
      {images.map((imageUrl, index) => (
        <div key={index} className='flex mt-2 items-center'>
          <img src={imageUrl} alt={`Product Image ${index + 1}`} className='h-20 w-20 object-cover mr-2' />
          <button className='text-red-500 hover:text-red-600' onClick={() => handleRemoveImage(index)}>Remove</button>
        </div>
      ))}
    </div>
  )}
              
            </div>

          </label>

          <label htmlFor="price" className='mt-3'>Price</label>
          <input
            type='number'
            id='price'
            placeholder='enter product price'
            name='price'
            {...register('price', { required: true })}
            className='p-2 bg-slate-100 border rounded'
          />
          {errors.price && <span className="text-red-500 text-sm">This field is required</span>}
        
          <div className="flex justify-center">
       
        <button className="bg-green-500 px-4 h-10 text-white hover:bg-green-400 cursor-pointer" onClick={() => console.log('Submit button clicked')}  type="submit">Submit</button>
        </div>

        </form>
      </div>


    </div>
  )
  
 
}

export default AddProduct*/
        