import { useMutation, useQuery, useQueryClient } from 'react-query'
import { request } from "../requestMethod"
import { toast } from 'react-toastify';
import { toastOption } from '../constants';
import { useState } from 'react';

export function useGetCategory() {
    const [result, setResult] = useState([])
    const { data: response, ...props } = useQuery(
        'list-category',
        () => {
            return request.get(`/category`)
        },
        {
            onSuccess: ({ ...res }) => {
                const valueSelect = res.data.category.map(item => ({
                    value: item.id, label: item.name
                }))
                setResult(prev => [{ value: '', label: 'Tất cả' }, ...valueSelect])
            },
        }

    )

    return {
        listCategory: result
    }
}

