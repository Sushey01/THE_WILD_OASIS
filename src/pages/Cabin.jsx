import React, { useState } from "react";
import CabinTable from "./CabinTable";
import CabinForm from "./CabinForm";
import styles from "./Cabin.module.css";
import supabase from "../services/supabase";

const Cabin = () => {


  return (
    <>
      <div className={styles.cabinHead}>
        <h2 className={styles.title}>All Cabins</h2>

        <div className={styles.filters}>
          <div className={styles.filter1}>
            <button className={styles.primary} disabled>All</button>
            <button className={styles.secondary}>No discount</button>
            <button className={styles.secondary}>With discount</button>
            
          </div>
          <div className={styles.filter2}>
            <select>
              <option>Sort by name (A-Z)</option>
              <option>Sort by name (Z-A)</option>
              <option>Sort by price (low first)</option>
              <option>Sort by price (high first)</option>
              <option>Sort by capacity (low first)</option>
              <option>Sort by capacity (high first)</option>
            </select>
          </div>
        </div>
      
      </div>
        <div className={styles.form}>
          
<CabinTable />
        </div>
            
    </>
  );
};

export default Cabin;
