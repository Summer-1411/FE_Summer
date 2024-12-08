import axios from "axios"
// import { request } from "../../../../requestMethod"
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify';
import { toastOption, toastOptionRight } from "../../constants";
import { request } from "../../requestMethod";

export const useGetLocation = (key, params, enabled) => {
    const { data: response, ...props } = useQuery(
        [key, params, enabled],
        () => {
            return axios.get(`https://esgoo.net/api-tinhthanh/${params.level}/${params.code}.htm`)
        },
        {
            enabled: enabled,
            keepPreviousData: false,
        },
    )
    return {
        data: response?.data?.data ?? [],
        response
    }
}

export function useCheckVoucher() {
    return useMutation(
        'check-voucher',
        (params) => {
            return request.post(`/voucher/check-voucher`, params)
        },
        {
            onSuccess: async (data) => {
                console.log('data', data);

                toast.success(data.data.message, toastOptionRight);
            },
            onError: async (error) => {
                toast.error(error.message, toastOptionRight);
            }
        }
    )
}

