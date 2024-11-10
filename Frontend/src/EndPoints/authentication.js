import axios from 'axios';


const api = axios.create({
  baseURL: '/v1/api/users', // Replace with your base URL
});

const createAccount = async (formData) => {
    console.log(formData)
    try {
        const response = await api.post('/registerUser', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json', // Ensure the client expects JSON in response
            }
        } )
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}


const checkUsernameAvailable = async (username) => {
    console.log(username)
    try {
        const response = await api.post('/usernameAvailable', {username})
        console.log(response.data.data)
        return response.data.data
    } catch (error) {
        
    }
}




export {api, createAccount, checkUsernameAvailable}
