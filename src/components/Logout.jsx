import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Logout({ setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    axios.post(
      "http://localhost:5001/auth/logout",
      {},
      { withCredentials: true }
    ).finally(() => {
      setUser(null);
      navigate("/login");
    });
  }, []);

  return null;
}

export default Logout;