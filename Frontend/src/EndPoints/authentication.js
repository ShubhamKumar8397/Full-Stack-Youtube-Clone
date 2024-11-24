import axios from 'axios';


const api = axios.create({
  baseURL: '/v1/api/users', // Replace with your base URL
});

const createAccount = async (formData) => {
    try {
        console.log(formData)
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

const logoutUser = async (data) => {
    try {
        const response = await api.post('/logoutUser')
        return response
    } catch (error) {
        throw error.response
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

const changePassword = async (data) => {
    try {
        const response = await api.patch('/changePassword', data)
        
        return response.data
    } catch (error) {
        throw error.response.data
    }
}

const getCurrentUser = async () => {
    try {
        const response = await api.get('/getCurrentUser')
        return response.data.data
    } catch (error) {
        throw error
    }
}



export {
    api, 
    createAccount, 
    loginUser, 
    checkUsernameAvailable, 
    changePassword,
    getCurrentUser,
    logoutUser
}
