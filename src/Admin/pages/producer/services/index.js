import { request } from "../../../../requestMethod"
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify';
import { toastOption } from "../../../../constants";
export const useSearchProducer = (params) => {
  const { data: response, ...props } = useQuery(
    ['list-producer', params],
    () => {
      return request.post(`/producer/search`, params)
    },
  )
  console.log('response', response);
  return {
    producerList: response?.data?.producer ?? []
  }
}

export function useCreateProducer() {
  const queryClient = useQueryClient()
  return useMutation(
    'create-producer',
    (params) => {
      return request.post(`/producer/create`, params)
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries('list-producer')
        toast.success("Lưu dữ liệu thành công", toastOption);
      },
      onError: async (error) => {
        toast.error("Lưu dữ liệu thất bại !", toastOption);
      }
    }
  )
}

export function useUpdateProducer() {
  const queryClient = useQueryClient()
  return useMutation(
    'update-producer',
    (params) => {
      return request.post(`/producer/update/${params.id}`, params)
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries('list-producer')
        toast.success("Lưu dữ liệu thành công", toastOption);
      },
      onError: async (error) => {
        console.log('check error:', error);
        toast.error("Lưu dữ liệu thất bại !", toastOption);
      }
    }
  )
}

export function useDeleteProducer() {
  const queryClient = useQueryClient()
  return useMutation(
    'delete-producer',
    (id) => {
      return request.delete(`/producer/delete/${id}`)
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries('list-producer')
        toast.success("Xóa loại sản phẩm thành công", toastOption);
      },
      onError: async (error) => {
        console.log('check error:', error);
        toast.error("Xóa sản phẩm thất bại !", toastOption);
      }
    }
  )
}