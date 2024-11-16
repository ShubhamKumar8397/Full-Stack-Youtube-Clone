import { useMutation, useQueryClient } from "@tanstack/react-query"
import { changePassword, createAccount, getCurrentUser, loginUser, logoutUser, updateChannelInformation, updatePersonalInformation } from "../EndPoints/authentication"


// const queryClient = useQueryClient();


export const useCreateAccountMutation = () => {
    return useMutation({
        mutationFn : (formData) => createAccount(formData)
    })
}

export const useLoginAccountMutation = () => {
    return useMutation({
        mutationFn : (data) => loginUser(data)
    })
}
export const useLogoutUserMutation = () => {
    return useMutation({
        mutationFn : () => logoutUser() 
    })
}

export const useUpdatePersonalDetails = () => {
    return useMutation({
        mutationFn : (data) => updatePersonalInformation(data)
    })
}

export const useUpdateChannelDetails = () => {
    return useMutation({
        mutationFn : (data) => updateChannelInformation(data)
    })
}

export const useChangePassword = () => {
    return useMutation({
        mutationFn : (data) => changePassword(data)
    })
}

export const useGetCurrentUser = () => {
    return useMutation({
        mutationFn : () => getCurrentUser()
    })
}