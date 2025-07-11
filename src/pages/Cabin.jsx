import React, { useEffect, useState } from "react";
import CabinTable from "./CabinTable";
import styles from "./Cabin.module.css";
import { getCabins } from "../services/apiCabins";

export default function Cabin() {
  // const [cabins, setCabins] = useState([]);
  const [filterStatus, setFilterStatus] = useState(null); // null means "All"
  const [sortBy, setSortBy] = useState("name_asc");

  // Convert null filterStatus to "all" for button active styling
  const activeFilter = filterStatus === null ? "all" : filterStatus;

  /* fetch + sort whenever filterStatus or sortBy changes */
  useEffect(() => {
    (async () => {
      const data = await getCabins({ status: filterStatus });

      const sorted = [...data].sort((a, b) => {
        switch (sortBy) {
          case "name_asc":
            return a.name.localeCompare(b.name);
          case "name_desc":
            return b.name.localeCompare(a.name);
          case "price_asc":
            return a.price - b.price;
          case "price_desc":
            return b.price - a.price;
          case "capacity_asc":
            return a.max_capacity - b.max_capacity;
          case "capacity_desc":
            return b.max_capacity - a.max_capacity;
          default:
            return 0;
        }
      });

      setCabins(sorted);
    })();
  }, [filterStatus, sortBy]);

  return (
    <>
      <div className={styles.cabinHead}>
        <h2 className={styles.title}>All Cabins</h2>

        <div className={styles.filters}>
          {/* Filter buttons */}
          <div className={styles.filter1}>
            <button
              className={activeFilter === "all" ? styles.primary : styles.secondary}
              disabled={filterStatus === null}
              onClick={() => setFilterStatus(null)}
            >
              All
            </button>

            <button
              className={activeFilter === "no-discount" ? styles.primary : styles.secondary}
              disabled={filterStatus === "no-discount"}
              onClick={() => setFilterStatus("no-discount")}
            >
              No discount
            </button>

            <button
              className={activeFilter === "with-discount" ? styles.primary : styles.secondary}
              disabled={filterStatus === "with-discount"}
              onClick={() => setFilterStatus("with-discount")}
            >
              With discount
            </button>
          </div>

          {/* Sort dropdown */}
          <div className={styles.filter2}>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name_asc">Sort by name (A-Z)</option>
              <option value="name_desc">Sort by name (Z-A)</option>
              <option value="price_asc">Sort by price (low → high)</option>
              <option value="price_desc">Sort by price (high → low)</option>
              <option value="capacity_asc">Sort by capacity (low → high)</option>
              <option value="capacity_desc">Sort by capacity (high → low)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pass filterStatus and sortBy to CabinTable */}
      <div className={styles.form}>
        <CabinTable filterStatus={filterStatus} sortBy={sortBy} />
      </div>
    </>
  );
}
