import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { changePassword, createAccount, getCurrentUser, loginUser, logoutUser } from "../EndPoints/authentication"
import { updateAvatar, updateChannelInformation, updateCoverImage, updatePersonalInformation } from "../EndPoints/updateUser-Channel.Endpoint"


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

export const useGetCurrentUser = () => {
    return useQuery({
        queryFn : () => getCurrentUser(),
        queryKey : ["getCurrentUser"]
    })
}

export const useUpdatePersonalDetails = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : (data) => updatePersonalInformation(data),
        onSuccess : () => {
            queryClient.invalidateQueries(["getCurrentUser"])
        }
    })
}


export const useUpdateChannelDetails = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : (data) => updateChannelInformation(data),
        onSuccess : () => {
            queryClient.invalidateQueries(["getCurrentUser"])
        }
    })
}

export const useChangePassword = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : (data) => changePassword(data),
        onSuccess : () => {
            queryClient.invalidateQueries(["getCurrentUser"])
        }
    })
}

export const useUpdateAvatar = () => {
    const queryClient = useQueryClient()
    return useMutation ({
        mutationFn : (data) => updateAvatar(data),
        onSuccess: () => {
            queryClient.invalidateQueries(['getCurrentUser'])
        }
    })
}


export const useUpdateCoverImage = () => {
    const queryClient = useQueryClient()
    return useMutation ({
        mutationFn : (data) => updateCoverImage(data),
        onSuccess: () => {
            queryClient.invalidateQueries(['getCurrentUser'])
        }
    })
}

