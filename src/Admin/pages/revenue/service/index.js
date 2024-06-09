// import { request } from "../../../../requestMethod"
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify';
import { request } from '../../../../requestMethod';
// import { toastOption } from "../../../../constants";

export const useSearchRevenue = (params) => {
    const { data: response, ...props } = useQuery(
        ['list-revenue', params],
        () => {
            return request.post(`/stat/revenue`, params)
        },
        {
            enabled: !!params
        }
    )
    return {
        data: response?.data?.data ?? []
    }
}