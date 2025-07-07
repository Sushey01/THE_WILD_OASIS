import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../services/apiCabins';
import { getBooking } from '../services/apiBoookings';
import {useParams} from "react-router-dom"

const useBooking = () => {
    const {bookingId} = useParams();

    const {
        isLoading,
        booking,
        error,
    }=useQuery({
        queryKey:["booking"],
        queryFn:()=>getBooking(bookingId),
        retry:false,
    })

  return {isLoading, error, booking}
}

export default useBooking
