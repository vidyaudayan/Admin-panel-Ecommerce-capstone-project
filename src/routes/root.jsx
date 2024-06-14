import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAdminDetails } from '../features/admin/adminSlice.js'
function Root() {

  const dispatch= useDispatch()
  
const fetchAdminDetails = async () => {
  try {
    //const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/adminprofile`, {withCredentials:true});
    const dataResponse = response.data;
    // Handle the dataResponse as needed
    //console.log(dataResponse);
    const dataApi = response.data;
    dispatch(setAdminDetails(dataApi))
   if (dataApi.success) {
      dispatch(setUserDetails(dataApi));
    }
  } catch (error) {
    
    console.error('Error fetching admin details:', error);
  }
}



  return (
    <div>
   
      <ToastContainer />
        <Header/>
        <main className='min-h-[calc(100vh-120px)]'>
        <Outlet/>
        </main>
        <Footer/>
       
    </div>
  )
}

export default Root