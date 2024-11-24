import { videoApi } from "./channel"

const getVideoById = async ({videoId}) => {
    try {
        const response = await videoApi.get(`/getVideoById/${videoId}`)
        return response.data.data
    } catch (error) {
        throw error.response
    }
}

const publishVideo = async (formData) => {
    
    console.log(formData)
    try {
        const response = await videoApi.post('/publishVideo', formData)
        return response.data.data
    } catch (error) {
        throw error.response
    }
}

export {
    getVideoById,
    publishVideo
}