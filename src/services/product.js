
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { request } from "../requestMethod"
import { toast } from 'react-toastify';
import { toastOption } from '../constants';


export function useCreateProduct() {
    const queryClient = useQueryClient()
    return useMutation(
        'create-product',
        (params) => {
            return request.post(`/v1/product/create`, params)
        },
        {
            onSuccess: async (data) => {
                console.log('123');
                await queryClient.invalidateQueries('list-product-admin')
                toast.success("Lưu dữ liệu thành công", toastOption);
            },
            onError: async (error) => {
                toast.error("Lưu dữ liệu thất bại !", toastOption);
            }
        }
    )
}

export function useUpdateProduct() {
    const queryClient = useQueryClient()
    return useMutation(
        'update-product',
        (params) => {
            return request.post(`/v1/product/update`, params)
        },
        {
            onSuccess: async (data) => {
                console.log('123');
                await queryClient.invalidateQueries('list-product-admin')
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

export function useGetProductById(params) {
    const { data: response, ...props } = useQuery(
        ['list-product-id', params],
        () => {
            return request.get(`/v1/product/find/${params}`)
        },
        {
            enabled: !!params
        }
    )

    return response?.data?.data ?? {}
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