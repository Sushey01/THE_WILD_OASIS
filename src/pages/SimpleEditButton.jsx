import React from "react";

function SimpleEditButton({ isEditing, onClick }) {
  return (
    <button onClick={onClick}>
      {isEditing ? "Cancel Edit" : "Edit"}
    </button>
  );
}

export default SimpleEditButton;
