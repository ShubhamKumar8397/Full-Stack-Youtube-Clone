import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getChannelProfile, SubscribeChannel, unsubscribeChannel } from "../EndPoints/channel"


export const useGetChannelProfile = ({username}) => {
    return useQuery({
        queryFn : () => getChannelProfile({username}),
        queryKey : ["getChannelProfile", username],
        staleTime: 1000 * 60 * 5
    })
}

export const useChannelSubscribe = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : ({username}) => SubscribeChannel({username}),
        onSuccess: () => {
            queryClient.invalidateQueries(["getChannelProfile"])
        }
    })
}

export const useChannelUnsubscribe = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : ({username}) => unsubscribeChannel({username}),
        onSuccess : () => {
            queryClient.invalidateQueries(["getChannelProfile"])
        }

    })
}


