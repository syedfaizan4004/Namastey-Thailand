import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  mobileNumber: string;
  country: "india" | "thailand";
  avatar?: string;
  userType: "freelancer" | "client";
  profileComplete: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  createAccount: (name: string, email: string, password: string, userType: "freelancer" | "client") => Promise<void>;
  login: (userData: User) => void;
  logout: () => void;
  openAuthModal: () => void;
  openLoginModal: () => void;
  closeAuthModal: () => void;
  authModalOpen: boolean;
  loginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;
  authStep: "userType" | "createAccount";
  setAuthStep: (step: "userType" | "createAccount") => void;
  selectedUserType: "freelancer" | "client" | null;
  setSelectedUserType: (type: "freelancer" | "client") => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [authStep, setAuthStep] = useState<"userType" | "createAccount">("userType");
  const [selectedUserType, setSelectedUserType] = useState<"freelancer" | "client" | null>(null);

  const createAccount = async (name: string, email: string, password: string, userType: "freelancer" | "client") => {
    try {
      // TODO: Implement actual Supabase authentication
      console.log("Create Account:", { name, email, password, userType });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const mockUser: User = {
        id: "1",
        name: name,
        email: email,
        mobileNumber: "+91 9876543210",
        country: "india",
        userType: userType,
        profileComplete: true,
        avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTk1MDA3MTd8MA&ixlib=rb-4.1.0&q=80&w=100`
      };
      
      setUser(mockUser);
      setAuthModalOpen(false);
      // Reset modal state
      setAuthStep("userType");
      setSelectedUserType(null);
    } catch (error) {
      throw new Error("Account creation failed");
    }
  };

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const openAuthModal = () => {
    setAuthStep("userType");
    setSelectedUserType(null);
    setAuthModalOpen(true);
  };

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
    setLoginModalOpen(false);
    setAuthStep("userType");
    setSelectedUserType(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    createAccount,
    login,
    logout,
    openAuthModal,
    openLoginModal,
    closeAuthModal,
    authModalOpen,
    loginModalOpen,
    setLoginModalOpen,
    authStep,
    setAuthStep,
    selectedUserType,
    setSelectedUserType,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}