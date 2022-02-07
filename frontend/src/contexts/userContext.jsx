import { createContext, useContext, useEffect, useState } from "react";
import { decode } from "jsonwebtoken";

const UserContext = createContext();

export function UserWrapper({ children }) {
  // const [token, setToken] = useState(undefined);
  const [user, setUser] = useState({});


  // useEffect(() => {
  //   if (!token) return setUser({});
  //   const {data} = decode(token);
  //   setUser((state) => ({ ...state, name: data.name }));
  // }, [token]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
