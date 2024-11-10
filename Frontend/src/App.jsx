import axios from 'axios'
import React, { useEffect } from 'react'
import Home from './Pages/Home'

import { Route, Routes } from 'react-router-dom'
import RootLayout from './Pages/RootLayout'
import AuthLayout from './AuthenticationPages/AuthLayout'
import Signup from './AuthenticationPages/Signup'
import Signin from './AuthenticationPages/Signin'

const App = () => {

  return (

    <Routes>

      <Route element={<AuthLayout />}>
        <Route path={'/signin'} element={<Signin />} />
        <Route path={'/signup'} element={<Signup />} />
      </Route>

      <Route element={<RootLayout />}>

      </Route>
    </Routes>

  )
}


export default App