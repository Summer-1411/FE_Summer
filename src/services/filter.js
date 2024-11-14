
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