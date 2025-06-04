import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import { logout } from "../../store/loginSlice";

const AuthWrapper = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:3001/validate-token', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        // Token válido
      })
      .catch(() => {
        localStorage.clear();
        dispatch(logout());
        navigate('/login');
      });
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate]);

  return <Outlet />; // Renderiza las rutas hijas
};

export default AuthWrapper;