import axios from "axios";


const commentApi = axios.create(
    {
        baseURL : '/v1/api/comment'
    }
)


const commentOnVideo = async (formData) => {
    const {content , videoId} = formData
    try {
        const response = await commentApi.post(`/createVideoComment/${videoId}`, {content})
        
        return response.data
    } catch (error) {
        throw error.response
    }
}


const getAllVideoComments = async({videoId}) => {
    try {
        const response = await commentApi.get(`/getAllVideoComments/${videoId}`)
        return response.data.data
    } catch (error) {
        throw error.response
    }
}

export {
    commentOnVideo,
    getAllVideoComments,
}