
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { request } from "../requestMethod"



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