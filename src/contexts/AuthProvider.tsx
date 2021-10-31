import { createContext, ReactChild, useCallback, useState } from "react";
import api from "../services/api";

interface User {
  username: string;
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
  children: ReactChild;
}

export interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [data, setData] = useState<AuthState>(() => {
    let token, user;
    token = sessionStorage.getItem("@ECordel:token");
    user = sessionStorage.getItem("@ECordel:user");
    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
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
      const user = { username };
      const { token } = response.data;
      sessionStorage.setItem("@ECordel:token", token);
      sessionStorage.setItem("@ECordel:user", JSON.stringify(user));
      api.defaults.headers.authorization = `Bearer ${token}`;
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
