import { useMutation } from "react-query";
import { request } from "../../../requestMethod";
import { toast } from 'react-toastify';
import { toastOption } from '../constants';
export function useSendFeedback() {
    return useMutation(
        'SEND_FEEDBACK',
        (params) => {
            return request.post('/feedback/create', params)
        },
        {
            onSuccess: async (data, variables, context) => {
                toast.success(data?.data?.message, toastOption);
            },
            onError: (error, variables, context) => {
                toast.error(error?.message, toastOption);
            },
        }
    )
}
