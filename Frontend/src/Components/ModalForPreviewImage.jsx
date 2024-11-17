import React, { useEffect, useState } from 'react'
import { redirect } from 'react-router-dom'

const ModalForPreviewImage = ({ imageFile, imageFor, cancel, saveChanges, loading }) => {

    const [selectedImage, setSelectedImage] = useState("")

    useEffect(() => {
        if (imageFile) {

            console.log(imageFile)

            const reader = new FileReader();
            reader.onload = () => {
                console.log(reader)
                setSelectedImage(reader.result)
            }

            reader.readAsDataURL(imageFile);
        }
    }, [imageFile])



    return (
        imageFile && (
            <div className='w-full  sm:max-w-xl px-4 py-3 bg-gray-700 rounded-lg '>
                <h4 className='mb-2 font-medium'>Image Preview</h4>
                <div className='w-full h-full '>
                    <img className='w-full object-cover h-auto p-1 rounded-md' src={selectedImage} alt="" />
                </div>
                <div className='flex justify-end gap-2 mt-2 '>
                    <button onClick={cancel} className="inline-block rounded-lg border px-3 py-1.5 hover:bg-white/10">Cancel</button>
                    <button disabled={loading} onClick={saveChanges} className="inline-block rounded-sm bg-[#ae7aff] px-3 py-1.5 text-black">
                        {
                            loading ? 
                            <span className='flex gap-1'>
                                <img src="../Public/Logo/Loading.svg" alt="" className='mr-1' />
                                Saving Changes...
                            </span>
                            :
                            `Save ${imageFor}`

                        }
                    </button>
                </div>
            </div>
        )

    )
}

export default ModalForPreviewImage