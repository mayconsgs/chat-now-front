import { createContext, ReactNode, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/logo.svg";
import api from "../services/api";

export interface UserProps {
  id: string;
  firstName: string;
  lastName?: string;
  bio?: string;
  email?: string;
  shareCode?: string;
  avatarUrl?: string;
  fullName?: string;
}

interface AuthContextData {
  user?: UserProps;
  setUser: (user?: UserProps) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({
  setUser: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps>();
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    api
      .get("/users/me")
      .then(({ data }) => {
        setUser(data);
      })
      .finally(() => {
        setLoading(false);
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
    <AuthContext.Provider value={{ user, setUser }}>
      {loading ? <Logo /> : children}
    </AuthContext.Provider>
  );
};
