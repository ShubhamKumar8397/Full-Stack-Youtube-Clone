import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getAllVideosOfChannel, getChannelProfile, SubscribeChannel, unsubscribeChannel } from "../EndPoints/channel"



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
            queryClient.invalidateQueries(["getVideoById"])
        }
    })
}

export const useChannelUnsubscribe = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : ({username}) => unsubscribeChannel({username}),
        onSuccess : () => {
            queryClient.invalidateQueries(["getChannelProfile"])
            queryClient.invalidateQueries(["getVideoById"])
        }

    })
}


// export const useGetChannelAllVideos = ({username}) => {
//     return useQuery({
//         queryKey : ["getAllChannelVideos"],
//         queryFn : () => getAllVideosOfChannel({username})
//     })
// }


export const useGetChannelAllVideos = ({username}) => {
    return useInfiniteQuery({
        queryKey : ["getAllChannelVideos"],
        queryFn : ({pageParam= 1}) => getAllVideosOfChannel({pageParam, username}),
        getNextPageParam: (lastPage) => {
            return lastPage.hasNextPage ? lastPage.page + 1 : undefined;
        }
    })
}


