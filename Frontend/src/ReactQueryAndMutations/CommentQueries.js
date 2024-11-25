import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { commentOnVideo, getAllVideoComments } from "../EndPoints/comment.Endpoint"


export const useCreateCommentOnVideo = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : (formData) => commentOnVideo(formData),
        onSuccess : () => {
            queryClient.invalidateQueries(["getAllVideoComment"])
        }
    })
}


export const useGetAllVideoComment = ({videoId}) => {
    return useQuery({
        queryFn : () => getAllVideoComments({videoId}),
        queryKey : ["getAllVideoComment"]
    })
}