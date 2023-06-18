import { createContext } from "react";

export const AppContext = createContext({
    isLoggedIn: false,
    selectedPage: null,
    setSelectedPage: () => {},
    cars: [],
    setCars: () => {},
    categories: [],
    setCategories: () => {},
    login: () => {},
    logOut: () => {}
});