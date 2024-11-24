import { useMutation } from "@tanstack/react-query"
import { commentOnVideo } from "../EndPoints/comment.Endpoint"


export const useCreateCommentOnVideo = () => {
    return useMutation({
        mutationFn : (formData) => commentOnVideo(formData)
    })
}