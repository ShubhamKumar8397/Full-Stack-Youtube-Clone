import axios from 'axios'
import React, { useEffect } from 'react'
import Home from './Pages/Home'
import Signin from './Components/Signin'
import { Route, Routes } from 'react-router-dom'
import RootLayout from './Pages/RootLayout'

 const App = () => {

  return (
    
    <Routes>
      <Route element={<RootLayout/>}>
        <Route path={'/signin'} element={<Signin/>}/>
      </Route>
    </Routes>

  )
}


export default App