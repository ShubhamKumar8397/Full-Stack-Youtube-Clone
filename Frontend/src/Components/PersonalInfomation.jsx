import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import EditInput from './EditInput';


const PersonalInfomation = () => {

    const [formData, setFormData] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handlePersonalEdit = (event) => {
        event.preventDefault()
        console.log(formData)
    }



    return (
        <div className="flex flex-wrap justify-center gap-y-4 py-4">
            <div className="w-full sm:w-1/2 lg:w-1/3">
                <h5 className="font-semibold">
                    Personal Info</h5>
                <p className="text-gray-300">Update your photo and personal details.</p>
            </div>
            <form onSubmit={handlePersonalEdit} className="w-full sm:w-1/2 lg:w-2/3">
                <div className="rounded-lg border">
                    <div className="flex flex-wrap gap-y-4 p-4">
                        <EditInput
                            className={"lg:w-1/2"}
                            name={"firstName"}
                            label={"First Name"}
                            onChange={handleChange}
                        />

                        <EditInput
                            className={"lg:w-1/2"}
                            name={"lastName"}
                            label={"Last Name"}
                            onChange={handleChange}
                        />

                        <EditInput
                            name={"email"}
                            label={"Email"}
                            onChange={handleChange}
                        />

                    </div>
                    <hr className="border border-gray-300" />
                    <div className="flex items-center justify-end gap-4 p-4">
                        <button className="inline-block rounded-lg border px-3 py-1.5 hover:bg-white/10">Cancel</button>
                        <button type='Submit' className="inline-block bg-[#ae7aff] px-3 py-1.5 text-black">Save changes</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PersonalInfomation