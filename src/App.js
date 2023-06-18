import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import MainLayout from './layout/Layout';
import { AppContext } from './context/AppContext';
import Cars from './pages/Cars';
import Categories from './pages/Categories';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);
  const [cars, setCars] = useState([]); 
  const [categories, setCategories] = useState([]); 

  const token = localStorage.getItem('token');

  const login = (token) => {
    setIsLoggedIn(true)
    localStorage.setItem('token', token);
  }
  const logOut = () => {
    console.log('logout')
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.reload()
  }
  return (
    <AppContext.Provider value={{isLoggedIn, selectedPage, setSelectedPage, login, logOut, cars, setCars, categories, setCategories}}>
      <Router>
        <MainLayout>
          {
            token ?
            <Routes>
              <Route path="/" element={<Dashboard />}/>
              <Route path="/cars" element={<Cars />}/>
              <Route path="/categories" element={<Categories />}/>
            </Routes>
            :
            <Routes>
              <Route path="/" element={<SignIn />}/>
              <Route path="/signup" element={<SignUp />}/>
            </Routes>
          }
        </MainLayout>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
