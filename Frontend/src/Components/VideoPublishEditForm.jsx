import React, { useState } from 'react'
import { usePublishVideo } from '../ReactQueryAndMutations/videoQueries';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const VideoPublishEditForm = () => {

    const navigate = useNavigate()


    // Handle file selection and preview
    const [videoSrc, setVideoSrc] = useState(null);
    const [videoPreviewSrc, setVideoPreviewSrc] = useState(null)

    const handleVideoChange = (event) => {
        const file = event.target.files[0];
        setVideoSrc(file)
        if (file) {
            const objectURL = URL.createObjectURL(file);
            setVideoPreviewSrc(objectURL);  // Set the video source
        }
    };

    // handle Thumbnail Selection or preview

    const [imageSrc, setImageSrc] = useState(null)
    const [imagePreviewSrc, setImagePreviewSrc] = useState(null)

    const handleImageChangeAndPreview = (event) => {
        const file = event.target.files[0];
        setImageSrc(file)
        if (file) {
            const objectURL = URL.createObjectURL(file);
            setImagePreviewSrc(objectURL)
        }
    }


    // handle form input change

    const [formdata, setFormdata] = useState("")

    const handleFormChange = (event) => {
        const { name, value } = event.target
        setFormdata({
            ...formdata,
            [name]: value
        })
    }


    // handle Form Submit for upload

    const { mutateAsync: publishVideo, isLoading: isPublishingVideo } = usePublishVideo()

    const handleVideoPublish = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('title', formdata.title)
        formData.append('description', formdata.description)
        formData.append('videoFile', videoSrc)
        formData.append('thumbnail', imageSrc)

        try {
            const response = await publishVideo(formData)
            toast.success("Video Uploaded Successfully")

        } catch (error) {
            console.log(error)
            toast.error(error.message || "Video Not Upload Try Again")
        }

    }

    return (

        <div className="relative w-full">
            <div className="h-full overflow-auto border bg-[#121212]">
                <div className="flex items-center justify-between border-b p-4">
                    <h2 className="text-xl font-semibold">Upload Videos</h2>
                </div>
                <form
                    onSubmit={(e) => handleVideoPublish(e)}
                    className="mx-auto flex w-full max-w-3xl flex-col gap-y-4 p-4">

                    {/* Video Preview And Change Event */}
                    {
                        videoSrc ?
                            (
                                <div className='border-2 border-dashed px-2 py-3'>
                                    <video
                                        className='w-full'
                                        width="500"
                                        controls
                                        src={videoPreviewSrc}
                                        style={{ border: '1px solid black' }}
                                    />
                                    <div className='flex justify-end gap-2 items-center mt-4'>
                                        <button
                                            className='hover:bg-gray-600 px-3 py-2 transition-all'
                                            onClick={() => setVideoSrc("")}
                                        >
                                            Cancel
                                        </button>
                                        <label
                                            htmlFor="video-upload"
                                            className="group/btn  inline-flex w-auto cursor-pointer items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
                                        >
                                            <input
                                                onChange={(event) => handleVideoChange(event)}
                                                type="file"
                                                id='video-upload'
                                                className='sr-only'
                                            />
                                            Select Another Video
                                        </label>


                                    </div>
                                </div>
                            )
                            :
                            <div className="w-full border-2 border-dashed px-4 py-12 text-center">
                                <span className="mb-4 inline-block w-24 rounded-full bg-[#E4D3FF] p-4 text-[#AE7AFF]">
                                    <img src="../Public/Logo/upload.svg" alt="" />
                                </span>

                                <p className="text-gray-400">Your videos will be private untill you publish them.</p>
                                <label
                                    htmlFor="upload-video"
                                    className="group/btn cursor-pointer mt-4 inline-flex w-auto  items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]">

                                    <input
                                        onChange={(event) => handleVideoChange(event)}
                                        type="file"
                                        id="upload-video"
                                        className="sr-only" />
                                    Select Files
                                </label>
                            </div>
                    }


                    {/* Image Preview and Change Event */}

                    {
                        imageSrc ?
                            <div className='w-full  border-2 border-dashed px-2 py-3'>
                                <h3 className='mb-2'>Image Ratio For Best Thumbnail View is 16:9 Ratio</h3>
                                <img
                                    className='w-full object-cover object-center'
                                    width="500"
                                    controls
                                    src={imagePreviewSrc}
                                    style={{ border: '1px solid black' }}
                                />
                                <div className='flex justify-end gap-2 items-center mt-4'>
                                    <button
                                        className='hover:bg-gray-600 px-3 py-2 transition-all'
                                        onClick={() => setImageSrc("")}
                                    >
                                        Cancel
                                    </button>
                                    <label
                                        htmlFor="image-upload"
                                        className="group/btn  inline-flex w-auto cursor-pointer items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
                                    >
                                        <input
                                            onChange={(event) => handleImageChangeAndPreview(event)}
                                            type="file"
                                            id='image-upload'
                                            className='sr-only'
                                        />
                                        Select Another Image
                                    </label>
                                </div>
                            </div>
                            :
                            <div className="w-full">
                                <label
                                    htmlFor="thumbnail"
                                    className="mb-1 inline-block">
                                    Thumbnail
                                    <sup>*</sup>
                                </label>
                                <input
                                    onChange={(event) => handleImageChangeAndPreview(event)}
                                    id="thumbnail"
                                    type="file"
                                    className="w-full border cursor-pointer file:cursor-pointer p-1 file:mr-4 file:border-none file:bg-[#ae7aff] file:px-3 file:py-1.5" />
                            </div>
                    }

                    <div className="w-full">
                        <label
                            htmlFor="title"
                            className="mb-1 inline-block">
                            Title
                            <sup>*</sup>
                        </label>
                        <input
                            onChange={handleFormChange}
                            name="title"
                            id="title"
                            type="text"
                            className="w-full border bg-transparent px-2 py-1 outline-none" />
                    </div>
                    <div className="w-full">
                        <label
                            htmlFor="desc"
                            className="mb-1 inline-block">
                            Description
                            <sup>*</sup>
                        </label>
                        <textarea
                            onChange={handleFormChange}
                            name="description"
                            id="desc"
                            className="h-40 w-full resize-none border bg-transparent px-2 py-1 outline-none">

                        </textarea>
                    </div>

                    {/* publish or not buttons  */}

                    <div className="flex items-center justify-end border-b p-4 gap-4 ">
                        <button
                            className='hover:bg-gray-600 px-3 py-2 transition-all'
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </button>

                        <button
                            type='submit'
                            className="group/btn mr-1 flex w-auto items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]">
                            Publish Video
                        </button>
                    </div>
                </form>

            </div>
        </div>

    )
}

export default VideoPublishEditForm