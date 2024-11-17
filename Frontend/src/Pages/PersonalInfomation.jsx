import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { EditInput } from '../Components';
import { useUpdatePersonalDetails } from '../ReactQueryAndMutations/AuthenticationQueries';

import { toast } from 'react-toastify'

const PersonalInfomation = () => {

    const user = useSelector(state => state.user.user)
    const parts = user.fullname.split(" ")

    const [formData, setFormData] = useState({
        firstName : parts[0],
        lastName : parts[1] || "",
        email : user.email
    })

    const {mutateAsync: updatePersonalDetails, isLoading} = useUpdatePersonalDetails()

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handlePersonalEdit = async (event) => {
        try {
            event.preventDefault()
            if(!formData.firstName && !formData.email){
                toast.error("Required All Fields")
                return false
            }

            const fullName = formData.firstName + " " + formData?.lastName
            formData.fullname = fullName,
            delete formData.firstName 
            delete formData.lastName
    
            const response = await updatePersonalDetails(formData)
            toast.success("Details Updated Successfully")
            setFormData({
                firstName: response?.fullname.split(" ")[0] || "",
                lastName: response?.fullname.split(" ")[1] || "",
                email: response?.email || "",
            });

        } catch (error) {
            toast.error(error.message)
            
        }
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
                            value={formData.firstName}
                            onChange={handleChange}
                        />

                        <EditInput
                            className={"lg:w-1/2"}
                            name={"lastName"}
                            label={"Last Name"}
                            value={formData.lastName}
                            onChange={handleChange}
                        />

                        <EditInput
                            name={"email"}
                            label={"Email"}
                            value={formData.email}
                            onChange={handleChange}
                        />

                    </div>
                    <hr className="border border-gray-300" />
                    <div className="flex items-center justify-end gap-4 p-4">
                        <Link to={`/${user.username}`}>
                            <button  className="inline-block rounded-lg border px-3 py-1.5 hover:bg-white/10">Cancel</button>
                        </Link>
                        <button type='submit' className="inline-block bg-[#ae7aff] px-3 py-1.5 text-black">
                            {isLoading? 
                            <div className='flex gap-2'>
                                <img src="../Public/Logo/loading.svg" alt="" /> 
                                Saving Changes..
                            </div>
                            : "Save Changes" }
                        </button>
                        

                    </div>
                </div>
            </form>
        </div>
    )
}

export default PersonalInfomation