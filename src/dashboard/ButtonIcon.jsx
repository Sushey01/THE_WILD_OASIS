function ButtonIcon({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "transparent",
        border: "none",
        color: "#4f46e5",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

export default ButtonIcon;
