// import React from 'react'
// import { createCabin } from '../services/apiCabins'
// import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'

// const DuplicateCabin = () => {
//     const queryClient = useQueryClient()
//     const {mutate:duplicateCabin} = useMutation({
//         mutationFn:createCabin,
//         onSuccess:()=>{
//             toast.success("Cabin duplicated")
//             queryClient.invalidateQueries({queryKey:["Cabins"]})
//         },
//         onError:(error) => toast.error(error.message)
//     })
 
//     function handleDuplicate(cabin){
//         const duplicatedCabin={
//             ...cabin,
//             name: `${cabin.name} (copy)`
//         }
//         duplicateCabin(duplicatedCabin)
//     }
// }

// export default DuplicateCabin
