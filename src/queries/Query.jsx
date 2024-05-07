import React from 'react'
import { QueryClient, QueryClientProvider as Provider } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
      select(response) {
        return response
      },
    },
  },
})

export default function QueryClientProvider({children}) {
  return <Provider client={queryClient}>{children}</Provider>
}
