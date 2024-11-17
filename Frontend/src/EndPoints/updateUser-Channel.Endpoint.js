import { api } from "./authentication"




const updatePersonalInformation = async (data) => {
    
    try {
        const response = await api.patch('/updatePersonalDetails', data)
        return response.data.data
    } catch (error) {
        throw error.response.data
    }
}

const updateChannelInformation = async (data) => {
    try {
        const response = await api.patch('/updateChannelDetails', data)
        return response.data.data
    } catch (error) {
        throw error.response.data
    }
}

const updateAvatar = async (data) => {
    try {
        const response = await api.patch('/updateAvatar', data)
        return response.data
    } catch (error) {
        throw error.response
    }
}

const updateCoverImage = async (data) => {
    try {
        const response = await api.patch('/updateCoverImage', data)
        return response.data
    } catch (error) {
        throw error.response
    }
}

export {
    updatePersonalInformation,
    updateChannelInformation,
    updateAvatar,
    updateCoverImage
}