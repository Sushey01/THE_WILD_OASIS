import React, { useState } from "react";
import CabinTable from "./CabinTable";
import CabinForm from "./CabinForm";
import styles from "./Cabin.module.css";
import supabase from "../services/supabase";

const Cabin = () => {
  const [showForm, setShowForm] = useState(false);
  console.log(supabase);

  return (
    <>
      <div className={styles.cabinHead}>
        <h2 className={styles.title}>All Cabins</h2>

        <div className={styles.filters}>
          <div className={styles.filter1}>
            <button>All</button>
            <button>No discount</button>
            <button>With discount</button>
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
      <button onClick={() => setShowForm((show) => !show)}>
        {showForm ? "Close Form" : "Add Cabin"}
      </button>
      {showForm && <CabinForm />} {/* ⬅️ Show the form when showForm is true */}
        </div>
            
    </>
  );
};

export default Cabin;
