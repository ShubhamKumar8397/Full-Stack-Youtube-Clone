import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAccount } from "../EndPoints/Authentication"

// const queryClient = useQueryClient();


export const useCreateAccountMutation = () => {
    return useMutation({
        mutationFn : (formData) => createAccount(formData)
    })
}