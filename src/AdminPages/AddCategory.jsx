import React from 'react'
import CategoryForm from '../components/CategoryForm/CategoryForm.jsx'

function AddCategory() {
  return (
   <main>
    <section className=' py-16 container mx-auto px-4 flex flex-col items-center justify-center'>
    <h1 className='text-3xl'> Add category </h1>
    <CategoryForm/>
    </section>
   </main>
  )
}

export default AddCategory