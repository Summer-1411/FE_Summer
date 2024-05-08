
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { request } from "../requestMethod"
import { toast } from 'react-toastify';
import { toastOption } from '../constants';
export function useGetProduct(params) {
    const { data: response, ...props } = useQuery(
        ['list-product', params],
        () => {
            return request.post(`/product/search`, params)
        },

    )
    console.log('res', response);
    return {
        productList: response?.data?.data ?? []
    }
}

export function useGetCart(userId) {
    const { data: response, ...props } = useQuery(
        ['list-cart', userId],
        () => {
            return request.get(`/cart`)
        },
        { enabled: !!userId }
    )
    return {
        productCart: response?.data?.cart ?? []
    }
}

export function useInsertUpdateCart() {
    const queryClient = useQueryClient()
    return useMutation(
        'ADD_TO_CART',
        (params) => {
            return request.post('/cart/insert-update', params)
        },
        {
            onSuccess: async (data, variables, context) => {
                toast.success(data?.data?.message, toastOption);
                await queryClient.invalidateQueries('list-cart')
            },
            onError: (error, variables, context) => {
                toast.error(error?.message, toastOption);
            },
        }
    )
}

export function useDeleteProductInCart() {
    const queryClient = useQueryClient()
    return useMutation(
        'DLETE_PRODUCT_IN_CART',
        (idFilter) => {
            return request.delete(`/cart/delete/${idFilter}`)
        },
        {
            onSuccess: async (data, variables, context) => {
                toast.success(data?.data?.message, toastOption);
                await queryClient.invalidateQueries('list-cart')
            },
            onError: (error, variables, context) => {
                toast.error(error?.message, toastOption);
            },
        }
    )
}