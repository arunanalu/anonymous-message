import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserWrapper({ children }) {
  const [token, setToken] = useState(undefined);
  return (
    <UserContext.Provider value={{ token, setToken }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
