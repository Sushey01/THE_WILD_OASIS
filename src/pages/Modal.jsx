import React from 'react'
import "./Modal.css"
import CabinForm from './CabinForm'

const ModalLayout = ({ children, onClose }) => {
  const stop = (e) => e.stopPropagation(); // prevent inner clicks from closing modal

  return (
    <div className="modal-container" onClick={onClose}>
      <div className="modal-content" onClick={stop}>
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
