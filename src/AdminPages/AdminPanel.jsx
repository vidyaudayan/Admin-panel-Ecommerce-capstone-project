import React from 'react'
import { useSelector } from 'react-redux'
import { GrUserAdmin } from "react-icons/gr";
import { Link, Outlet } from 'react-router-dom';
import { FaUsersBetweenLines } from "react-icons/fa6";
import { GiClothes } from "react-icons/gi";

import { MdCategory } from "react-icons/md";
import { RiApps2AddFill } from "react-icons/ri";


const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
  
    return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
        <aside className='bg-slate-200 min-h-full w-full  max-w-72 shadow-lg'>
        <div className='flex flex-col  justify-center items-center h-32 bg-red-300'>
        <GrUserAdmin className='text-3xl mt-2' />
              
              {
                user?.firstName ? (
                  <h4 className='text-3xl font-semibold capitalize text-white'>{user.firstName}</h4>
                ) :("")
                
                
              }
              <p className='font-semibold capitalize'>{user?.role}</p>
              <p className='font-semibold capitalize'>ADMIN</p>
            </div>
           <div>
            <nav className='grid '>
              <div className='flex items-center p-2 hover:bg-blue-200'>
              <FaUsersBetweenLines className='text-2xl' />
              <Link to={"get-users"}  className='px-2 py-1 hover:bg-blue-200'>All Users</Link>
              </div>


               <div  className='flex items-center p-2 hover:bg-blue-200'>
               <GiClothes className='text-2xl'/>
               <Link to={"get-products"} className='px-2 py-1 hover:bg-blue-200'>All Products</Link>
              
               </div>
                  
                  {/*<div className='flex items-center p-2 hover:bg-blue-200'>
                  <RiApps2AddFill className='text-2xl'/>
                  <Link to={"add-product"} className='px-2 py-1 hover:bg-blue-200'>Add Product</Link>
                  </div>*/}
                  
                  <div className='flex items-center p-2 hover:bg-blue-200'>
                  <MdCategory className='text-2xl'/>
                  <Link to={"add-category"} className='px-2 py-1 hover:bg-blue-200'>Add Category</Link>
                   
                  </div>
                  
            </nav>
           </div>
        
        </aside>
        <main className='w-full h-full p-4'>

<Outlet/>
        </main>
    </div>
  )
}

export default AdminPanel