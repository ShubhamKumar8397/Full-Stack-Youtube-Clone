import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAccount, loginUser } from "../EndPoints/authentication"


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