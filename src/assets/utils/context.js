import { createContext, useContext } from "react";

export const MyContext = createContext(null)

export const useAppContext = () => {
    const context = useContext(MyContext);
    if (!context) {
      throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
  };