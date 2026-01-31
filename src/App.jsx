import { Navigate, Route,Routes } from "react-router-dom"; 
import Home from './pages/Home';
import Login from './pages/Login';
import AppLayout from "./components/AppLayout";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Logout from "./components/Logout";
import UserLayout from "./components/UserLayout";

function App() {
  //Value of userDetails represents whether the use is logged in or not
  const [userDetails, setUserDetails] =useState(null);

  return ( 
    <Routes>
      
      <Route 
        path = "/" element = {
          userDetails ? (
            <Navigate to = "/dashboard" />
          ) : (
            <AppLayout>
              <Home />
            </AppLayout>
            )
        } 
      />
      
      <Route 
        path = "/login" element = {
          userDetails ? (
            <Navigate to = "/dashboard" />
          ) : (
            <AppLayout>
              <Login setUser = {setUserDetails} /> 
            </AppLayout>
            )
        }
      />
      
      <Route
        path = "/dashboard" 
        element = {
          userDetails ? (
            <UserLayout>
              <Dashboard user = {userDetails} />
            </UserLayout>
          ) : (
            <Navigate to = "/login" />
          )
        } 
        />

        <Route
          path="/logout"
          element = {
            userDetails ? (
              < Logout setUser = {setUserDetails} />
            ) : (
              < Navigate to ="/login" />
            )
          }
        />
    </Routes>
  );
}

export default App;