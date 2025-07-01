import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../services/apiSettings";

export function useSettings(){
   
    const {isLoading, error, data:settings,} = useQuery({
        queryKey:['settings'],
        queryFn:getSettings,  // returns a promise or asynchornous function
    })
    return {isLoading, error, settings}
}