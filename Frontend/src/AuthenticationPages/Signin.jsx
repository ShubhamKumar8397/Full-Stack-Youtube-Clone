import React from 'react'
import { Input } from '../Components'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginAccountMutation } from '../ReactQueryAndMutations/AuthenticationQueries'
import {useDispatch, useSelector} from "react-redux"
import { login } from '../Redux/ReduxSlice/userSlice'
import { toast } from 'react-toastify'


const Signin = () => {

    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {mutateAsync : loginUser, isLoading, isError} = useLoginAccountMutation()
    
    const handleLogin = (input) => {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
        return isEmail ? "isEmail" : "isUsername"

    };

    const onSubmit = async (data) => {
       try {
         const field = handleLogin(data.userField)

         if (field === "isEmail") {
             data.email = data.userField
         } else {
             data.username = data.userField
         }
         delete data.userField
         const user = await loginUser(data)
         console.log(user)
         if(user){
            dispatch(login(user))
         }
         toast.success("Login Successfully")
         navigate('/')
         
       } catch (error) {
            toast.error(error.message)
            console.log(error)
       }

    }

    return (
        <div>
            <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                <Input placeholder={"Username or Email"} label={"Username / email *"} register={register} name={"userField"} required={true} />
                <Input type={"password"} label={"Password *"} register={register} name={"password"} required={true} />
                <button type='submit' className="bg-[#ae7aff] px-4 py-3 text-black">
                    {isLoading ? "Signing In..." : "Sign In With Email/Username"}
                </button>
            </form>
            <div className='mt-1 flex justify-between'>
                <Link className='text-blue-300' to={'/signup'} >Don't Have An Account</Link>
                <Link className='text-blue-300'>Forgot password</Link>
            </div>
        </div>
    )
}


export default Signin