import { useMutation } from "@tanstack/react-query";
import {login as loginApi} from "../services/apiAuth"
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast"

export function useLogin() {
  const navigate = useNavigate();

  const {mutate:loginApi, isLoading} = 
  useMutation({
    mutationFn: ({ email, password }) =>
      loginApi({
        email,
        password,
      }),
    onSuccess: (user) => {
        console.log(user)
      navigate("/");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or passwrod are incorrect.")
    },
  });
  return { loginApi, isLoading };
}
