/*import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import user from '../assets/user icon.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import imageTobase64 from '../helpers/imageBase64';
import axios from 'axios';

function SignUpForm() {

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: "",
        firstname: "",
        confirmPassword: "",
        profilePic: ""
    })
    const handleSubmit = async (e, data) => {
        e.preventDefault()
console.log(data)
        axios.post('http://localhost:3000/api/v1/user/signup, data, { withCredentials: true }')
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
    }


const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
        return {
            ...preve,
            [name]: value
        }
    })
}

const handleUploadPic = async (e) => {
    const file = e.target.files[0]
    const profileImg = await imageTobase64(file)

    setData((preve) => {
        return {
            ...preve,
            profilePic: profileImg,
        }
    })
}


return (

    <section id='signin'>
        <div className='mx-auto container p-4 '>

            <div className='bg-white p-5 w-full max-w-sm mx-auto border border-black'>
                <div className='w-20 h-20 mx-auto border border-slate-300 bg-red-500'>
                    <div className='flex justify-center p-2'>
                        <img src={data.profilePic || user} alt='login icons' />
                    </div>
                    <form >
                        <label>
                            <div className='bg-slate-200  py-1 border border-slate-400'>
                                <p className='text-xs cursor-pointer '>Upload photo</p>
                            </div>
                            <input type="file" className='hidden' onChange={handleUploadPic} />
                        </label>

                    </form>
                </div>

                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div className='grid'>
                        <label>Name </label>
                        <div className='bg-slate-100 p-2'>
                            <input
                                type='text'
                                placeholder='enter your name'
                                name='firstName'
                                value={data.name} required
                                onChange={handleOnChange}
                                className='w-full h-full outline-none bg-transparent' />
                        </div>
                    </div>


                    <div className='grid'>
                        <label>Email : </label>
                        <div className='bg-slate-100 p-2'>
                            <input
                                type='email'
                                placeholder='enter email'
                                name='email'
                                value={data.email} required
                                onChange={handleOnChange}
                                className='w-full h-full outline-none bg-transparent' />
                        </div>
                    </div>
                    <div>
                        <label>Password </label>
                        <div className='bg-slate-100 p-2 flex'>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder='enter password'
                                value={data.password}
                                name='password' required
                                onChange={handleOnChange}
                                className='w-full h-full outline-none bg-transparent' />
                            <div className='cursor-pointer text-xl' onClick={() => setShowPassword((preve) => !preve)}>
                                <span>
                                    {
                                        showPassword ? (
                                            <FaEyeSlash />
                                        )
                                            :
                                            (
                                                <FaEye />
                                            )
                                    }
                                </span>
                            </div>
                        </div>

                    </div>

                    <div>
                        <label>Confirm Password </label>
                        <div className='bg-slate-100 p-2 flex'>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder='enter confirm password'
                                value={data.confirmPassword}
                                name='confirmPassword' required
                                onChange={handleOnChange}
                                className='w-full h-full outline-none bg-transparent' />
                            <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((preve) => !preve)}>
                                <span>
                                    {
                                        showConfirmPassword ? (
                                            <FaEyeSlash />
                                        )
                                            :
                                            (
                                                <FaEye />
                                            )
                                    }
                                </span>
                            </div>
                        </div>

                    </div>

                    <button className='hover:bg-red-700 bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>SignUp</button>

                </form>

                <p className='my-5'>You already have an account..?<Link to={"/login"} className=' text-red-600 hover:text-red-700 hover:underline p-1'>Log in</Link></p>
            </div>


        </div>
    </section >
)
}

export default SignUpForm*/


import { useForm } from "react-hook-form"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const navigate= useNavigate()
  const onSubmit =async (data) => {
 //axios.post('http://localhost:3000/api/v1/admin/signup', data, {withCredentials:true})
 axios.post(`${import.meta.env.VITE_BASE_URL}/admin/signup`, data, {withCredentials:true})
 .then(res=>{
  console.log(res)
  toast.success('Admin signed up successfully!');
  navigate('/login');
 })
 .catch(error=>{
    if (error.response && error.response.status === 409) {
        // Assuming 409 Conflict is the status code for already registered email
        toast.error('User already exists. Please use a different email.');
      } else {
        toast.error('Signup failed. Please try again.');
      }
      console.log(error);
      navigate('/signup');
 })

  }

//console.log(watch("example")) // watch input value by passing the name of it

  return (
   
<>
<h2 className="text-2xl font-semibold text-center p-4">Admin SignUp</h2>
    <form className="w-full max-w-2xl py-8 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} >
         <div className="flex flex-col gap-2">
            <label htmlFor="name"> Name</label>
            <input className="border border-slate-400" {...register("name", {required:true, maxLength:40})} />
             {errors.name?.type==="required" && <span className="text-xs text-red-400">Name is required</span>}
             {errors.name?.type==="maxLength" && <span className="text-xs text-red-400"> Name cannot exceed 40 characters</span>}
        </div>

        
        
        <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input className="border border-slate-400" {...register("email", {required:true, maxLength:40})} />
             {errors.email?.type==="required" && <span className="text-xs text-red-400"> Email is required</span>}
             {errors.email?.type==="maxLength" && <span className="text-xs text-red-400"> Email cannot exceed 40 characters</span>}
        </div>
        <div className="flex flex-col gap-2 ">
            <label htmlFor="password">Password</label>
            <input type="password" className="border border-slate-400"  {...register("password" , {required:true})} />
            {errors.password?.type==="required" && <span className="text-xs text-red-400"> Password is required</span>}
        </div>
      
        <div className="flex justify-center">
        <input className="bg-green-500 px-4 h-10 text-white hover:bg-green-400 cursor-pointer" type="submit" value="Signup"/>
   
        </div>

        <div className="flex gap-2">
        <p>You already have an account?</p>
        <Link to={'/login'}> <span className="text-sm text-red-600 hover:underline">Login</span> </Link>
        </div>


    </form>
    </>
  )
}
