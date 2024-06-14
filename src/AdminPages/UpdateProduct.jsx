{/* React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'

export async function loader({ params }) {
    const productId = params.productId;
  const productData= await axios.get(`${import.meta.env.VITE_BASE_URL}/products/:productId`)
const product= productData.data

  return{product}
  }


const UpdateProduct = () => {
    const [title,setTitle]= useState('')
    const [image,setImage] = useState('')
    const [price,setPrice] =useState('')
    const [slug, setSlug]= useState('')
    const [updated,setUpdated]= useState(false)

   const {product}= useLoaderData()

   async function handleSubmit(e){
        e.preventDefault()
        const data={
         title:title,
        slug:slug,
        image:image,
        price:price
        }
       
        try{
      const data= await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/update-product/:id`, data, { withCredentials: true });
            console.log(data)
            setUpdated(true)
        }catch(error){
         console.log(error)
        }
     }
  return (
    <div className=' py-16 container mx-auto px-4 flex flex-col items-center justify-center'>
        <h1>Update Product</h1>
        
<form onSubmit={handleSubmit}>
<div>
<label htmlFor="title">Title</label> 
 <input  type="text" id="title" value={title} onChange={(e)=>setTitle(e.target.value)} />
</div>

<div>
<label htmlFor="slug">Slug</label> 
<input  type="text" id="slug" value={slug} onChange={(e)=>setSlug(e.target.value)} />
</div>

<div>
<label htmlFor="image">Image</label> 
<input  type="image" id="image" value={image} onChange={(e)=>setImage(e.target.value)} />
</div>

<div>
<label htmlFor="price">Price</label> 
<input  type="number" id="price" value={price} onChange={(e)=>setPrice(e.target.value)} />
</div>
<button type="submit">Save Changes</button>
        </form>
    </div>
  )
}

export default UpdateProduct*/}