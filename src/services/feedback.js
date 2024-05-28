
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { request } from "../requestMethod"
import { toast } from 'react-toastify';
import { toastOption } from '../constants';
import { useSelector } from 'react-redux';
export function useGetFeedbackUser() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const { data: response, ...props } = useQuery(
        ['list-feedback',currentUser],
        () => {
            return request.get(`/feedback/by-user/`)
        },

    )
    return {
        feedbackList: response?.data?.data ?? []
    }
}

export function useGetFeedbackProduct(productId) {
    const { data: response, ...props } = useQuery(
        ['list-feedback-product', productId],
        () => {
            return request.get(`/feedback/by-product/${productId}`)
        },

    )
    return {
        feedbackListProduct: response?.data?.data ?? []
    }
}

export function useSendFeedback() {
    const queryClient = useQueryClient()
    return useMutation(
        'SEND_FEEDBACK',
        (params) => {
            return request.post('/feedback/create', params)
        },
        {
            onSuccess: async (data, variables, context) => {
                toast.success(data?.data?.message, toastOption);
                await queryClient.invalidateQueries('list-feedback')
            },
            onError: (error, variables, context) => {
                toast.error(error?.message, toastOption);
            },
        }
    )
}

export function useUpdateFeedback() {
    const queryClient = useQueryClient()
    return useMutation(
        'UPDATE_FEEDBACK',
        ({id, params}) => {
            console.log('params', params);
            return request.put(`/feedback/update/${id}`, params)
        },
        {
            onSuccess: async (data, variables, context) => {
                toast.success(data?.data?.message, toastOption);
                await queryClient.invalidateQueries('list-feedback')
            },
            onError: (error, variables, context) => {
                toast.error(error?.message, toastOption);
            },
        }
    )
}