import { useMutation, useQuery, useQueryClient } from 'react-query'
import { request } from "../requestMethod"

import { useState } from 'react';

export function useGetProducer() {
    const [result, setResult] = useState([])
    const { data: response, ...props } = useQuery(
        'list-producer',
        () => {
            return request.get(`/producer`)
        },
        {
            onSuccess: ({ ...res }) => {
                const value = res.data.producer
                setResult([{ id: '', name: 'Tất cả' }, ...value])
            },
        }

    )


    return {
        listProducer: result
    }
}

