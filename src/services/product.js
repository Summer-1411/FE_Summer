
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { request } from "../requestMethod"
import { toast } from 'react-toastify';
import { toastOption } from '../constants';


export function useCreateProduct() {
    const queryClient = useQueryClient()
    return useMutation(
        'create-product',
        (params) => {
            return request.post(`/product/create-update`, params)
        },
        {
            onSuccess: async (data) => {
                await queryClient.invalidateQueries('list-product')
                toast.success("Lưu dữ liệu thành công", toastOption);
            },
            onError: async (error) => {
                toast.error("Lưu dữ liệu thất bại !", toastOption);
            }
        }
    )
}

export function useGetProduct(params) {
    const { data: response, ...props } = useQuery(
        ['list-product-admin', params],
        () => {
            return request.post(`/product/search-admin`, params)
        },

    )
    return {
        productList: response?.data?.data ?? []
    }
}

export function useDeleteProduct() {
    const queryClient = useQueryClient()
    return useMutation(
        'DELETE_PRODUCT',
        (id) => {
            return request.put(`/product/delete/${id}`)
        },
        {
            onSuccess: async (data, variables, context) => {
                toast.success(data?.data?.message, toastOption);
                await queryClient.invalidateQueries('list-product-admin')
            },
            onError: (error, variables, context) => {
                toast.error(error?.message, toastOption);
            },
        }
    )
}