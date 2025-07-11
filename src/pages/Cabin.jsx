import React, { useEffect, useState } from "react";
import CabinTable from "./CabinTable";
import CabinForm from "./CabinForm";
import styles from "./Cabin.module.css";
import supabase from "../services/supabase";
import {getCabins} from "../services/apiCabins"

const Cabin = () => {

  const [cabins, setCabins] = useState([]);
  const [filterStatus, setFilterStatus] = useState(null);
  const [sortBy, setSortBy] = useState('name_asc');


  useEffect(()=>{
    async function fetchCabins(){
      let data = await getCabins({status:filterStatus})

      // User-Side sorting
      data=[...data].sort((a,b)=>{
        switch(sortBy){
          case 'name_asc':return a.name.localeCompare(b.name);
          case 'name_desc':return b.name.localeCompare(a.name);
          case 'price_asc':return a.price-b.price;
          case 'price_desc':return b.price-a.price;
          case 'capacity_asc':return a.max_capacity-b.max_capacity;
          case 'capacity_desc':return b.max_capacity-a.max_capacity;
          default: return 0
        }
      })
      setCabins(data)
    }

   fetchCabins();
  }, [filterStatus, sortBy]);


  return (
    <>
      <div className={styles.cabinHead}>
        <h2 className={styles.title}>All Cabins</h2>

        <div className={styles.filters}>
          <div className={styles.filter1}>
            <button onClick={()=>setFilterStatus(null)} className={styles.primary} disabled={filterStatus==="null"}>All</button>
            <button onClick={()=>setFilterStatus('no-discount')} disabled={filterStatus==='no-discount'} className={styles.secondary}>No discount</button>
            <button onClick={()=>setFilterStatus('with-discount')} disabled={filterStatus==='with-discount'} className={styles.secondary}>With discount</button>
            
          </div>
          <div className={styles.filter2}>
            <select value={sortBy} onChange={e=>setSortBy(e.target.value)}>
              <option value="name_asc">Sort by name (A-Z)</option>
              <option value="name_desc">Sort by name (Z-A)</option>
              <option value="price_asc">Sort by price (low first)</option>
              <option value="price_desc">Sort by price (high first)</option>
              <option value="capacity_asc">Sort by capacity (low first)</option>
              <option value="capacity_desc">Sort by capacity (high first)</option>
            </select>
          </div>
        </div>
      
      </div>
        <div className={styles.form}>
          
<CabinTable cabins={cabins} />
        </div>
        
            
    </>
  );
};

export default Cabin;
