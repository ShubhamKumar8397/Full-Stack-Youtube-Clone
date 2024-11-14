import axios from 'axios';


const api = axios.create({
  baseURL: '/v1/api/users', // Replace with your base URL
});

const createAccount = async (formData) => {
    try {
        const response = await api.post('/registerUser', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json', // Ensure the client expects JSON in response
            }
        } )
        return response.data.data
    } catch (error) {
        throw error.response.data
    }
}

const loginUser = async (data) => {
    try {
        const response = await api.post('/loginUser', data)
        return response.data.data
    } catch (error) {
        throw error.response.data
    }
}

const checkUsernameAvailable = async (username) => {
    
    try {
        const response = await api.post('/usernameAvailable', {username})
        return response.data.data
    } catch (error) {
        throw error.response.data
    }
}


const updatePersonalInformation = async (data) => {
    
    try {
        const response = await api.post('/updatePersonalDetails', data)
        return response.data.data
    } catch (error) {
        throw error.response.data
    }
}

const updateChannelInformation = async (data) => {
    try {
        const response = await api.post('/updateChannelDetails', data)
        return response.data.data
    } catch (error) {
        throw error.response.data
    }
}

const changePassword = async (data) => {
    try {
        const response = await api.post('/changePassword', data)
        
        return response.data
    } catch (error) {
        throw error.response.data
    }
}

export {
    api, 
    createAccount, 
    loginUser, 
    checkUsernameAvailable, 
    updatePersonalInformation,
    updateChannelInformation,
    changePassword
}
