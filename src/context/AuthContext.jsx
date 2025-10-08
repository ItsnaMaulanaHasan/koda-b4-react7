import { createContext } from "react";

export const AuthContext = createContext({
  userLogin: {
    email: "",
    password: "",
  },
  setUserLogin: function () {},
});
