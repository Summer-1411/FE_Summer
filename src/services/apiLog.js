import { useMutation, useQuery, useQueryClient } from 'react-query'
import { request } from "../requestMethod"
import { toast } from 'react-toastify';
import { toastOption } from '../constants';


export function useGetLogApi(params) {
    const { data: response, ...props } = useQuery(
        ['log-api-admin', params],
        () => {
            return request.post(`/v1/api-log/search`, params)
        },
    )
    console.log('response.data', response?.data);

    return response?.data?.data ?? []
}