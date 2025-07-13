import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const IdleLogout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const timeoutId = useRef();

  const resetTimer = () => {
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      logout();
      navigate("/login");
    }, 60000); // 1 minute = 60000ms
  };

  useEffect(() => {
    resetTimer(); // run once on mount

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);

    return () => {
      clearTimeout(timeoutId.current);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, []);

  return null;
};

export default IdleLogout;
