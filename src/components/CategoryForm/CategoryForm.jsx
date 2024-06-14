import { useForm } from "react-hook-form"
import axios from "axios"
export default function CategoryForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
 axios.post(`${import.meta.env.VITE_BASE_URL}/admin/add-category`, data,{withCredentials:true})
 .then(res=>{
  console.log(res)
 })
 .catch(error=>{
  console.log(error)
 })
  }

//console.log(watch("example")) // watch input value by passing the name of it

  return (
    


    <form className="w-full max-w-2xl py-8 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} >
        <div className="flex flex-col gap-2">
            <label htmlFor="title">Title</label>
            <input className="border border-slate-400" {...register("title", {required:true, maxLength:40})} />
             {errors.title?.type==="required" && <span className="text-xs text-red-400"> Title is required</span>}
             {errors.title?.type==="maxLength" && <span className="text-xs text-red-400"> Title cannot exceed 40 characters</span>}
        </div>
        <div className="flex flex-col gap-2 ">
            <label htmlFor="slug">Slug</label>
            <input className="border border-slate-400"  {...register("slug" , {required:true})} />
            {errors.slug?.type==="required" && <span className="text-xs text-red-400"> Slug is required</span>}
        </div>
        <div className="flex flex-col gap-2 ">
            <label htmlFor="thumbnail">Thumbnail</label>
            <input className="border border-slate-400"  {...register("thumbnail" , {required:true})} />
            {errors.thumbnail?.type==="required" && <span className="text-xs text-red-400"> Thumbnail is required</span>}
        </div>
        <div className="flex flex-col gap-2 ">
            <label htmlFor="description">Description</label>
            <input className="border border-slate-400"  {...register("description" , {required:true})} />
            {errors.description?.type==="required" && <span className="text-xs text-red-400"> Description is required</span>}
        </div>
        <div className="flex justify-center">
        <input className="bg-green-500 px-4 h-10 text-white hover:bg-green-400 cursor-pointer" type="submit" value="Add category"/>
        
        </div>




    </form>
  )
}