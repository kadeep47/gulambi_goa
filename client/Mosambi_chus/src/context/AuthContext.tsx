import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define the structure of the data and functions we will store in AuthContext
interface AuthContextType {
  isLoggedIn: boolean; // Tracks if the user is logged in
  userName: string | null; // Stores the logged-in user's name
  userEmail: string | null; // Stores the logged-in user's email
  setIsLoggedIn: (value: boolean) => void; // Function to update login status
  setUserName: (name: string) => void; // Function to update the user's name
  setUserEmail: (email: string) => void; // Function to update the user's email
  logout: () => void; // Function to log out the user
}

// Create the AuthContext with an initial value of undefined
// This ensures we handle cases where the context is used without being provided
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the AuthProvider component
// This component will provide authentication-related data and functions to its children
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // State to track if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // State to store the logged-in user's name
  const [userName, setUserName] = useState<string | null>(null);

  // State to store the logged-in user's email
  const [userEmail, setUserEmail] = useState<string | null>(null);

  /**
   * Function to load user information from localStorage
   * This ensures the user's login state persists even after a page refresh
   */
  const loadUserFromLocalStorage = () => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    const storedUserName = localStorage.getItem("loggedInUser"); // Retrieve the user's name
    const storedUserEmail = localStorage.getItem("userEmail"); // Retrieve the user's email

    // If all necessary data is present in localStorage, update the state
    if (token && storedUserName && storedUserEmail) {
      setIsLoggedIn(true); // Mark the user as logged in
      setUserName(storedUserName); // Set the user's name
      setUserEmail(storedUserEmail); // Set the user's email
    }
  };

  /**
   * Effect to load user data from localStorage when the component mounts
   * This ensures the user's login state is restored on app load
   */
  useEffect(() => {
    loadUserFromLocalStorage();
  }, []); // Empty dependency array ensures this effect runs only once

  /**
   * Function to log out the user
   * It clears the state and removes user data from localStorage
   */
  const logout = () => {
    setIsLoggedIn(false); // Reset login state
    setUserName(null); // Clear user's name
    setUserEmail(null); // Clear user's email
    localStorage.removeItem("token"); // Remove the token from localStorage
    localStorage.removeItem("loggedInUser"); // Remove the user's name from localStorage
    localStorage.removeItem("userEmail"); // Remove the user's email from localStorage
  };

  // Return the context provider, wrapping children components
  // This makes the authentication data and functions available globally
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn, // Current login status
        userName, // Current user's name
        userEmail, // Current user's email
        setIsLoggedIn, // Function to update login status
        setUserName, // Function to update the user's name
        setUserEmail, // Function to update the user's email
        logout, // Function to log out the user
      }}
    >
      {children} {/* Render any child components */}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to access AuthContext data and functions
 * This makes it easy to use authentication-related data in any component
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext); // Access the AuthContext

  // If context is undefined, it means the component is not wrapped in AuthProvider
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context; // Return the context value
};

// Why Use This File?
// Avoid Prop-Drilling:
// Without AuthContext, authentication data would need to be passed as props through multiple components, making the code cumbersome and harder to maintain.
// Persistent Login:
// Automatically restores login state from localStorage so the user doesn’t need to log in again after refreshing the page.
// Reusable and Centralized Logic:
// Consolidates all authentication-related logic in one place, making the code cleaner and easier to maintain.
// Scalability:
// As the application grows, any component can easily access or modify the authentication state without additional wiring.
