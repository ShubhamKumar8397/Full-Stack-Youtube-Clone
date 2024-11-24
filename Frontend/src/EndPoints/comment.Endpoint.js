import axios from "axios";


const commnetApi = axios.create(
    {
        baseURL : '/v1/api/comment'
    }
)


const commentOnVideo = async (formData) => {
    const {content , videoId} = formData
    try {
        const response = await commnetApi.post(`/createVideoComment/${videoId}`, {content})
        return response.data
    } catch (error) {
        throw error.response
    }
}

export {
    commentOnVideo
}