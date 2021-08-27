import { createContext, ReactNode, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../services/api";

export interface UserProps {
  id: string;
  firstName: string;
  lastName?: string;
  bio?: string;
  email: string;
  shareCode: string;
  avatarUrl?: string;
  fullName: string;
}

interface AuthContextData {
  user?: UserProps;
  hasUser: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({
  hasUser: false,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps>();
  const history = useHistory();

  useEffect(() => {
    api
      .get("/users/me")
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => {
        console.table(err);
        history.push("/sign-in");
      });
  }, [history]);

  return (
    <AuthContext.Provider value={{ user, hasUser: user ? true : false }}>
      {children}
    </AuthContext.Provider>
  );
};
