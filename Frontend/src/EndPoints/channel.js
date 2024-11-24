import axios from "axios";
import { api } from "./authentication";

const subsApi = axios.create({
    baseURL : "/v1/api/subscription"
})

const videoApi = axios.create({
    baseURL : "/v1/api/video"
})


const getChannelProfile = async ({username}) => {
    try {
        const response = await api.get(`/getChannelProfile/${username}`)
        return response.data.data
    } catch (error) {
        throw error.response.data
    }
}

const SubscribeChannel = async({username}) => {
    try {
        const response = await subsApi.post(`/subscribeToChannel/${username}`)
        return response.data
    } catch (error) {
        throw error.response
    }
} 

const unsubscribeChannel = async({username}) => {
    try {
        const response = await subsApi.delete(`/unsubscribeToChannel/${username}`)
        return response.data
    } catch (error) {
        throw error.response
    }
}


// const getAllVideosOfChannel = async({username}) => {
//     try {
//         console.log(username)
//         const response = await videoApi.get(`/${username}/getAllChannelVideos`)
//         return response.data.data
//     } catch (error) {
//         throw error.response
//     }
// }


const getAllVideosOfChannel = async({pageParam = 1, username}) => {
    try {

        const response = await videoApi.get(`/${username}/getAllChannelVideos?page=${pageParam}`, {pageParam},
            { headers: { 'Content-Type': 'application/json' } }
        )

        return response.data.data

    } catch (error) {
        throw error.response
    }
}


export {
    videoApi,
    getChannelProfile,
    SubscribeChannel,
    unsubscribeChannel,
    getAllVideosOfChannel
}