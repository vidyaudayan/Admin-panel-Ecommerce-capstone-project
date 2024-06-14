import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { GrSearch } from "react-icons/gr";
import { FaUserAlt } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAdminDetails } from '../../features/admin/adminSlice';
import axios from 'axios';
const Header = () => {
  const [menuDisplay, setMenuDisplay]= useState(false)
  const user = useSelector(state => state?.user?.user)

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = async () => {


    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/logout`, {}, {
        withCredentials: true
      });

      const data = response.data;
      // console.log(data)



      if (data && data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null));
        navigate('/');


      }
    } catch (error) {
      toast.error(data.message)
    }
  };


  return (
    <header className='h-24 shadow-md '>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>

        <div className='ml-6' >
          <Link to='/home'> <img className='w-60 ' src={logo} alt="" /></Link>
        </div>

        <div className='hidden lg:flex  items-center  justify-between border  border-fuchsia-800 rounded-full pl-2 '>
          <input className='w-full  outline-none ' type="text" placeholder='Search your products...' />
          <div className='text-lg min-w-[50px] h-8 bg-fuchsia-800 flex items-center justify-center rounded-r-full'><GrSearch /></div>
        </div>
        <div className='flex  items-center gap-4'>
         
            <div className='flex  justify-center'>
              {
                user?.firstName ? (
                  <h4 className='text-xl capitalize'>{user.firstName}</h4>
                ) : ("")
              }
            </div>
           

       <div className='flex flex-col items-center  justify-center  '>
       <div className='text-2xl cursor-pointer' onClick={()=>setMenuDisplay(preve => !preve)}>
            <FaUserAlt className='' /></div>
           {
            menuDisplay && (
              <div className='absolute mt-8 bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded  '>
              <nav>
                <Link to={'/admin-panel'} className='hover:bg-slate-100 p-2 hidden md:block' onClick={()=>setMenuDisplay(preve => !preve)} >Admin panel</Link>
              </nav>
            </div>
            )
           }

           
       </div>
          


          <div className='text-2xl relative' >
            <span> <FaShoppingBag /></span>
            <div className=' bg-fuchsia-600 text-white w-4 h-4 rounded-full p-2 flex items-center justify-center absolute -top-2 -right-2'>
              <p className='text-sm'>0</p></div>

          </div>
        </div>
        <div>
          {
            user?.id ? (
              <button onClick={handleLogout} className=' bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700 underline hover:underline-offset-2'>Sign Out</button>
            ) : (
              <Link to='/signup' className=' bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700 underline hover:underline-offset-2'>Signup/Login</Link>
            )
          }

        </div>






      </div>
    </header>
  )
}

export default Header