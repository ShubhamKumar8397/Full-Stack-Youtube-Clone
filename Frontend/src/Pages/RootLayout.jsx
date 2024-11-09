import React from 'react'
import { Header, Sidebar } from '../Components'
import { Outlet } from 'react-router-dom'



const RootLayout = () => {


    return (
        <>
            <div className="h-screen overflow-y-auto bg-[#121212] text-white">
                <Header />
                <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
                    <Sidebar />
                </div>

            </div>

        </>
    )
}

export default RootLayout