import { request } from "../../../../requestMethod"
import { useMutation, useQuery, useQueryClient } from 'react-query'

export const useSearchCategory = (params) => {
    const { data: response, ...props } = useQuery(
        ['list-category'],
        () => {
            return request.get(`/category/`)
        },
    )
    console.log('response',response);
    return {
        categoryList: response?.data?.category ?? []
    }
  }