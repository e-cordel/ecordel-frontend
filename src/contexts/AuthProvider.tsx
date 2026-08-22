import { createContext, ReactNode, useCallback, useState } from "react";
import api from "../services/api";

export interface User {
  username: string;
  role?: string;
  roles?: string[];
  isAdmin?: boolean;
}

interface AuthState {
  token: string;
  user: User;
}

export interface SignInCredentials {
  username: string;
  password: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextData {
  user?: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [data, setData] = useState<AuthState>(() => {
    let token: string | null;
    let user: string | null;

    token = sessionStorage.getItem("@ECordel:token");
    user = sessionStorage.getItem("@ECordel:user");

    if (token && user) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(
    async ({ username, password }: SignInCredentials) => {
      const response = await api.post("auth", {
        username,
        password,
      });
      const userFromResponse = response.data?.user as Partial<User> | undefined;
      const rolesFromResponse = response.data?.roles as string[] | undefined;
      const roleFromResponse = response.data?.role as string | undefined;
      const user: User = {
        username,
        ...userFromResponse,
        roles: userFromResponse?.roles || rolesFromResponse,
        role: userFromResponse?.role || roleFromResponse,
        isAdmin: Boolean(
          userFromResponse?.isAdmin ||
            roleFromResponse === "ADMIN" ||
            rolesFromResponse?.includes("ADMIN")
        ),
      };
      const { token } = response.data;

      sessionStorage.setItem("@ECordel:token", token);
      sessionStorage.setItem("@ECordel:user", JSON.stringify(user));
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      setData({ token, user });
    },
    []
  );

  const signOut = useCallback(() => {
    sessionStorage.removeItem("@ECordel:token");
    sessionStorage.removeItem("@ECordel:user");
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const userIsAdmin = (user?: User) =>
  Boolean(
    user?.isAdmin ||
      user?.role === "ADMIN" ||
      user?.roles?.includes("ADMIN")
  );
