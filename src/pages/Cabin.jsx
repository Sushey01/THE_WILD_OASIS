import React, { useState } from 'react';
import CabinTable from './CabinTable';
import CabinForm from './CabinForm'; // ⬅️ Import it

const Cabin = () => {
  const [showForm, setShowForm] = useState(false);

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
