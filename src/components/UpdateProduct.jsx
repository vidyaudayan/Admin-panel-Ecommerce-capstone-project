import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { IoClose } from "react-icons/io5";
import { useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';
import { MdUpload } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";

export  const categoryLoader= async () => {
  try{
      const res =  await axios.get(`${import.meta.env.VITE_BASE_URL}/categories`)
   
     return res.data;
  }catch(error){
      throw new Response("Failed to fetch categories", { status: error.response?.status || 500 });
  };

};;

const UpdateProduct = ({
  onClose,
  productData,
  fetchdata
}) => {
  const navigate = useNavigate()
  const productId = productData._id
  const categories= useLoaderData()
  const [data, setData] = useState({
    ...productData,
    title: productData?.title,
    slug: productData?.slug,
    category: productData?.category,
    productImage:productData?.productImage|| [],
    price: productData?.price,
    sellingPrice:productData?.sellingPrice,
    description:productData?.description
  })


  const [openFullScreenImage,setOpenFullScreenImage] = useState(false)
  const [fullScreenImage,setFullScreenImage] = useState("")
const[updated,setUpdated]= useState(false)

const [images, setImages] = useState([]);

const handleImageChange = (event) => {
  const newImages = [...images];
  const uploadedFiles = event.target.files;

  for (let i = 0; i < uploadedFiles.length; i++) {
      newImages.push(uploadedFiles[i]);
  }

  setImages(newImages);
};


const handleRemoveImage = (index) => {
  const newImages = [...images];
  newImages.splice(index, 1);
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

  const handleUploadProduct = async(e) => {

    

    setData((preve)=>{
      return{
        ...preve,
        productImage : [ ...preve.productImage, uploadImageCloudinary.url]
      }
    })
  }

  const handleDeleteProductImage = async(index)=>{
    console.log("image index",index)
    
    const newProductImage = [...data.productImage]
    newProductImage.splice(index,1)

    setData((preve)=>{
      return{
        ...preve,
        productImage : response.data?.imageUrl,
      }
    })
    
  }


  {/**upload product */}
  const handleSubmit = async(e) =>{
    e.preventDefault()
    
    try{
      const response= await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/update-product/${productId}`, data, { withCredentials: true });
            console.log(response)
            setUpdated(true)
        
          
              toast.success("Updated successfully");
           onClose(true)
fetchdata()
            

        }catch(error){
         console.log(error)
        }
     

  }

 


  return (
    <div className='fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] '>

        <div className='flex justify-between items-center pb-3'>
          <h2 className='font-bold text-lg'>Edit Product</h2>
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
        <select value={data.category} className='p-2 bg-slate-100 border rounded'>
        {
                categories.map((category)=>{
                    return(
                        <option key={category._id} value={category._id}>{category.title}</option>
                    )
                })
              }
        </select>

        <label htmlFor="productImage">Product Image</label>
        <label htmlFor="productImage">
          <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
            <div className='flex flex-col gap-2 justify-center items-center'>
              <MdUpload className='text-2xl' />
              <p className='text-sm'>Upload product image</p>
              <input type="file" id='productImage' className='hidden' multiple onChange={handleImageChange} />
            </div>


          </div>
          <div className='w-30 h-30  mt-3'>
  <img className='w-20 h-20' src={data.image} alt="" />
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

export default UpdateProduct