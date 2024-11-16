import axios from "axios";
import { api } from "./authentication";

const subsApi = axios.create({
    baseURL : "/v1/api/subscription"
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


export {
    getChannelProfile,
    SubscribeChannel,
    unsubscribeChannel
}