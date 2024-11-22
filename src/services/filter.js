
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { request } from "../requestMethod"
import { toast } from 'react-toastify';
import { toastOption } from '../constants';


export function useSearchProductDetail() {
    return useMutation(
        'SEARCH_PRODUCT_DETAIL',
        async (id) => {
            const apiResponse = await request.get(`/filter/find/${id}`)
            if (apiResponse.status === 200) {
                if (apiResponse?.data?.filter) {
                    return apiResponse.data.filter
                }
            }
            return []
        }
    )
}


export function useGetInforProductDetail(params) {
    const { data: response, ...props } = useQuery(
        ['infor_product_detail', params],
        () => {
            return request.get(`/v1/filter/infor/${params}`)
        },
        {
            enabled: !!params
        }
    )
    return response?.data?.data ?? {
        listSize: [],
        listColorImg: []
    }
}

export function useGetProductDetailSizeColorProductId(params) {
    const { id, color, size } = params
    const { data: response, ...props } = useQuery(
        ['product_detail_color_size', params],
        () => {
            return request.post(`/v1/filter/detail`, params)
        },
        {
            enabled: !!id && !!color && !!size
        }
    )

    return response?.data?.data
}