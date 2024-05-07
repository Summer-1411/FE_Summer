
import { useQuery } from 'react-query'
import { request } from "../requestMethod"
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