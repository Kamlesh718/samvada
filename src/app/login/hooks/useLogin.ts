import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { loginUser } from "../action";
import toast from "react-hot-toast";

const initialState = { error: null, success: false };

export function useLogin() {
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword((pass) => !pass);
  };

  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    loginUser,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      console.log(state.success);
      toast.success("Login successful!");
      router.push("/chat");
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  useEffect(() => {
    if (registered) {
      toast.success("Registration Successfull!! Please Log in.");
    }
  }, [registered]);

  return {
    state,
    formAction,
    isPending,
    showPassword,
    handlePasswordVisibility,
  };
}
