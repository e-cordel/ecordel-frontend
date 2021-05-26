import { Button } from "@material-ui/core";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { useAuth } from "../../hooks/Auth";

export function AuthButton() {
  const router = useRouter()
  const { user, signOut } = useAuth();

  const login = useCallback(
    () => {
      router.push('/login')
    },
    [user],
  );

  const logout = useCallback(
    () => {
      signOut();
      router.push('/')
    },
    [user],
  );

  if (!user)
    return <Button
      color="inherit"
      endIcon={<FiLogIn />}
      onClick={login}
    >Login</Button>

  return <Button
    color="inherit"
    endIcon={<FiLogOut />}
    onClick={logout}
  >Logout</Button>
}
