import { loadUser } from "@/slice/authSlice";
import type { AppDispatch } from "@/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PrivateRoute = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated,isLoading } = useSelector(
    (state: { auth: { isAuthenticated: boolean; isLoading: boolean } }) => state.auth
  );

  useEffect(() => {
    if (!isAuthenticated) {
      const storedUser = localStorage.getItem("activeAccount");
      if (storedUser) {
        dispatch(loadUser());
      }
    }
  }, [dispatch, isAuthenticated]);

  if (isLoading) return <div>Loading...</div>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;