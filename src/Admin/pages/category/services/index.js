import { request } from "../../../../requestMethod"
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify';
import { toastOption } from "../../../../constants";
export const useSearchCategory = (params) => {
    const { data: response, ...props } = useQuery(
        ['list-category', params],
        () => {
            return request.post(`/category/search`, params)
        },
    )
    console.log('response', response);
    return {
        categoryList: response?.data?.category ?? []
    }
}

export function useCreateCategory() {
    const queryClient = useQueryClient()
    return useMutation(
      'create-category',
      (params) => {
        return request.post(`/category/create`, params)
      },
      {
        onSuccess: async (data) => {
          await queryClient.invalidateQueries('list-category')
          toast.success("Lưu dữ liệu thành công", toastOption);
        },
        onError: async (error) => {
          toast.error("Lưu dữ liệu thất bại !", toastOption);
        }
      }
    )
  }
  
  export function useUpdateCategory() {
    const queryClient = useQueryClient()
    return useMutation(
      'update-category',
      (params) => {
        return request.post(`/category/update/${params.id}`, params)
      },
      {
        onSuccess: async (data) => {
          await queryClient.invalidateQueries('list-category')
          toast.success("Lưu dữ liệu thành công", toastOption);
        },
        onError: async (error) => {
            console.log('check error:', error);
          toast.error("Lưu dữ liệu thất bại !", toastOption);
        }
      }
    )
  }

export function useDeleteCategory() {
    const queryClient = useQueryClient()
    return useMutation(
        'delete-category',
        (id) => {
            return request.delete(`/category/delete/${id}`)
        },
        {
            onSuccess: async (data) => {
                await queryClient.invalidateQueries('list-category')
                toast.success("Xóa loại sản phẩm thành công", toastOption);
            },
            onError: async (error) => {
                console.log('check error:', error);
                toast.error("Xóa sản phẩm thất bại !", toastOption);
            }
        }
    )
}