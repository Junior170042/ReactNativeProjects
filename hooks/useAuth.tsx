import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of your context
type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated?: (value: boolean) => void;
  setAuthentication: () => void;
  removeAuthentication: () => void;
}

// Create the context with an initial undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const setAuthentication = () => setIsAuthenticated(true)
  const removeAuthentication = () => setIsAuthenticated(false)

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthentication, removeAuthentication }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a hook to easily use the context in any component
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
