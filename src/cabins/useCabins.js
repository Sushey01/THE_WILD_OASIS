import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../services/apiCabins";
import { useSearchParams } from "react-router-dom";


const useCabins =()=>{
    const [searchParams] = useSearchParams();


const filterValue = searchParams.get("status");
const filter = !filterValue || filterValue === "all"?null:{field:"status", value:filterValue}


// SORT

const sortByRaw=searchParams.get("sortBy") || "startName-desc";
const [field, direction]= sortByRaw.split("-");
const sortBy = {field, direction}



const {isLoading, data, error} = useQuery({
    queryKey: ["cabins", filter, sortBy],
    queryFn:()=>getCabins({filter, sortBy}),
    enabled:!!user && !userLoading,
    retry:false,
})


const cabins = Array.isArray(data)
? data
:Array.isArray(data?.data)
? data.data
:[];

return {cabins, isLoading, error};
};

export default useCabins