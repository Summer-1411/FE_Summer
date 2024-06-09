import { useQuery } from 'react-query'
import { request } from '../../../../requestMethod';

export const useCustomerStatistics = (params) => {
    const { data: response, ...props } = useQuery(
        ['list-customer-statistic', params],
        () => {
            return request.post(`/stat/customer`, params)
        },
        {
            enabled: !!params
        }
    )
    return {
        data: response?.data?.data ?? []
    }
}