
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { request } from "../requestMethod"
import { toast } from 'react-toastify';
import { toastOption } from '../constants';


export function useGetVoucherAdmin(params) {
    const { data: response, ...props } = useQuery(
        ['list-voucher-admin', params],
        () => {
            return request.post(`/v1/voucher/filter`, params)
        },
    )
    return response?.data?.data ?? []
}

export function useGetVoucherUser(params) {
    const { data: response, ...props } = useQuery(
        'list-voucher-user',
        () => {
            return request.get(`/v1/voucher/search`)
        },
    )
    return response?.data?.data ?? []
}

export function useCreateVoucher() {
    const queryClient = useQueryClient()
    return useMutation(
        'create-voucher',
        (params) => {
            return request.post(`/v1/voucher/create`, params)
        },
        {
            onSuccess: async (data) => {
                await queryClient.invalidateQueries('list-voucher-admin')
                toast.success("Lưu dữ liệu thành công", toastOption);
            },
            onError: async (error) => {
                toast.error(error.message, toastOption);
            }
        }
    )
}

export function useUpdateVoucher() {
    const queryClient = useQueryClient()
    return useMutation(
        'update-voucher',
        (params) => {
            return request.post(`/v1/voucher/update`, params)
        },
        {
            onSuccess: async (data) => {

                await queryClient.invalidateQueries('list-voucher-admin')
                toast.success("Lưu dữ liệu thành công", toastOption);
            },
            onError: async (error) => {
                toast.error(error.message, toastOption);
            }
        }
    )
}
// export function useGetListProductInOrderByOrderId(orderId) {
//     const { data: response, ...props } = useQuery(
//         ['list-product-order', orderId],
//         () => {
//             return request.get(`/order_detail/${orderId}`)
//         },
//         {
//             enabled: !!orderId
//         }

//     )
//     return {
//         products: response?.data?.products ?? []
//     }
// }