
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { request } from "../requestMethod"
import { toast } from 'react-toastify';
import { toastOption } from '../constants';


export function useGetOrderAdmin(params) {
    const { data: response, ...props } = useQuery(
        ['list-order-admin', params],
        () => {
            return request.post(`/v1/order/search`, params)
        },
    )
    return response?.data?.data ?? {}
}

export function useUpdateStatusOrder() {
    const queryClient = useQueryClient()
    return useMutation(
        'update-status-order',
        ({ query, params }) => {
            console.log('query', query);
            console.log('params', params);


            return request.put(`/order/manager-order${query}`, params)
        },
        {
            onSuccess: async (data) => {
                console.log('123', data);
                await queryClient.invalidateQueries('list-order-admin')
                toast.success(data.data.message, toastOption);
            },
            onError: async (error) => {
                toast.error("Lưu dữ liệu thất bại !", toastOption);
            }
        }
    )
}

export function useGetListProductInOrderByOrderId(orderId) {
    const { data: response, ...props } = useQuery(
        ['list-product-order', orderId],
        () => {
            return request.get(`/order_detail/${orderId}`)
        },
        {
            enabled: !!orderId
        }

    )
    return {
        products: response?.data?.products ?? []
    }
}