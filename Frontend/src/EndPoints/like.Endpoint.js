import axios from "axios";


const likeApi = axios.create({
    baseURL : "/v1/api/likes"
})


const toggleVideoLike = async ({videoId}) => {
    try {
        const response = await likeApi.post(`/toggleVideoLike/${videoId}`)
        return response.data
    } catch (error) {
        throw error.response
    }
}

export {
    toggleVideoLike
}