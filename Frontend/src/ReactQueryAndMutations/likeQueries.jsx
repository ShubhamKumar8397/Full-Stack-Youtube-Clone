import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toggleVideoLike } from "../EndPoints/like.Endpoint"


export const useToggleVideoLike = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : ({videoId}) => toggleVideoLike({videoId}),
        onSuccess : () => {
            queryClient.invalidateQueries(["getVideoById"])
        }
    })
}