import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div>
            <div className="h-screen overflow-y-auto bg-[#121212] text-white">
                <div className="mx-auto my-8 flex w-full max-w-sm flex-col px-4">
                    <div className="mx-auto inline-block w-16">
                        <img  src="./Logo/tubelogo.svg" alt="" />
                    </div>
                    <div className="mb-6 w-full text-center text-2xl font-semibold uppercase">Play</div>
                        <Outlet/>
                </div>
            </div>
        </div>
  )
}

export default AuthLayout