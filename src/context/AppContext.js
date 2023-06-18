import { createContext } from "react";

// App Context that holds all the data globally
export const AppContext = createContext({
  isLoggedIn: false,
  selectedPage: null,
  setSelectedPage: () => {},
  cars: [],
  setCars: () => {},
  categories: [],
  setCategories: () => {},
  login: () => {},
  logOut: () => {},
});
