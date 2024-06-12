import axios from "axios"
// import { request } from "../../../../requestMethod"
import { useMutation, useQuery, useQueryClient } from 'react-query'

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
        data:  response?.data?.data ?? [],
        response
    }
}

