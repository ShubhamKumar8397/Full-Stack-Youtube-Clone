import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { Input } from '../Components'
import { useCreateAccountMutation } from '../ReactQueryAndMutations/AuthenticationQueries'



const Signup = ({}) => {

    
    const [avatar, setAvatar] = useState("")
    const [coverImage, setCoverImage] = useState("")
    const {register, handleSubmit, formState: { errors }} = useForm()
    const {mutateAsync:createAccount , isPending , isError} = useCreateAccountMutation()


    const onSubmit = async (data) => {

        const formData = new FormData();
        formData.append('fullname', data.fullname);
        formData.append('username', data.username);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('avatar', avatar)
        formData.append('coverImage',  coverImage)

        console.log(formData)

        const response = await createAccount(formData)
        console.log(response)

    }


    return (
        <div>
            <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                <Input label={"Full Name*"} register={register} name={"fullname"}required={true} />
                <Input label={"Username*"} register={register} name={"username"} required={true} />
                <Input label={"Email*"} register={register} name={"email"} required={true} />
                <label htmlFor="avatar">Avatar</label>
                <input className='mb-4 rounded-lg border bg-transparent px-3 py-2' type="file" onChange={(e)=> setAvatar(e.target.files[0])} />
                <label className='' htmlFor="coverImage">Cover Image</label>
                <input className='mb-4 rounded-lg border bg-transparent px-3 py-2' type="file" onChange={(e)=> setCoverImage(e.target.files[0])} />
                <Input label={"Password*"} register={register} name={"password"} required={true} />
                <button type='submit' className="bg-[#ae7aff] px-4 py-3 text-black">Sign in with Email</button>
            </form>

            
        </div>
    )
}

export default Signup