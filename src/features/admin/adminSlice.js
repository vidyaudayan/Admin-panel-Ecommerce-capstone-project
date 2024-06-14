import { createSlice } from '@reduxjs/toolkit'

export const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    admin: null,
  },
  reducers: {
   setAdminDetails: (state,action)=>{
    state.admin= action.payload
console.log("admin details",action.payload)

   } 
  },
})

// Action creators are generated for each case reducer function
export const { setAdminDetails} = adminSlice.actions

export default adminSlice.reducer