
import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { IoClose } from "react-icons/io5";
import { useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';
import { MdUpload } from "react-icons/md";
import { useNavigate } from 'react-router-dom';



export  const categoryLoader= async () => {
  try{
      const res =  await axios.get(`${import.meta.env.VITE_BASE_URL}/categories`)
   
     return res.data;
  }catch(error){
      throw new Response("Failed to fetch categories", { status: error.response?.status || 500 });
  };

};;

const UploadProduct = ({
  onClose,fetchdata}) => {
  const navigate = useNavigate()
  
  const categories= useLoaderData()
 
  const [data, setData] = useState({
    
    title: "",
    slug: "",
    category: "",
    productPictures:[],
    price: "",
    sellingPrice:"",
    description:"",
    
  })


  const [openFullScreenImage,setOpenFullScreenImage] = useState(false)
  const [fullScreenImage,setFullScreenImage] = useState("")

const [images, setImages] = useState([]);

const handleImageChange = (event) => {
  const newImages = [...images];
  const uploadedFiles = event.target.files;

  for (let i = 0; i < uploadedFiles.length; i++) {
      newImages.push(uploadedFiles[i]);
  }

  setImages(newImages);
};
  const handleOnChange = (e)=>{
      const { name, value} = e.target

      setData((preve)=>{
        return{
          ...preve,
          [name]  : value
        }
      })
  }

 /* const handleUploadProduct = async (e) => {
    const files = e.target.files;

    const uploadPromises = Array.from(files).map((file) => uploadImage(file));
    const uploadedImages = await Promise.all(uploadPromises);

    setData((prev) => {
      const updatedProductPictures = uploadedImages.map(img => img.url);
      return {
        ...prev,
        productPictures: [...prev.productPictures, ...updatedProductPictures]
      };
    });
  };*/

  const handleDeleteProductImage = async(index)=>{
    console.log("image index",index)
    
    const newProductPictures = [...data.productPictures]
    newProductPictures.splice(index,1)

    setData((preve)=>{
      return{
        ...preve,
        productPictures : [...newProductPictures]
      }
    })
    
  }
  
  {/**upload product */}
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare the product details object
    const formData = new FormData()
    for (let i = 0; i < images.length; i++) {
      formData.append('productPictures', images[i]);
    }
  
    formData.append("productDetails", JSON.stringify(data));
console.log("data",data)
    
    try {
     
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/add-products`, formData, { withCredentials: true });
      console.log(response);
      setImages([]);
      
      toast.success("Product created successfully");
      onClose(true)
    
    } catch (error) {
      console.error('Error creating product:', error.message);
    }
  };

  /*const handleImageChange = (event) => {
    const newImages = Array.from(event.target.files);
    setImages(newImages);
  };*/
  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
};



  return (
    <div className='fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] '>

        <div className='flex justify-between items-center pb-3'>
          <h2 className='font-bold text-lg'>Add Product</h2>
          <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
          <IoClose />
          </div>
        </div>
      

      <form className='grid p-4 gap-2 overflow-y-scroll h-[80%] mt-8 pb-4'  onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type='text'
          id='title'
          placeholder='enter product title'
          name='title'
          value={data.title}
          onChange={handleOnChange}
          className='p-2 bg-slate-100 border rounded'
          required
        />


        <label htmlFor="slug" className='mt-3'>Slug</label>
        <input
          type='text'
          id='slug'
          placeholder='enter product slug'
          name='slug'
          value={data.slug}
          onChange={handleOnChange}
          className='p-2 bg-slate-100 border rounded'
          required
        />

        <label htmlFor="category" className='mt-3'>Category</label>
        <select name='category' value={data.category._id} className='p-2 bg-slate-100 border rounded' onChange={handleOnChange}>
        {
                categories.map((category)=>{
                    return(
                        <option key={category._id} value={category._id}>{category.title}</option>
                    )
                })
              }
        </select>

        <label htmlFor="productPictures">Product Image</label>
        <label htmlFor="productPictures">
          <div className='p-2 bg-slate-100 border rounded h-32 w-full  cursor-pointer'>
            <div className='flex  gap-2 justify-center items-center'>
              <MdUpload className='text-2xl' />
              <p className='text-sm'>Upload product image</p>
              <input type="file" id='productPictures' className='hidden' multiple onChange={handleImageChange} />
            </div>
            

          </div>

          <div className='grid grid-cols-2 gap-1'>
            {images.length > 0 && (
                                <div className='flex mt-2'>
                                    {images.map((image, index) => (
                                        <div key={index} className='flex items-center gap-2'>
                                            <img src={URL.createObjectURL(image)} alt={`Product ${index}`} className='h-20 w-20 object-cover mr-2' />
                                            <button type="button" className='text-red-500 hover:text-red-600 mr-2' onClick={() => handleRemoveImage(index)}>Remove</button>
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
          placeholder='enter price'
          name='price'
          value={data.price}
          onChange={handleOnChange}
          className='p-2 bg-slate-100 border rounded'
          required
        />

<label htmlFor="sellingPrice" className='mt-3'>Selling Price</label>
        <input
          type='number'
          id='sellingPrice'
          placeholder='enter selling price'
          name='sellingPrice'
          value={data.sellingPrice}
          onChange={handleOnChange}
          className='p-2 bg-slate-100 border rounded'
          required
        />

<label htmlFor='description' className='mt-3'>Description :</label>
              <textarea 
                className='h-28 bg-slate-100 border resize-none p-1' 
                placeholder='enter product description' 
                rows={3} 
                onChange={handleOnChange} 
                name='description'
                value={data.description}
              >
              </textarea>




        <div className="flex justify-center">
       
       <button className="bg-red-500 px-4 h-10 text-white hover:bg-green-400 cursor-pointer" onClick={() => console.log('Submit button clicked')}  type="submit">Submit</button>
       </div>
        

      </form>
    </div>

 </div>
        )
}

export default UploadProduct






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
        


















/*import React from 'react'
import { IoClose } from "react-icons/io5";
import { useState } from 'react';
import productCategory from '../helpers/ProductCategory';
import { MdUpload } from "react-icons/md";
import { v2 as cloudinary } from 'cloudinary'
import uploadImage from '../helpers/uploadImage';


const UploadProduct = ({ onClose }) => {

  const [uploadProductImage, setUploadProductImage]= useState('')

  const [data, setData] = useState({
    productName: "",
    slug: "",
    category: "",
    productPictures: [],
    description: "",
    price: "",
    sellingPrice: ""
  })

  const handleOnChange = (e) => {

  }

const handleUploadProduct= async(e)=>{
  const file= e.target.files[0]
  setUploadProductImage(file.name)
  console.log(file)
const uploadImageCloudinary= await uploadImage(file)
console.log("upload image", uploadImage)
}
  return (
    <div className='fixed w-full h-full bg-slate-300 bg-opacity-30 top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
      <div className='bg-red-400 p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden mb-4'>

        <div className='flex justify-between items-center'>
          <h2 className='font-bold text-lg'> Upload Product</h2>
          <div className='w-fit ml-auto text-2xl hover:text-3xl cursor-pointer' onClick={onClose}>
            <IoClose />
          </div>
        </div>

        <form className='grid p-4 gap-2 overflow-y-scroll h-[80%] mt-8 pb-4' >
          <label htmlFor="productTitle">Title</label>
          <input
            type='text'
            id='productTitle'
            placeholder='enter product title'
            name='productTitle'
            value={data.productTitle}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />


          <label htmlFor="slug" className='mt-3'>Slug</label>
          <input
            type='text'
            id='slug'
            placeholder='enter product slug'
            name='slug'
            value={data.slug}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor="category" className='mt-3'>Category</label>
          <select value={data.category} className='p-2 bg-slate-100 border rounded'>
            {
              productCategory.map((item, index) => {
                return (
                  <option value={item.value} key={item.value + index}>{item.label}</option>
                )
              })
            }
          </select>

          <label htmlFor="productImage">Product Image</label>
          <label htmlFor="uploadImage">
            <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
              <div className='flex flex-col gap-2 justify-center items-center'>
                <MdUpload className='text-2xl' />
                <p className='text-sm'>Upload product image</p>
                <input type="file" id='uploadImage' className='hidden' onChange={handleUploadProduct}/>
              </div>


            </div>
          </label>
          <div>
            <img src="" className='w-20 h-20 bg-slate-200 border' />
          </div>

        </form>
      </div>


    </div>
  )
}

export default UploadProduct*/



