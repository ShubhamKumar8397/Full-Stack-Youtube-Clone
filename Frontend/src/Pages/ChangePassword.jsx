import React, { useState } from 'react'
import { EditInput } from '../Components'

const ChangePassword = () => {


    const [formData, setFormData] = useState()

    const handleChange = (event) => {
        const {name, value} = event.target 
        setFormData({
            ...formData,
            [name] : value
        })
    }

    
    
    const handleChangePassword = (event) => {
        event.preventDefault()
        console.log(formData)

    }


    return (
        <div className="flex flex-wrap justify-center gap-y-4 py-4">
            <div className="w-full sm:w-1/2 lg:w-1/3">
                <h5 className="font-semibold">Password</h5>
                <p className="text-gray-300">Please enter your current password to change your password.</p>
            </div>
            <div className="w-full sm:w-1/2 lg:w-2/3">
                <form className="rounded-lg border" onSubmit={handleChangePassword}>
                    <div  className="flex flex-wrap gap-y-4 p-4">

                        <EditInput onChange={handleChange} name={"currentPassword"} label={"Current Password"} />
                        <EditInput onChange={handleChange} name={"newPassword"} label={"New Password"} />
                        <EditInput onChange={handleChange} name={"confirmPassword"} label={"Confirm Password"} />

                    </div>
                    <hr className="border border-gray-300" />
                    <div className="flex items-center justify-end gap-4 p-4">
                        <button className="inline-block rounded-lg border px-3 py-1.5 hover:bg-white/10">Cancel</button>
                        <button type='submit' className="inline-block bg-[#ae7aff] px-3 py-1.5 text-black">Update Password</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword