import axios from 'axios'
import React, { useEffect } from 'react'
import Home from './Pages/Home'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import RootLayout from './Pages/RootLayout'
import AuthLayout from './AuthenticationPages/AuthLayout'
import Signup from './AuthenticationPages/Signup'
import Signin from './AuthenticationPages/Signin'
import EditProfileChannel from './Pages/EditProfileChannel';
import { EditChannelInformation, PersonalInfomation } from './Components';
import { ChangePassword } from './Pages';

const App = () => {

  return (

    <>
      <Routes>
        
        <Route element={<AuthLayout />}>
          <Route path={'/signin'} element={<Signin />} />
          <Route path={'/signup'} element={<Signup />} />
        </Route>

        <Route element={<RootLayout />}>
          <Route path='/' element={<Home/>} />

          <Route path='/:username' element={<EditProfileChannel/>}>
            <Route path='/:username/edit-personal' element={<PersonalInfomation/>} />
            <Route path='/:username/edit-channel' element={<EditChannelInformation/>}/>
            <Route path='/:username/edit-password' element={<ChangePassword/>}/>
          </Route>
        </Route>
      </Routes>


      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />

    </>

  )


}


export default App