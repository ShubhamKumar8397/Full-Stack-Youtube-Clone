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
import { ChangePassword, ChannelAllVideos, EditChannelInFormation, PersonalInfomation } from './Pages';
import ChannelViewLayout from './Pages/Layouts/ChannelViewLayout';
import { useGetCurrentUser } from './ReactQueryAndMutations/AuthenticationQueries';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './Redux/ReduxSlice/userSlice';
import Check from './Components/PermanentComponents/Check';
import VideoPlayingPage from './Pages/VideoPlayingPage';
import UploadVideo from './Pages/UploadVideo';

const App = () => {

  const {data:currentUserData, isLoading:gettingCurrentUser, isError, error} = useGetCurrentUser()
  const dispatch = useDispatch()

  
  useEffect(() => {
    if(currentUserData){
      dispatch(login(currentUserData))
    }
  
  },[currentUserData])
 

  return (

    <>
      <Routes>
        
        <Route element={<AuthLayout />}>
          <Route path={'/signin'} element={<Signin />} />
          <Route path={'/signup'} element={<Signup />} />
        </Route>

        

        <Route element={<RootLayout />}>
          <Route path='/' element={<Home/>} />
          <Route path='/video/:videoId' element={<VideoPlayingPage/>}/>
          <Route path='/videoUpload' element={<UploadVideo/>} />

          <Route path='/:username' element={<ChannelViewLayout/>}>
            <Route path='/:username/Videos' element={<ChannelAllVideos/>}/>
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