import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Groups from "./pages/Groups";
import ExpensePage from "./pages/ExpensesPage";

import AppLayout from "./components/AppLayout";
import UserLayout from "./components/UserLayout";
import Logout from "./components/Logout";

import { serverEndpoint } from "./config/appConfig";
import { SET_USER } from "./redux/user/action";

function App() {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);

  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!userDetails;

  // 🔐 Check auth on app load
  const isUserLoggedIn = async () => {
    try {
      const response = await axios.post(
        `${serverEndpoint}/auth/is-user-logged-in`,
        {},
        { withCredentials: true },
      );

      dispatch({
        type: SET_USER,
        payload: response.data.user,
      });
    } catch (err) {
      console.log("AUTH CHECK FAILED", err.response?.status);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  // 🛡️ Protected route wrapper
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <div>Loading...</div>;
    }
    return isAuthenticated ? children : <Navigate to="/auth" />;
  };

  return (
    <Routes>
      {/* AUTH */}
      <Route
        path="/auth"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" />
          ) : (
            <AppLayout>
              <Auth />
            </AppLayout>
          )
        }
      />

      {/* REDIRECT OLD PATHS */}
      <Route path="/login" element={<Navigate to="/auth" />} />
      <Route path="/register" element={<Navigate to="/auth" />} />

      {/* HOME */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" />
          ) : (
            <AppLayout>
              <Home />
            </AppLayout>
          )
        }
      />

      {/* DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <UserLayout>
              <Dashboard />
            </UserLayout>
          </ProtectedRoute>
        }
      />

      {/* GROUPS */}
      <Route
        path="/groups"
        element={
          <ProtectedRoute>
            <UserLayout>
              <Groups />
            </UserLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/groups/:groupId/expenses"
        element={
          <ProtectedRoute>
            <UserLayout>
              <ExpensePage />
            </UserLayout>
          </ProtectedRoute>
        }
      />

      {/* LOGOUT */}
      <Route
        path="/logout"
        element={
          <ProtectedRoute>
            <Logout />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;