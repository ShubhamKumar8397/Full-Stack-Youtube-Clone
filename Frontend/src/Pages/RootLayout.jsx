import React from 'react'
import { Header, Sidebar } from '../Components'
import { Outlet } from 'react-router-dom'



const RootLayout = () => {

    
    return (
        <>
            <div className="h-screen overflow-y-auto bg-[#121212] text-white">
                <Header />
                <Sidebar/>
            </div>




        </>
    )
}

export default RootLayout