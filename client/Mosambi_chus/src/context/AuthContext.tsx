import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Create context
interface AuthContextType {
  isLoggedIn: boolean;
  userName: string | null;
  userEmail: string | null;
  setIsLoggedIn: (value: boolean) => void;
  setUserName: (name: string) => void;
  setUserEmail: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Function to load user information from localStorage on app load
  const loadUserFromLocalStorage = () => {
    const token = localStorage.getItem("token");
    const storedUserName = localStorage.getItem("loggedInUser");
    const storedUserEmail = localStorage.getItem("userEmail");

    if (token && storedUserName && storedUserEmail) {
      setIsLoggedIn(true);
      setUserName(storedUserName);
      setUserEmail(storedUserEmail);
    }
  };

  useEffect(() => {
    loadUserFromLocalStorage(); // Load user data when the component mounts
  }, []);

  const logout = () => {
    setIsLoggedIn(false);
    setUserName(null);
    setUserEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userEmail");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userName,
        userEmail,
        setIsLoggedIn,
        setUserName,
        setUserEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
