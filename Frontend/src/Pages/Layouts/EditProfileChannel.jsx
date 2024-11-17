import React, { useEffect, useState } from 'react'
import { Form, Link, NavLink, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useGetChannelProfile } from '../../ReactQueryAndMutations/ChannelQueries'
import { useSelector } from 'react-redux'
import { ModalForPreviewImage } from '../../Components'
import { useUpdateAvatar, useUpdateCoverImage } from '../../ReactQueryAndMutations/AuthenticationQueries'
import { toast } from 'react-toastify'


const EditProfileChannel = () => {

    const { pathname } = useLocation()
    const { username } = useParams()
    const navigate = useNavigate()


    const paths = [
        {
            title: "Personal Information",
            to: 'edit-personal'
        },
        {
            title: "Channel Information",
            to: 'edit-channel'
        },
        {
            title: "Change Password",
            to: 'edit-password'
        }

    ]
    
    const {mutateAsync:updateAvatar} = useUpdateAvatar()
    const {mutateAsync:updateCoverImage } = useUpdateCoverImage()
    const [isLoading, setIsLoading] = useState()

    const [selectedImage, setSelectedImage] = useState("");
    const [inputImageFor, setInputImageFor] = useState("")
    const user = useSelector(state => state.user.user)

    const handleImagePreviewModal = (event) => {
        console.log(event.target.name)
        setSelectedImage(event.target.files[0])
        if (event.target.name == "avatar") {
            setInputImageFor("Avatar")
        } else {
            setInputImageFor("Cover Image")
        }

    }

    


    const handleSaveImageChanges = async () => {
        const formData = new FormData();
        setIsLoading(true)
        try {
            if(inputImageFor == "Avatar"){
               formData.append("avatar", selectedImage)
               const response = await updateAvatar(formData)
               if(response){
                toast.success("Avatar Successfully Updated")
               }
            }else{
                formData.append("coverImage", selectedImage)
                const response = await updateCoverImage(formData)
                if(response){
                    toast.success("Cover Image Successfully Updated")
                }
                
            }
            setIsLoading(false)
            setSelectedImage("")
        } catch (error) {
            setIsLoading(false)
            toast.error(error?.message)
            
        }
    }

    useEffect(() => {
        if (user?.username !== username) {
            
            return <h1>Dont</h1>
        }
    },[])
    



    return (
        <>
            <div className="relative min-h-[150px] w-full pt-[16.28%]">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        className='object-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain'
                        src={user.coverImage?.url ? user.coverImage.url : "https://images.pexels.com/photos/1092424/pexels-photo-1092424.jpeg?auto=compress"}
                        alt="cover-photo" />
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <input
                        type="file"
                        id="coverImage"
                        name='coverImage'
                        className="hidden" 
                        onChange={(event) => handleImagePreviewModal(event)}
                    />
                        
                    <label
                        htmlFor="coverImage"
                        className="inline-block h-10 w-10 cursor-pointer rounded-lg bg-white/60 p-1 text-[#ae7aff] hover:bg-white">
                        <img src="../Public/Logo/upload.svg" alt="" />
                    </label>
                </div>
            </div>
            <div className="px-4 pb-4">
                <div className="flex flex-wrap gap-4 pb-4 pt-6">
                    <div className="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2">
                        <img
                            src={user.avatar.url}
                            alt="Channel"
                            className="h-full w-full object-cover object-center" />
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            <input
                                type="file"
                                id='avatar'
                                className="hidden"
                                name='avatar'
                                onChange={(event) => handleImagePreviewModal(event)}
                            />

                            <label

                                htmlFor="avatar"
                                className="inline-block h-8 w-8 cursor-pointer rounded-lg bg-white/60 p-1 text-[#ae7aff] hover:bg-white">
                                <img src="../Public/Logo/upload.svg" alt="" />
                            </label>
                        </div>
                    </div>
                    <div className="mr-auto inline-block">
                        <h1 className="font-bolg text-xl">{user.fullname}</h1>
                        <p className="text-sm text-gray-400">@{user.username}</p>
                    </div>
                    <div className="inline-block">
                        <Link to={`/${username}`}>
                            <button
                                className="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
                                View channel
                            </button>
                        </Link>
                    </div>
                </div>
                <ul className="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">

                    {
                        paths.map((cur) => {
                            const isActive = pathname === `/${username}/${cur.to}`

                            return (
                                <NavLink key={cur.title} to={`/${username}/${cur.to}`}>
                                    <li className="w-full"><button className={`w-full   px-3 py-1.5 ${isActive ? "text-[#ae7aff] bg-white border-[#ae7aff] " : "text-white"}`}>{cur.title}</button></li>
                                </NavLink>
                            )

                        })
                    }
                </ul>
                <Outlet />

            </div>

            {
                selectedImage && (
                    <div className="fixed z-[999] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <ModalForPreviewImage
                            cancel={() => setSelectedImage("")}
                            saveChanges={handleSaveImageChanges}
                            imageFile={selectedImage}
                            imageFor={inputImageFor}
                            loading = {isLoading}
                        />
                    </div>
                )
            }



        </>
    )
}

export default EditProfileChannel