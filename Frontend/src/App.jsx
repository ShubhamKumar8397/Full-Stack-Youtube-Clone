import axios from 'axios'
import React, { useEffect } from 'react'
import Home from './Pages/Home'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import RootLayout from './Pages/Layouts/RootLayout'
import AuthLayout from './AuthenticationPages/AuthLayout'
import Signup from './AuthenticationPages/Signup'
import Signin from './AuthenticationPages/Signin'
import EditProfileChannel from './Pages/Layouts/EditProfileChannel';

import { ChangePassword, EditChannelInFormation, PersonalInfomation } from './Pages';
import ChannelViewLayout from './Pages/Layouts/ChannelViewLayout';
import { useGetCurrentUser } from './ReactQueryAndMutations/AuthenticationQueries';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './Redux/ReduxSlice/userSlice';

const App = () => {

  const {mutateAsync:gettingCurrentUser, isLoading} = useGetCurrentUser()
  const dispatch = useDispatch()

  const handleGetCurrentUser = async () => {
      try {
        const response = await gettingCurrentUser()
        dispatch(login(response))
      } catch (error) {
        console.log(error)
      }
  }

  useEffect(() => {
    handleGetCurrentUser()
  },[])

  return (

    <>
      <Routes>
        
        <Route element={<AuthLayout />}>
          <Route path={'/signin'} element={<Signin />} />
          <Route path={'/signup'} element={<Signup />} />
        </Route>

        <Route element={<RootLayout />}>
          <Route path='/' element={<Home/>} />

          <Route path='/:username' element={<ChannelViewLayout/>}>
            
          </Route>

          <Route element={<EditProfileChannel/>}>
            <Route path='/:username/edit-personal' element={<PersonalInfomation/>} />
            <Route path='/:username/edit-channel' element={<EditChannelInFormation/>}/>
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