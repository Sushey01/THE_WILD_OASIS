import React from 'react'
import "./App.css"
import CabinTable from './pages/CabinTable'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const App = () => {

  const queryClient = new QueryClient({
    defaultOptions:{
      queries:{
        staleTime:60 *1000,
      }
    }
  })
  return (
      <div>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false}/>
      <CabinTable/>
    </QueryClientProvider>

    </div>
    
  )
}

export default App
