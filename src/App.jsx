import { Navigate, Route,Routes } from "react-router-dom"; 
import Home from './pages/Home';
import Login from './pages/Login';
import AppLayout from "./components/AppLayout";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Logout from "./components/Logout";
import UserLayout from "./components/UserLayout";
import axios from "axios";
import { serverEndpoint } from "./config/appConfig"
import { useSelector, useDispatch } from "react-redux";
import {SET_USER} from "./redux/user/action";
import Groups from "./pages/Groups";

function App() {
  //Value of userDetails represents whether the use is logged in or not
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const [ loading, setLoading ]= useState(true);

  const isUserLoggedIn = async() => {
    try {
      const response = await axios.post(`${serverEndpoint}/auth/is-user-logged-in`,{}, { withCredentials: true});
      
      //setUserDetails(response.data.user);
      dispatch({
        type:SET_USER,
        payload: response.data.user
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    isUserLoggedIn();
  }, []);

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
              <Login /> 
            </AppLayout>
            )
        }
      />
      
      <Route
        path = "/dashboard" 
        element = {
          userDetails ? (
            <UserLayout>
              <Dashboard />
            </UserLayout>
          ) : (
            <Navigate to = "/login" />
          )
        } 
        />
      
      <Route
        path="/groups"
        element={
          userDetails ? (
            <UserLayout>
              <Groups />
            </UserLayout>
          ) : (
            <Navigate to="/login"/>
          )
        } 
      />

      <Route
        path="/logout"
        element = {
          userDetails ? (
            < Logout />
          ) : (
            < Navigate to ="/login" />
          )
        }
      />
    </Routes>
  );
}

export default App;