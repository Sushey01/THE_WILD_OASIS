import React, { useState } from 'react';
import CabinTable from './CabinTable';
import CabinForm from './CabinForm'; // 
import supabase from '../services/supabase';

const Cabin = () => {

  const [showForm, setShowForm] = useState(false);
  console.log(supabase)

  return (
    <>
      <button onClick={() => setShowForm((show) => !show)}>
        {showForm ? 'Close Form' : 'Add Cabin'}
      </button>

      {showForm && <CabinForm />} {/* ⬅️ Show the form when showForm is true */}

      <CabinTable />
    </>
  );
};

export default Cabin;
