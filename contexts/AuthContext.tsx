import fetchUser from "@/api/fetchUser";
import { LoginFormFields } from "@/components/LoginForm/LoginForm";
import { useRouter } from "next/router";
import { ReactNode, useState, createContext, useEffect } from "react";

export type User = {
  username: string;
  role: "editor" | "viewer";
};

type AuthContext = {
  loggedIn: boolean;
  user?: User;
  loading: boolean;
  handleLogIn?: ({ username, password }: LoginFormFields) => void;
  handleLogOut?: () => void;
  error?: string | null;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContext>({
  loggedIn: false,
  loading: true,
});

const STORAGE_KEY = "loggedIn";

const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoggedIn(sessionStorage.getItem(STORAGE_KEY) === "true");
    setLoading(false);
  }, []);

  const handleLogIn = async ({ username, password }: LoginFormFields) => {
    const data = await fetchUser(username, password);

    if (data.error) {
      setError(data.error);

      return;
    }

    sessionStorage.setItem(STORAGE_KEY, "true");
    setUser(data.user);
    setLoggedIn(true);

    router.push("/");
  };

  const handleLogOut = () => {
    setLoggedIn(false);

    sessionStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{ loggedIn, user, loading, handleLogIn, handleLogOut, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
