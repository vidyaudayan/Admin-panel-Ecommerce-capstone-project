import React from 'react'
import axios from 'axios'
import { useLoaderData } from 'react-router-dom'
import moment from 'moment';
import { MdEdit } from "react-icons/md";


export const usersLoader = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/get-users`); 
    return response.data;
  } catch (error) {
    throw new Response("Failed to fetch users", { status: error.response?.status || 500 });
  }
};



const AllUsers = () => {
  const users = useLoaderData()
  return (
    <div>
      <h2 className='text-xl text-center p-2'>Users List</h2>
      <table className='w-full '>
        < thead className='bg-blue-300'>
          <tr>
          <th className='border w-28 h-8 text-center '>Sl No.</th>
          <th className='border w-28 h-8 text-center '>Name</th>
          <th className='border w-28 h-8 text-center '>Email</th>
          <th className='border w-28 h-8 text-center '>Role</th>
          <th className='border w-28 h-8 text-center '>Created At</th>
          <th className='border w-28 h-8 text-center '>Action</th>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
      
        {users.map((user,index)=>{
          return(
            
         <tr className='border bg-slate-300 '  >
            <td className='w-28 h-8 text-center border bg-slate-300'>{index+1}</td>
           <td  className='border bg-slate-300 capitalize'>{`${user?.firstName}  ${user?.lastName}`}</td>
           <td  className='border bg-slate-300 '>{user?.email}</td>
           <td   className='border bg-slate-300 '>{user?.role}</td>
           <td   className='border bg-slate-300 '>{moment(user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
            < td > <button key={index} className='bg-green-300 rounded-full hover:bg-green-500 hover:text-white'><MdEdit /></button></td>
           </tr>
       
          
          )
        })
      }
    </div>
  )
}

export default AllUsers