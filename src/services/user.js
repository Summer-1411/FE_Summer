import { useMutation, useQuery, useQueryClient } from 'react-query'
import { request } from "../requestMethod"
import { toast } from 'react-toastify';
import { toastOption } from '../constants';

export function useGetListUser(params) {
    const { data: response, ...props } = useQuery(
        ['list-user-admin', params],
        () => {
            return request.post(`/v1/user/filter`, params)
        },

    )
    return {
        listUser: response?.data?.data ?? []
    }
}

export function useDeleteUser() {
    const queryClient = useQueryClient()
    return useMutation(
        'DELETE_USER',
        (id) => {
            return request.put(`/user/delete/${id}`)
        },
        {
            onSuccess: async (data, variables, context) => {
                toast.success(data?.data?.message, toastOption);
                await queryClient.invalidateQueries('list-user-admin')
            },
            onError: (error, variables, context) => {
                toast.error(error?.message, toastOption);
            },
        }
    )
}

export function useRestoreUser() {
    const queryClient = useQueryClient()
    return useMutation(
        'RESTORE_USER',
        (id) => {
            return request.put(`/user/cancel-delete/${id}`)
        },
        {
            onSuccess: async (data, variables, context) => {
                toast.success(data?.data?.message, toastOption);
                await queryClient.invalidateQueries('list-user-admin')
            },
            onError: (error, variables, context) => {
                toast.error(error?.message, toastOption);
            },
        }
    )
}
