import { useMutation, useQuery, useQueryClient } from 'react-query'
import { request } from "../requestMethod"
import { toast } from 'react-toastify';
import { toastOption } from '../constants';

export function useGetTopProduct() {
    const { data: response, ...props } = useQuery(
        'data-top-product',
        () => {
            return request.get(`/stat/top-product`)
        },
    )
    return {
        listProduct: response?.data ?? []
    }
}

export function useGetTopUser() {
    const { data: response, ...props } = useQuery(
        'data-top-user',
        () => {
            return request.get(`/stat/top-user`)
        },
    )
    return {
        listUser: response?.data ?? []
    }
}


export function useGetCountStat() {
    const { data: response, ...props } = useQuery(
        'data-stat-count',
        () => {
            return request.get(`/stat/count`)
        },
    )
    const {
        user: { numberUser = 0 } = {},
        product: { numberProduct = 0 } = {},
        order: { numberOrder = 0 } = {},
        productSold: { total_sold: productSold = 0 } = {}
    } = response?.data || {};

    const dataResponse = {
        user: numberUser,
        product: numberProduct,
        order: numberOrder,
        productSold: productSold
    };
    return dataResponse
}
