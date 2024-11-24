import { useMutation, useQuery } from "@tanstack/react-query"
import { getVideoById, publishVideo } from "../EndPoints/video.Endpoint"



export const useGetVideoById = ({videoId}) => {
    return useQuery({
        queryFn : () => getVideoById({videoId}),
        queryKey : ["getVideoById", videoId]
    })
}

export const usePublishVideo = () => {
    return useMutation({
        mutationFn : (formdata) => publishVideo(formdata)
    })
}