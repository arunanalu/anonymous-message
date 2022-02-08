import { createContext, useContext, useEffect, useState } from "react";
import { decode, verify } from "jsonwebtoken";

const UserContext = createContext();

export function UserWrapper({ children }) {
  // const [token, setToken] = useState(undefined);
  const [user, setUser] = useState({});

  const login = async (token) => {
    try {
      // const loginResponse = await axios({
      //   method: "post",
      //   url: `${process.env.API}/login`,
      //   data: {
      //     name: username,
      //     password,
      //   },
      // });
      // const {token, type} = loginResponse.data;
      // setUser({token, type, name: username });
      // setIsLoading(false);
      // onClose();
    } catch ({ response }) {}
  };

  useEffect(() => {
    const localToken = sessionStorage.getItem("user");
    if (!localToken) return;
    if (user.token === undefined) {
      const { token, name, type } = JSON.parse(localToken);
      try {
        verify(token, process.env.JWT_SECRET);
      } catch (err) {
        console.log("invalid token");
        sessionStorage.removeItem('user')
        setUser({})
        return;
      }
      setUser({ token, name, type });
    }

    // if (!token) return setUser({});
    // const {data} = decode(token);
    // setUser((state) => ({ ...state, name: data.name }));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
