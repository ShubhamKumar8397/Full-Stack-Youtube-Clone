import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useLogoutUserMutation } from '../../ReactQueryAndMutations/AuthenticationQueries'
import { toast } from 'react-toastify'


const Header = () => {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const user = useSelector(state => state.user.user)

    const {mutateAsync:logoutUser, isLoading, isError, error} = useLogoutUserMutation()

    const handleLogout = async() => {
        try {
            const response = await logoutUser()
            console.log(response)
            toast.success("Successfully Logout")
        } catch (error) {
            toast.error(error.message)
        }
    }
    


    return (
        <>
            <header className="sticky inset-x-0 top-0 z-50 w-full border-b border-white bg-[#121212] px-4">
                <nav className="mx-auto flex max-w-7xl items-center py-2">
                    <img className='w-14' src="../Public/Logo/tubelogo.svg" alt="" />
                    <div className="relative mx-auto hidden w-full max-w-md overflow-hidden md:block">
                        <input
                            className="w-full border bg-transparent py-1 pl-8 pr-3 placeholder-white outline-none sm:py-2"
                            placeholder="Search" />
                        <span className="absolute left-2.5 top-1/2 inline-block -translate-y-1/2">
                            <img className='w-5' src="../Public/Logo/searchlogo.svg" alt="" />
                        </span>
                    </div>


                    {
                        !isAuthenticated && (
                            <>
                                <Link to={'/signin'}>
                                    <button className="hidden w-full bg-[#383737] px-3 py-2  hover:bg-[#4f4e4e] md:w-auto md:bg-transparent md:block">
                                        Log in
                                    </button>
                                </Link>
                                <Link to={'/signup'}>
                                    <button
                                        className="hidden mr-1 w-full bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] md:block md:w-auto">
                                        Sign up
                                    </button>
                                </Link>
                            </>
                        )
                    }

                    

                    {
                        isAuthenticated && (
                            <>
                                <button onClick={() => handleLogout()} className=' hidden w-full bg-[#383737] px-3 py-2 mr-4 cursor-pointer  hover:bg-[#4f4e4e] md:w-auto md:bg-transparent md:block' >Logout</button>
                                <Link to={`/${user.username}`}>
                                    <img className='w-12 h-12 object-fit border-2 cursor-pointer border-white rounded-full' src={user?.avatar.url} alt="" />
                                </Link>
                            </>
                        )
                    }




                    <button className="ml-auto md:hidden">
                        <img className='w-6 ' src="../Public/Logo/searchlogo.svg" alt="papa" />
                    </button>
                    <button className="group peer ml-4 flex w-6 shrink-0 flex-wrap gap-y-1.5 md:hidden">
                        <span className="block h-[2px] w-full bg-white group-hover:bg-[#ae7aff]"></span>
                        <span className="block h-[2px] w-2/3 bg-white group-hover:bg-[#ae7aff]"></span>
                        <span className="block h-[2px] w-full bg-white group-hover:bg-[#ae7aff]"></span>
                    </button>


                </nav>
            </header>
        </>
    )
}

export default Header