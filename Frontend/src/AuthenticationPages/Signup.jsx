import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { Input } from '../Components'
import { useCreateAccountMutation } from '../ReactQueryAndMutations/AuthenticationQueries'
import { Link, useNavigate } from 'react-router-dom'
import { checkUsernameAvailable } from '../EndPoints/authentication'
import { toast } from 'react-toastify'

const Signup = () => {

    const [avatar, setAvatar] = useState("")
    const [coverImage, setCoverImage] = useState("")
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { mutateAsync: createAccount, isLoading, isError } = useCreateAccountMutation()
    const navigate = useNavigate()

    // for debouncing of check the username
    const [usernameCheck, setUsernameCheck] = useState('')
    const [isUserNameAvailable, setIsUsernameAvailable] = useState('')

    const handleOnChangeUsername = (e) => {
        setUsernameCheck(e.target.value)
    }

    const handleUsernameAvailable = async () => {
        const response = await checkUsernameAvailable(usernameCheck)
        if (response.available) {
            setIsUsernameAvailable(true)
        } else {
            setIsUsernameAvailable(false)
        }

    }

    useEffect(() => {
        const debounceUsernameCheck = setTimeout(() => {
            if (usernameCheck) {
                handleUsernameAvailable()
            }
        }, 500);

        return () => clearTimeout(debounceUsernameCheck)
    }, [usernameCheck])


    const onSubmit = async (data) => {

        try {
            const formData = new FormData();
            formData.append('fullname', data.fullname);
            formData.append('username', usernameCheck);
            formData.append('email', data.email);
            formData.append('password', data.password);
            formData.append('avatar', avatar)
            formData.append('coverImage', coverImage)
            console.log(formData)

            const response = await createAccount(formData)
            if(response){
                toast.success("User Successfully Register")
                toast.info("Just Login To Your Account")
            }
            navigate('/signin')
            console.log(response)
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }


    return (

        <div>
            <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label={"Full Name*"}
                    register={register}
                    name={"fullname"}
                    required={true}
                />

                <div className='relative flex flex-col '>
                    <label
                        htmlFor="Username">
                        Username
                    </label>
                    <input
                        className='mb-1 rounded-lg border bg-transparent px-3 py-2'
                        type="text"
                        onChange={handleOnChangeUsername} />
                    {
                        usernameCheck && (
                            <img
                                className={` p-[2px] rounded-full absolute right-3 bottom-[10px]`}
                                src={isUserNameAvailable ? "./Logo/check.svg" : "./Logo/wrong.svg"}
                                alt="" />
                        )
                    }
                </div>

                {
                    usernameCheck && (
                        <p className={`mb-2 ${isUserNameAvailable ? "text-green-400" : "text-red-400"}`} >{isUserNameAvailable ? "Username is Available" : "Username not Available"}</p>
                    )
                }

                <Input
                    label={"Email*"}
                    register={register}
                    name={"email"}
                    required={true}
                />

                <label
                    htmlFor="avatar">
                    Avatar
                </label>
                <input
                    className='mb-4 rounded-lg border bg-transparent px-3 py-2'
                    type="file"
                    onChange={(e) => setAvatar(e.target.files[0])} />
                <label
                    className='' htmlFor="coverImage">
                    Cover Image
                </label>
                <input
                    className='mb-4 rounded-lg border bg-transparent px-3 py-2'
                    type="file"
                    onChange={(e) => setCoverImage(e.target.files[0])}
                />

                <Input
                    label={"Password*"}
                    register={register}
                    name={"password"}
                    required={true} />
                <button type='submit' className="bg-[#ae7aff] px-4 py-3 text-black">
                    {isLoading ? "Signing Up ...." : "Sign Up With Email"}
                </button>
            </form>
            <div className='mt-1 flex justify-between'>
                <Link className='text-blue-300' to={'/signin'} >Login To Existing Account</Link>
            </div>
        </div>
    )
}

export default Signup