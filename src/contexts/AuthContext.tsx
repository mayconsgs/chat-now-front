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
  setUser: (user?: UserProps) => void;
  hasUser: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({
  hasUser: false,
  setUser: () => {},
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
      });
  }, [history]);

  useEffect(() => {
    if (!user) {
      history.push("/sign-in");
    } else {
      history.push("/");
    }
  }, [user, history]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, hasUser: user ? true : false }}
    >
      {children}
    </AuthContext.Provider>
  );
};
