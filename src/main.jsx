import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './app/store'
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import  Root  from '../src/routes/root.jsx';
import ErrorPage from './error-page.jsx';
import Home from './pages/Home.jsx';
import LoginForm from './pages/Login.jsx';
import SignUpForm from './pages/Signup.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import AdminPanel from './AdminPages/AdminPanel.jsx'
import AllUsers from './AdminPages/AllUsers.jsx'
import AllProducts from './AdminPages/AllProducts.jsx'
import { usersLoader } from './AdminPages/AllUsers.jsx'
//import AddProduct from './AdminPages/AddProduct.jsx'
import AddCategory from './AdminPages/AddCategory.jsx'
import  {categoryLoader} from './components/UpdateProduct.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <Home/>,
      },
      {
        path: "/signup",
        element: <SignUpForm/>,
      },
      {
        path: "/login",
        element: <LoginForm/>,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword/>,
      },
     
      {
        path: "/admin-panel",
        element:<AdminPanel/>,
      
        
        children: [
          {
            path: "get-users",
            element: <AllUsers />,
            loader: usersLoader,
          },
          {
            path: "get-products",
            element: <AllProducts />,
            loader:categoryLoader
          },
          {
            path:'add-category',
            element:<AddCategory/>,
            
          },
          /*{
            path:'add-product',
            element:<AddProduct/>,
            loader:categoryLoader,
          },*/
          
         
         
        ],
      },
    
       
      
    ],
  },
]);


 
  
 

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
 <React.StrictMode>
    <RouterProvider router={router} />
  
  </React.StrictMode>,
  </Provider>
)
